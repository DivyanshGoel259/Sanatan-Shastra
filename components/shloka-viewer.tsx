"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Volume2, ChevronDown, Sparkles } from "lucide-react"
import SlokaModal from "./shloka-modal"
import type { Article } from "@/lib/articles-data"

interface SlokaViewerProps {
  shloka: Article["shlokas"][0]
  index: number
  articleTitle?: string
}

export default function SlokaViewer({ shloka, index, articleTitle }: SlokaViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shloka.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className="group shimmer-border p-6 rounded-lg space-y-4 cursor-pointer hover:bg-purple-500/5 transition-all relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-cyan-500/0 to-purple-600/0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main Card Button */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="w-full text-left relative z-10"
          whileHover={{ x: 4 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Sanskrit Text with shimmer effect */}
              <motion.p
                className="text-lg md:text-xl font-semibold text-purple-300 mb-2 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                {shloka.text}
              </motion.p>

              {/* Reference */}
              <motion.p
                className="text-sm text-cyan-400 font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.15 }}
              >
                {shloka.reference}
              </motion.p>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="flex-shrink-0 pt-1"
            >
              <ChevronDown size={20} className="text-muted-foreground group-hover:text-purple-300 transition-colors" />
            </motion.div>
          </div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4 pt-4 border-t border-purple-500/20 relative z-10"
            >
              {/* Translation Preview with glow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-cyan-500/10 to-purple-500/5 border border-cyan-500/30 rounded-lg p-4 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <h4 className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2 relative z-10">
                  <Sparkles size={16} />
                  Translation
                </h4>
                <p className="text-muted-foreground leading-relaxed line-clamp-3 relative z-10">{shloka.translation}</p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 pt-2 relative z-10"
              >
                {[
                  {
                    icon: Copy,
                    label: copied ? "Copied!" : "Copy",
                    onClick: (e: React.MouseEvent) => {
                      e.stopPropagation()
                      handleCopy()
                    },
                  },
                  {
                    icon: Volume2,
                    label: "Listen",
                    onClick: () => {},
                  },
                ].map((btn, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={btn.onClick}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-300 hover:border-purple-500/50 transition-all"
                  >
                    <btn.icon size={16} />
                    {btn.label}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsModalOpen(true)
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-300 hover:border-cyan-500/50 transition-all ml-auto"
                >
                  View Full
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-center text-xs text-muted-foreground hover:text-purple-300 transition-colors pt-2 relative z-10"
          whileHover={{ scale: 1.05 }}
        >
          {isExpanded ? "Show less" : "Show translation"}
        </motion.button>
      </motion.div>

      {/* Modal */}
      <SlokaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shloka={shloka}
        articleTitle={articleTitle}
      />
    </>
  )
}
