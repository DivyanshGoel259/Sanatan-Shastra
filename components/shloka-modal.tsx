"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Volume2, Share2, Download } from "lucide-react"

interface SlokaModalProps {
  isOpen: boolean
  onClose: () => void
  shloka: {
    text: string
    reference: string
    translation: string
  }
  articleTitle?: string
}

export default function SlokaModal({ isOpen, onClose, shloka, articleTitle }: SlokaModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen, onClose])

  const handleCopy = () => {
    const text = `${shloka.text}\n\n${shloka.reference}\n\n${shloka.translation}`
    navigator.clipboard.writeText(text)
  }

  const handleDownload = () => {
    const content = `${shloka.reference}\n\n${shloka.text}\n\nTranslation:\n${shloka.translation}`
    const element = document.createElement("a")
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`)
    element.setAttribute("download", `${shloka.reference}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card border border-purple-500/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-card border-b border-purple-500/20 px-6 md:px-8 py-4 flex items-center justify-between">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-lg font-semibold text-purple-300">Sacred Reference</h3>
                  {articleTitle && <p className="text-sm text-muted-foreground mt-1">{articleTitle}</p>}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 py-8 space-y-8">
                {/* Reference */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
                    Reference
                  </span>
                  <span className="text-base font-medium text-cyan-300">{shloka.reference}</span>
                </motion.div>

                {/* Sanskrit Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Sanskrit</div>
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6 md:p-8">
                    <p className="text-2xl md:text-3xl font-semibold text-purple-200 leading-relaxed text-center">
                      {shloka.text}
                    </p>
                  </div>
                </motion.div>

                {/* Translation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-4"
                >
                  <div className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">Translation</div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 md:p-8">
                    <p className="text-lg leading-relaxed text-muted-foreground">{shloka.translation}</p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-purple-500/20"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all text-sm font-medium"
                  >
                    <Copy size={18} />
                    <span className="hidden md:inline">Copy</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all text-sm font-medium"
                  >
                    <Volume2 size={18} />
                    <span className="hidden md:inline">Listen</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all text-sm font-medium"
                  >
                    <Share2 size={18} />
                    <span className="hidden md:inline">Share</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/20 transition-all text-sm font-medium"
                  >
                    <Download size={18} />
                    <span className="hidden md:inline">Download</span>
                  </motion.button>
                </motion.div>

                {/* Footer Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="pt-6 border-t border-purple-500/10 text-center"
                >
                  <p className="text-xs text-muted-foreground">ॐ Authentic reference from sacred texts ॐ</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
