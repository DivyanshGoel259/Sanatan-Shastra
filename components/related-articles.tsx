"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { articlesData } from "@/lib/articles-data"
import ArticleCard from "./article-card"

interface RelatedArticlesProps {
  currentArticleId: string
  currentCategory: string
}

export default function RelatedArticles({ currentArticleId, currentCategory }: RelatedArticlesProps) {
  const relatedArticles = articlesData
    .filter((article) => article.category === currentCategory && article.id !== currentArticleId)
    .slice(0, 3)

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Related Articles
              </span>
            </h2>
            <Link
              href={`/articles?category=${currentCategory}`}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All
              <ChevronRight size={18} />
            </Link>
          </div>
          <p className="text-muted-foreground">More articles from {currentCategory}</p>
        </motion.div>

        {/* Related Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} viewMode="grid" />
          ))}
        </div>
      </div>
    </section>
  )
}
