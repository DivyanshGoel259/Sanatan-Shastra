"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Plus, FileText, Eye, TrendingUp, Edit, Trash2, Search } from "lucide-react"
import Navigation from "@/components/navigation"

// Mock data for existing articles
const mockArticles = [
  {
    id: "1",
    title: "The Dharma of Kurukshetra",
    category: "Bhagavad Gita",
    status: "published",
    views: 2450,
    publishedAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Sita's Swayamvara",
    category: "Ramayana",
    status: "published",
    views: 1890,
    publishedAt: "2025-01-10",
  },
  {
    id: "3",
    title: "Krishna's Divine Play",
    category: "Mahabharata",
    status: "draft",
    views: 0,
    publishedAt: null,
  },
]

export default function DashboardPage() {
  const [articles, setArticles] = useState(mockArticles)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || article.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    draft: articles.filter((a) => a.status === "draft").length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter((a) => a.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-8 px-4 md:px-6 lg:px-8 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-muted-foreground">Manage your sacred articles</p>
            </div>
            <Link
              href="/dashboard/create"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/50"
            >
              <Plus size={20} />
              Create Article
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <FileText className="text-purple-400" size={24} />
                <span className="text-3xl font-bold">{stats.total}</span>
              </div>
              <p className="text-muted-foreground">Total Articles</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border border-cyan-500/30 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <Eye className="text-cyan-400" size={24} />
                <span className="text-3xl font-bold">{stats.published}</span>
              </div>
              <p className="text-muted-foreground">Published</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-800/20 border border-purple-500/30 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <Edit className="text-purple-300" size={24} />
                <span className="text-3xl font-bold">{stats.draft}</span>
              </div>
              <p className="text-muted-foreground">Drafts</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-cyan-900/30 to-purple-800/20 border border-cyan-500/30 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="text-cyan-300" size={24} />
                <span className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</span>
              </div>
              <p className="text-muted-foreground">Total Views</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-purple-500/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "published", "draft"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === status
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                      : "bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:border-purple-500/50"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Table */}
          <div className="bg-card border border-purple-500/20 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-500/10 border-b border-purple-500/20">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-purple-300">Title</th>
                    <th className="text-left px-6 py-4 font-semibold text-purple-300">Category</th>
                    <th className="text-left px-6 py-4 font-semibold text-purple-300">Status</th>
                    <th className="text-left px-6 py-4 font-semibold text-purple-300">Views</th>
                    <th className="text-left px-6 py-4 font-semibold text-purple-300">Published</th>
                    <th className="text-right px-6 py-4 font-semibold text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article, index) => (
                    <motion.tr
                      key={article.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium">{article.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            article.status === "published"
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{article.views.toLocaleString()}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {article.publishedAt || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/edit/${article.id}`}
                            className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                          >
                            <Edit size={18} className="text-purple-400" />
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles found</p>
              <Link
                href="/dashboard/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
              >
                <Plus size={20} />
                Create Your First Article
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

