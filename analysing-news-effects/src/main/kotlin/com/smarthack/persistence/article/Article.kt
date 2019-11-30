package com.smarthack.persistence.article

import com.smarthack.persistence.base.BaseEntity
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotEmpty

@Entity(name = "article")
@Inheritance(strategy = InheritanceType.JOINED)
class Article(
        var author: String? = null,

        var title: String? = null,

        var description: String? = null,

        var url: String? = null,

        var urlToImage: String? = null,

        var publishedAt: LocalDateTime? = null,

        @field:NotEmpty
        var company: String? = null
) : BaseEntity()
