"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react"
import Navigation from "@/components/navigation"

interface Shloka {
  text: string
  reference: string
  translation: string
}

export default function CreateArticlePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "Mahabharata",
    status: "draft" as "draft" | "published",
  })
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [shlokas, setShlokas] = useState<Shloka[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const categories = ["Mahabharata", "Ramayana", "Vedic", "Bhagavad Gita"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Article Data:", { ...formData, tags, shlokas })
    alert(`Article ${formData.status === "published" ? "published" : "saved as draft"} successfully!`)
    router.push("/dashboard")
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addShloka = () => {
    setShlokas([...shlokas, { text: "", reference: "", translation: "" }])
  }

  const updateShloka = (index: number, field: keyof Shloka, value: string) => {
    const newShlokas = [...shlokas]
    newShlokas[index][field] = value
    setShlokas(newShlokas)
  }

  const removeShloka = (index: number) => {
    setShlokas(shlokas.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-8 px-4 md:px-6 lg:px-8 border-b border-purple-500/20">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Create Article
            </span>
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-card border border-purple-500/20 rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-purple-300">Basic Information</h2>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="The Dharma of Kurukshetra: Arjuna's Divine Dilemma"
                  className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg text-foreground focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Short Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A brief summary of your article..."
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add tags..."
                    className="flex-1 px-4 py-2 bg-background border border-purple-500/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-purple-100">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-card border border-purple-500/20 rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-purple-300">Article Content</h2>

              <div>
                <label className="block text-sm font-medium mb-2">Main Content *</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your article content here..."
                  rows={15}
                  className="w-full px-4 py-3 bg-background border border-purple-500/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Characters: {formData.content.length}
                </p>
              </div>
            </div>

            {/* Shlokas */}
            <div className="bg-card border border-purple-500/20 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-purple-300">Sacred References (Shlokas)</h2>
                <button
                  type="button"
                  onClick={addShloka}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus size={18} />
                  Add Shloka
                </button>
              </div>

              {shlokas.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-4">No shlokas added yet</p>
                  <button
                    type="button"
                    onClick={addShloka}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                  >
                    <Plus size={18} />
                    Add your first shloka
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {shlokas.map((shloka, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-300">Shloka {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeShloka(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Sanskrit Text *</label>
                        <textarea
                          value={shloka.text}
                          onChange={(e) => updateShloka(index, "text", e.target.value)}
                          placeholder="यदा यदा हि धर्मस्य..."
                          rows={2}
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all resize-none text-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Reference *</label>
                        <input
                          type="text"
                          value={shloka.reference}
                          onChange={(e) => updateShloka(index, "reference", e.target.value)}
                          placeholder="Bhagavad Gita 4.7"
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Translation *</label>
                        <textarea
                          value={shloka.translation}
                          onChange={(e) => updateShloka(index, "translation", e.target.value)}
                          placeholder="Whenever there is a decline in dharma..."
                          rows={2}
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-6 bg-card border border-purple-500/20 rounded-xl">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="w-full sm:w-auto px-6 py-3 bg-purple-500/10 border border-purple-500/30 hover:border-purple-500/50 text-purple-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Eye size={20} />
                {showPreview ? "Hide" : "Show"} Preview
              </button>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  onClick={() => setFormData({ ...formData, status: "draft" })}
                  className="px-6 py-3 bg-purple-500/20 border border-purple-500/40 hover:bg-purple-500/30 text-purple-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Save size={20} />
                  Save as Draft
                </button>
                <button
                  type="submit"
                  onClick={() => setFormData({ ...formData, status: "published" })}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/50"
                >
                  <Save size={20} />
                  Publish Article
                </button>
              </div>
            </div>
          </form>

          {/* Preview */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-8 bg-card border border-cyan-500/30 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Preview</h2>
              <div className="space-y-6">
                <div>
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                    {formData.category}
                  </span>
                  <h1 className="text-4xl font-bold mt-4 mb-4">{formData.title || "Untitled Article"}</h1>
                  <p className="text-xl text-muted-foreground">{formData.description}</p>
                </div>

                {formData.content && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">{formData.content}</p>
                  </div>
                )}

                {tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {shlokas.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Sacred References</h3>
                    <div className="space-y-4">
                      {shlokas.map((shloka, index) => (
                        <div key={index} className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-xl mb-2 text-cyan-300">{shloka.text}</p>
                          <p className="text-sm text-purple-400 mb-2">{shloka.reference}</p>
                          <p className="text-muted-foreground">{shloka.translation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

