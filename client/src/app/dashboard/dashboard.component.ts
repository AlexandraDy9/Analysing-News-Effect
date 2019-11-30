import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartDataArticles: ChartDataSets[] = [];
  public lineChartLabelsArticles: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          // tslint:disable-next-line: object-literal-shorthand
          userCallback: (value: any, index: any) => {
            if (index % 2) { return ''; }
            return value;
          }
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  private companyData;
  public articles = [];
  public dataIsLoaded = false;

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(param => {
        this.dataIsLoaded = false;
        this.lineChartData = [];
        this.lineChartLabels = [];
        this.lineChartDataArticles = [];
        this.lineChartLabelsArticles = [];
        this.getDataForChart(param.name);
        this.getDataForArticles(param.fullName);
      }
      );
  }

  getDataForArticles(companyName) {
    this.http.post(`/apiArticles/${companyName}`, {}).subscribe(() => {
      this.http.get(`/apiArticles/${companyName}`)
        .subscribe((datas: Array<any>) => {
          this.articles = datas;
          console.log(this.articles);
        })
      this.http.get(`/apiArticles/${companyName}/predictions`).subscribe(datas => {
        const data = [];
        const values = [];

        for (const [key, value] of Object.entries(datas)) {
          data.push(new Date(key).toLocaleDateString('en-US'));
          values.push(value);
        }

        this.lineChartDataArticles.push({
          data: values, label: 'Variation of influence'
        });
        this.lineChartLabelsArticles.push(...data);
      })
    });
    // this.http.put('/apiArticles/updateNews', {}).subscribe();

  }

  getDataForChart(companySymbol) {
    this.http.get(`/api/stock/${companySymbol}`)
      .subscribe((data: any) => {
        this.companyData = data;
        const dataForChart: Array<any> = this.structureDataForChart(data);

        dataForChart.forEach((elem, index) => {
          if (elem.data === 'real') {
            this.lineChartData.push({
              data: elem.values, label: 'Real data'
            });
            elem.date.forEach(elemaa => this.lineChartLabels.push(elemaa));
          } else {
            this.lineChartData.push({
              data: elem.values, label: 'Polynomial regression'
            });
            for (let x = 1; x <= 10; x++) {
              this.lineChartLabels.push(x.toString());
            }
          }
        });

        this.dataIsLoaded = true;
      });
  }

  structureDataForChart(data: Array<any>) {
    const realData = [];
    const predictData = [];
    const date = [];

    data.forEach((stockValue, index) => {
      // console.log(typeof stockValue.date);
      if (index < 100) {
        realData.push(stockValue.value);
        date.push(stockValue.date);
        predictData.push(null);
      } else if (index === 100) {
        realData.push(stockValue.value);
        predictData.push(stockValue.value);
      } else if (index > 100) {
        predictData.push(stockValue.value);
      }
    });

    return [
      {
        data: 'real',
        date,
        values: realData
      },
      {
        data: 'predict',
        values: predictData
      }
    ];
  }


}
