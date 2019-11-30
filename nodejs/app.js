const trainingSet = require('./trainingdata.json')
const natural = require('natural')
const brainJs = require('brain.js')

const fetch = require('node-fetch');

const express = require('express');
const app = express();
const bodyparse = require('body-parser');
const port = 3000;

const PolynomialRegression = require('ml-regression').PolynomialRegression;

const db = [];

// Middleware

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: false }));

app.get('/api/stock/:companySymbol', (request, response) => {
  const companySymbol = request.params.companySymbol;

  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${companySymbol}&outputsize=30&apikey=4HXMWGONUI11D03D`)
    .then(res => res.json())
    .then(datas => {
      const companyStock = datas['Time Series (Daily)'];
      const arrayOfCompanysStock = []
      const dates = [];
      const values = [];

      for (let [key, value] of Object.entries(companyStock)) {
        let obj = {
          date: key,
          value: parseInt(value['4. close'])
        }
        arrayOfCompanysStock.push(obj);
      }

      arrayOfCompanysStock.forEach((item, index) => {
        dates.push(index + 1);
        values.push(item.value)
      })

      const regresion = new PolynomialRegression(dates, values, 2);
      // console.log(regresion.toString());

      const finalData = [...arrayOfCompanysStock];
      for (let x = dates.length + 1; x <= dates.length + 10; x++) {
        finalData.push({
          date: x,
          value: parseFloat(regresion.predict(x).toFixed(1))
        })
      };
      response.status(200).send(finalData);
    })
})

function buildWordDictionary(trainingData) {
  const tokenisedArray = trainingData.map(item => {
    const tokens = item.phrase.split(' ')
    return tokens.map(token => natural.PorterStemmer.stem(token))
  })

  const flattenedArray = [].concat.apply([], tokenisedArray)
  return flattenedArray.filter((item, pos, self) => self.indexOf(item) == pos)
}

const dictionaryTrainingSet = buildWordDictionary(trainingSet)

function encode(phrase) {
  const phraseTokens = phrase.split(' ')
  const encodedPhrase = dictionaryTrainingSet.map(word => phraseTokens.includes(word) ? 1 : 0)

  return encodedPhrase
}

const encodedTrainingSet = trainingSet.map(dataSet => {
  const encodedValue = encode(dataSet.phrase)
  return { input: encodedValue, output: dataSet.result }
})

const network = new brainJs.NeuralNetwork()
network.train(encodedTrainingSet)

app.get('/api/checkPhrase', (request, response) => {
  const encoded = encode(request.body.description);
  const result = network.run(encoded);

  response.status(200).send((result.good).toString());
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
