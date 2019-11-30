package com.smarthack.persistence.article

import org.springframework.data.jpa.repository.JpaRepository

interface ArticleRepository : JpaRepository<Article, Long> {
    fun findAllByCompany(company: String) : List<Article>
}