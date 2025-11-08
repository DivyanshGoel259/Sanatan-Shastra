"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight, Sparkles, Shield, BookMarked, Users, Star, ArrowRight } from "lucide-react"
import Navigation from "@/components/navigation"

const MahadevScene = dynamic(() => import("@/components/mahadev-scene"), {
  ssr: false,
  loading: () => <div className="h-screen bg-gradient-to-b from-purple-900/20 to-cyan-900/20" />,
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 text-foreground overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with 3D Mahadev */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/40 rounded-full text-sm text-purple-200 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={16} />
                  Sacred Knowledge Repository
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                <span className="bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  Divine Truth
                </span>
                <br />
                <span className="text-white">Unveiled</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Defending Sanatan Shastra through authentic scholarly research and direct shloka references. Every
                allegation refuted with sacred wisdom and verified ancient texts.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/articles"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/50 hover:shadow-purple-600/80"
              >
                Explore Articles
                <ChevronRight size={20} />
              </Link>
              <Link
                href="/articles"
                className="px-8 py-4 border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-300 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <Shield size={20} />
                Browse References
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-500/30"
            >
              {[
                { label: "Articles", value: "24+" },
                { label: "References", value: "150+" },
                { label: "Shlokas", value: "1000+" },
              ].map((stat, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Mahadev Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            <MahadevScene />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-balance">
              Why This{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Platform Exists
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Ancient wisdom under modern scrutiny. We provide authentic, scholarly responses with direct references to
              Vedic texts.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Shield,
                title: "Authentic Defense",
                description: "Every claim backed by verified shloka and direct references to original texts.",
              },
              {
                icon: BookMarked,
                title: "Scholarly Research",
                description: "Carefully researched articles by experts in Vedic knowledge and ancient philosophy.",
              },
              {
                icon: Sparkles,
                title: "Sacred Wisdom",
                description:
                  "Ancient knowledge presented through modern understanding while preserving spiritual essence.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/20 p-8 rounded-xl border border-purple-500/30 hover:border-purple-500/60 transition-all group cursor-pointer hover:bg-purple-900/40">
                  <div className="p-4 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-lg w-fit mb-4 group-hover:from-purple-600/50 group-hover:to-cyan-600/50 transition-all">
                    <item.icon size={28} className="text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-balance">
              Featured{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Collections
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Explore carefully curated articles addressing misconceptions with divine references
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Mahabharata Clarifications",
                count: "8 articles",
                gradient: "from-purple-600/40 to-blue-600/40",
                icon: "📖",
              },
              {
                title: "Ramayana References",
                count: "6 articles",
                gradient: "from-cyan-600/40 to-purple-600/40",
                icon: "✨",
              },
              {
                title: "Vedic Wisdom",
                count: "5 articles",
                gradient: "from-purple-600/40 to-cyan-600/40",
                icon: "ॐ",
              },
              {
                title: "Bhagavad Gita Insights",
                count: "4 articles",
                gradient: "from-blue-600/40 to-purple-600/40",
                icon: "🙏",
              },
              {
                title: "Philosophy & Ethics",
                count: "3 articles",
                gradient: "from-cyan-600/40 to-blue-600/40",
                icon: "💫",
              },
              {
                title: "Sacred Practices",
                count: "2 articles",
                gradient: "from-purple-600/40 to-pink-600/40",
                icon: "🕉️",
              },
            ].map((category, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Link href="/articles">
                  <div
                    className={`bg-gradient-to-br ${category.gradient} p-8 rounded-xl border border-purple-500/30 hover:border-purple-500/60 transition-all h-full group cursor-pointer hover:bg-opacity-100 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{category.icon}</div>
                      <Star size={20} className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-slate-300 mb-4">{category.count}</p>
                    <div className="flex items-center gap-2 text-cyan-300 text-sm opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
                      Explore <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-purple-950/20 to-transparent relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Preserving Divine{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Knowledge
                </span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                In an age of misinformation, we stand as guardians of Sanatan Shastra. Our mission is to provide
                authentic, well-researched responses to every allegation, ensuring future generations understand the
                true depth and wisdom of these ancient teachings.
              </p>
              <motion.div className="flex gap-4 flex-wrap pt-4">
                {[
                  { label: "Verified Sources", value: "100%" },
                  { label: "Expert Contributors", value: "50+" },
                  { label: "Languages", value: "5" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-purple-500/20 border border-purple-500/40 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400">{item.value}</div>
                    <div className="text-sm text-slate-400">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {[
                  {
                    title: "Comprehensive Coverage",
                    desc: "Articles covering all major Sanatan texts and philosophies",
                  },
                  { title: "Direct References", desc: "Every article links to authentic shloka with translations" },
                  { title: "Living Knowledge", desc: "Understanding ancient wisdom in modern context" },
                  { title: "Community Driven", desc: "Scholars and devotees united in preserving truth" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 bg-gradient-to-r from-purple-900/30 to-transparent rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all"
                  >
                    <div className="p-2 bg-cyan-500/20 rounded-full h-fit">
                      <Users size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-purple-900/40 to-cyan-900/30 border border-purple-500/50 rounded-2xl p-12 backdrop-blur-sm"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Begin Your Journey into <span className="text-cyan-300">Sacred Truth</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Discover authentic answers to common questions about Sanatan Shastra. Every article is meticulously
              researched and backed by verified shloka and ancient wisdom.
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80"
            >
              Start Exploring
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-4 md:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-400 text-sm md:text-base"
        >
          ॐ Sanatan Shastra - Divine Truth Through Sacred Knowledge ॐ
        </motion.p>
      </footer>
    </div>
  )
}
