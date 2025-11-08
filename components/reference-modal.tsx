"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Share2 } from "lucide-react"

interface ReferenceModalProps {
  ref: { id: number; text: string; shloka: string } | null
  onClose: () => void
}

export default function ReferenceModal({ ref, onClose }: ReferenceModalProps) {
  const handleCopy = () => {
    if (ref?.shloka) {
      navigator.clipboard.writeText(ref.shloka)
    }
  }

  return (
    <AnimatePresence>
      {ref && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="shimmer-border bg-background rounded-lg p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-purple-400 font-semibold">Reference</p>
                  <h2 className="text-2xl font-bold">{ref.text}</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                <p className="text-2xl text-purple-200 text-center leading-relaxed font-serif">{ref.shloka}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy size={18} />
                  Copy Shloka
                </button>
                <button className="flex-1 px-4 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
