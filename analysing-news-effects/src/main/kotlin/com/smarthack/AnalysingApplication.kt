package com.smarthack

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication


@SpringBootApplication
class AnalysingApplication {
    companion object{
        @JvmStatic
        fun main(args: Array<String>){
            SpringApplication.run(AnalysingApplication::class.java, *args)
        }
    }
}