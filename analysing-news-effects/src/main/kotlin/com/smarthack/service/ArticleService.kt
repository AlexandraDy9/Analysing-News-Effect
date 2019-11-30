package com.smarthack.service

import com.dfl.newsapi.NewsApiRepository
import com.dfl.newsapi.enums.Language
import com.smarthack.persistence.article.Article
import com.smarthack.persistence.article.ArticleRepository
import io.reactivex.schedulers.Schedulers
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class ArticleService(private val articleRepository: ArticleRepository) {

    private val companiesList: MutableList<String> = mutableListOf()
    private val newsApiRepository = NewsApiRepository(KEY)

    fun get() : MutableList<Article> {
        return articleRepository.findAll()
    }

    fun getByCompany(company: String): List<Article> {
        return articleRepository.findAllByCompany(company)
    }

    fun setArticles(company: String) {
        newsApiRepository.getEverything(q = company, language = Language.EN)
                .subscribeOn(Schedulers.io())
                .toFlowable()
                .flatMapIterable { articles -> articles.articles }
                .subscribe({ article ->
                    val description = validateDescription(article.description)
                    if (articleRepository.findAll().firstOrNull { repo -> repo.title == article.title && repo.url == article.url } == null) {
                        articleRepository.save(
                                Article(
                                        article.author,
                                        article.title,
                                        description,
                                        if (article.url.length > 254) article.url.subSequence(0, 254).toString() else article.url,
                                        if (article.urlToImage.length > 254) article.urlToImage.subSequence(0, 254).toString() else article.urlToImage,
                                        LocalDateTime.parse(article.publishedAt.subSequence(0, article.publishedAt.length - 1)),
                                        company.capitalize()
                                )
                        )
                    }
                },
                        { t -> print("error: " + t.message) })

        companiesList.add(company)
    }

    fun articleEffects(company: String): Map<LocalDateTime, Float> {
        val predictions: MutableMap<LocalDateTime, Float> = mutableMapOf()

        articleRepository.findAllByCompany(company).forEach {
            val request = khttp.get (
                    url = "http://localhost:3000/api/checkPhrase",
                    json = mapOf("description" to it.description))

            predictions.put(it.publishedAt!!, request.text.toFloat())
        }

        return predictions
    }

    private fun validateDescription(description: String) : String {
        var description: String = if (description.length > 254)
            description.subSequence(0, 254).toString()
        else
            description
        description = description.replace("\"", " ")

        return description
    }

    companion object {
        const val KEY: String = "e82dc9266c3f4bc4ad406306c2632450"
    }
}