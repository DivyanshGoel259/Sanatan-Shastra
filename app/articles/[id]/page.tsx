"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Share2, Bookmark, Eye, Clock, Tag } from "lucide-react"
import Navigation from "@/components/navigation"
import SlokaViewer from "@/components/shloka-viewer"
import RelatedArticles from "@/components/related-articles"
import { articlesData } from "@/lib/articles-data"

export default function ArticleDetailPage() {
  const params = useParams()
  const articleId = params.id as string

  const article = articlesData.find((a) => a.id === articleId)

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <section className="pt-32 pb-16 px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link
              href="/articles"
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
            >
              Back to Articles
            </Link>
          </div>
        </section>
      </div>
    )
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation />

      {/* Back Button and Meta */}
      <section className="pt-24 pb-8 px-4 md:px-6 lg:px-8 border-b border-purple-500/20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
            >
              <ArrowLeft size={18} />
              Back to Articles
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-sm font-semibold text-white">
              {article.category}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">{article.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={18} />
                <span>{article.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={18} />
                <span>{article.shlokas.length} references</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-300 hover:border-purple-500/50 transition-all"
              >
                <Share2 size={18} />
                Share
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-300 hover:border-purple-500/50 transition-all"
              >
                <Bookmark size={18} />
                Save
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            {article.description}
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">{article.content}</p>
          </motion.div>

          {/* Shlokas Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-2 text-balance">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Sacred References
                </span>
              </h2>
              <p className="text-muted-foreground">
                Authentic shlokas and references from sacred texts supporting this article
              </p>
            </div>

            <div className="grid gap-6">
              {article.shlokas.map((shloka, index) => (
                <SlokaViewer key={index} shloka={shloka} index={index} articleTitle={article.title} />
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-purple-500/20"
          >
            <h3 className="text-lg font-semibold mb-4">Topics Covered</h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?search=${encodeURIComponent(tag)}`}
                  className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300 hover:border-purple-500/50 transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      <RelatedArticles currentArticleId={article.id} currentCategory={article.category} />

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-4 md:px-6 lg:px-8 text-center text-muted-foreground">
        <p>ॐ Sacred Knowledge Through Verified References ॐ</p>
      </footer>
    </div>
  )
}

