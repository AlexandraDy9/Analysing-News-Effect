package com.smarthack.web

import com.smarthack.persistence.article.Article
import com.smarthack.service.ArticleService
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime
import javax.validation.Valid

@RestController
@RequestMapping("/apiArticles")
class ArticleController(private val service: ArticleService) {

    @GetMapping
    fun getAll() : List<Article> {
        return service.get()
    }

    @GetMapping("/{company}")
    fun getByCompany(@Valid @PathVariable company: String) : List<Article> {
        return service.getByCompany(company)
    }

    @PostMapping("/{company}")
    fun addCompanyArticles(@Valid @PathVariable company: String) {
        service.setArticles(company)
    }

    @GetMapping("/{company}/predictions")
    fun articleEffects(@Valid @PathVariable company: String) : Map<LocalDateTime, Float> {
        return service.articleEffects(company)
    }
}