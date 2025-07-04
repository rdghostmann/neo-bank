"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Target, Users, Globe, ArrowRight, Zap, Shield, Brain } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Brain,
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible in financial technology.",
  },
  {
    icon: Shield,
    title: "Security Always",
    description: "Your trust is our foundation. We protect your assets with military-grade security.",
  },
  {
    icon: Users,
    title: "Customer Obsessed",
    description: "Every decision we make is centered around improving your banking experience.",
  },
  {
    icon: Globe,
    title: "Global Mindset",
    description: "We think globally while acting locally to serve customers worldwide.",
  },
]

const milestones = [
  { year: "2020", event: "NeoBank founded with a vision to revolutionize banking" },
  { year: "2021", event: "Launched AI-powered personal banking platform" },
  { year: "2022", event: "Expanded to business banking and reached 1M customers" },
  { year: "2023", event: "Introduced quantum security and global expansion" },
  { year: "2024", event: "Leading the future of digital finance with 10M+ users" },
]

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Former Goldman Sachs executive with 15+ years in fintech innovation.",
    image: "👩‍💼",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "Ex-Google engineer specializing in AI and quantum computing applications.",
    image: "👨‍💻",
  },
  {
    name: "Dr. Aisha Patel",
    role: "Chief Security Officer",
    bio: "Cybersecurity expert with PhD in cryptography from MIT.",
    image: "👩‍🔬",
  },
  {
    name: "James Thompson",
    role: "Head of Product",
    bio: "Design thinking leader who previously built products at Apple and Tesla.",
    image: "👨‍🎨",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-emerald-900/30"></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
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
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                About Us
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
              <span className="block text-white">Redefining</span>
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Finance
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We're not just another bank. We're a technology company that happens to do banking, building the financial
              infrastructure for the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Our{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Mission
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                To democratize access to advanced financial services by leveraging cutting-edge technology. We believe
                everyone deserves banking that's intelligent, secure, and designed for the future.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Lightning Fast</h3>
                    <p className="text-slate-400 text-sm">Instant transactions and real-time processing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Ultra Secure</h3>
                    <p className="text-slate-400 text-sm">Quantum-encrypted protection for your assets</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Powered</h3>
                    <p className="text-slate-400 text-sm">Intelligent insights and automated optimization</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-green-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                <div className="absolute inset-8 border border-green-500/30 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">10M+</h3>
                    <p className="text-slate-300">Happy Customers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-slate-300">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-500 h-full backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-slate-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-xl text-slate-300">Key milestones in our mission to transform banking</p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-8"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-green-400">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-slate-300 text-lg">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-slate-300">The visionaries building the future of finance</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-500 h-full backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-6xl mb-6">{member.image}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-green-400 mb-4">{member.role}</p>
                    <p className="text-slate-300 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Join Us
              </span>
              ?
            </h2>
            <p className="text-xl text-slate-300">
              Be part of the financial revolution. Experience banking designed for tomorrow, available today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 text-lg">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 px-12 py-6 text-lg"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
