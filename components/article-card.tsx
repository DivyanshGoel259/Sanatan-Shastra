"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, Clock, Tag, ChevronRight } from "lucide-react"
import type { Article } from "@/lib/articles-data"

interface ArticleCardProps {
  article: Article
  index: number
  viewMode: "grid" | "list"
}

export default function ArticleCard({ article, index, viewMode }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="group cursor-pointer"
      >
        <Link href={`/articles/${article.id}`}>
          <div className="shimmer-border p-6 rounded-lg hover:bg-purple-500/5 transition-all duration-300 h-full">
            <div className="flex gap-6 items-start">
              {/* Category badge */}
              <div className="flex-shrink-0 px-3 py-1 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full text-xs font-semibold text-white whitespace-nowrap">
                {article.category}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.description}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {formattedDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    {article.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag size={14} />
                    {article.tags.length} refs
                  </div>
                </div>
              </div>

              <ChevronRight className="flex-shrink-0 text-muted-foreground group-hover:text-purple-300 transition-colors" />
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group cursor-pointer h-full"
    >
      <Link href={`/articles/${article.id}`}>
        <div className="shimmer-border p-6 rounded-lg hover:bg-purple-500/5 transition-all duration-300 h-full flex flex-col">
          {/* Category */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full text-xs font-semibold text-white">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">{article.description}</p>

          {/* Meta */}
          <div className="space-y-3 border-t border-purple-500/10 pt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {article.views}
              </span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-purple-500/10 text-purple-300 rounded">
                  {tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="text-xs px-2 py-1 text-muted-foreground">+{article.tags.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
