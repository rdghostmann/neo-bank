"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, HelpCircle, MessageCircle, Phone, Mail, Book, Video, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const helpCategories = [
  {
    icon: HelpCircle,
    title: "Getting Started",
    description: "Learn the basics of NeoBank",
    articles: 12,
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: MessageCircle,
    title: "Account Management",
    description: "Manage your account settings",
    articles: 8,
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Phone,
    title: "Transfers & Payments",
    description: "Send and receive money",
    articles: 15,
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: Mail,
    title: "Security & Privacy",
    description: "Keep your account secure",
    articles: 10,
    color: "from-green-600 to-emerald-700",
  },
]

const popularArticles = [
  "How to open a NeoBank account",
  "Setting up mobile banking",
  "Understanding transaction fees",
  "How to transfer money internationally",
  "Setting up automatic savings",
  "Troubleshooting login issues",
]

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our AI assistant",
    action: "Start Chat",
    available: "24/7",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with our support team",
    action: "Call Now",
    available: "Mon-Fri 9AM-6PM",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your questions",
    action: "Send Email",
    available: "Response within 2 hours",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-emerald-900/30"></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-slate-900/80 backdrop-blur-xl border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <ArrowLeft className="w-5 h-5 text-green-400 group-hover:-translate-x-1 transition-transform" />
              <span className="text-green-400 group-hover:text-green-300 transition-colors">Back to Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Help Center
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="block text-white">How can we</span>
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Find answers to your questions, get support, and learn how to make the most of your NeoBank experience.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-slate-800/50 border-green-500/30 text-white placeholder:text-slate-400 focus:border-green-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Browse by Category</h2>
            <p className="text-xl text-slate-300">Find the help you need organized by topic</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-500 h-full backdrop-blur-sm group-hover:bg-slate-800/70">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{category.title}</h3>
                    <p className="text-slate-300 mb-4">{category.description}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
                      {category.articles} articles
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Popular Articles</h2>
            <p className="text-xl text-slate-300">Most searched help topics</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Book className="w-5 h-5 text-green-400" />
                        <span className="text-white group-hover:text-green-400 transition-colors">{article}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Still Need Help?</h2>
            <p className="text-xl text-slate-300">Get in touch with our support team</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-500 h-full backdrop-blur-sm text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{option.title}</h3>
                    <p className="text-slate-300 mb-4">{option.description}</p>
                    <p className="text-green-400 text-sm mb-6">{option.available}</p>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Video{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Tutorials
                </span>
              </h2>
              <p className="text-xl text-slate-300">
                Watch step-by-step guides to master NeoBank features and get the most out of your banking experience.
              </p>
              <div className="space-y-4">
                {[
                  "Getting started with NeoBank",
                  "Setting up your first transfer",
                  "Using mobile banking features",
                  "Managing your investment portfolio",
                ].map((tutorial, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-green-500/20 cursor-pointer hover:border-green-500/40 transition-colors"
                  >
                    <Video className="w-6 h-6 text-green-400" />
                    <span className="text-white">{tutorial}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-green-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                    <Video className="w-10 h-10 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-white font-semibold">Welcome to NeoBank</h3>
                  <p className="text-slate-300 text-sm">Learn the basics in 5 minutes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
