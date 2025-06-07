"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Smartphone, Zap, Brain, Shield, Globe, Infinity, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const digitalFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Intelligent financial recommendations powered by advanced machine learning",
    capabilities: ["Spending predictions", "Investment suggestions", "Budget optimization", "Risk assessment"],
  },
  {
    icon: Zap,
    title: "Instant Everything",
    description: "Lightning-fast transactions and real-time processing for all your banking needs",
    capabilities: ["Instant transfers", "Real-time notifications", "Immediate card controls", "Live chat support"],
  },
  {
    icon: Globe,
    title: "Borderless Banking",
    description: "Access your money anywhere in the world with our global digital infrastructure",
    capabilities: [
      "Multi-currency wallets",
      "Global ATM access",
      "International transfers",
      "Travel-friendly features",
    ],
  },
  {
    icon: Shield,
    title: "Quantum Security",
    description: "Next-generation security protocols protecting your digital assets",
    capabilities: ["Biometric authentication", "Quantum encryption", "Fraud detection", "Secure cloud storage"],
  },
]

const digitalAdvantages = [
  {
    title: "100% Digital Onboarding",
    description: "Open your account in minutes with our streamlined digital process",
    icon: "📱",
    time: "5 minutes",
  },
  {
    title: "24/7 Banking",
    description: "Bank anytime, anywhere with our always-available digital platform",
    icon: "🌍",
    time: "Always on",
  },
  {
    title: "Zero Physical Branches",
    description: "Lower costs mean better rates and fewer fees for you",
    icon: "💰",
    time: "Save more",
  },
  {
    title: "Instant Customer Support",
    description: "Get help immediately through our AI-powered support system",
    icon: "🤖",
    time: "Instant",
  },
]

export default function DigitalBankingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-emerald-900/30"></div>
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 0, 360] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
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
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Digital Banking
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
              <Infinity className="w-4 h-4" />
              The Future is Digital
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="block text-white">Banking</span>
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Redefined
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the ultimate in digital banking. No branches, no paperwork, no limits. Just pure, intelligent
              financial technology at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg">
                  Go Digital Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 px-8 py-6 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Digital Features */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Digital-First{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Cutting-edge technology meets intuitive design to create the most advanced banking experience ever built.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {digitalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-500 h-full backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-300 mb-6">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.capabilities.map((capability, capIndex) => (
                        <li key={capIndex} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Advantages */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Go Digital?</h2>
            <p className="text-xl text-slate-300">Experience the advantages of pure digital banking</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {digitalAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-500 h-full backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-6xl mb-6">{advantage.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{advantage.title}</h3>
                    <p className="text-slate-300 mb-4">{advantage.description}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
                      {advantage.time}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Built on{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Tomorrow's Tech
                </span>
              </h2>
              <p className="text-xl text-slate-300">
                Our digital banking platform is powered by cutting-edge technology including AI, blockchain, and quantum
                computing to deliver unparalleled performance and security.
              </p>
              <div className="space-y-4">
                {[
                  { tech: "Artificial Intelligence", desc: "Smart financial insights and automation" },
                  { tech: "Blockchain Security", desc: "Immutable transaction records" },
                  { tech: "Cloud Infrastructure", desc: "99.99% uptime guarantee" },
                  { tech: "API-First Design", desc: "Seamless integrations and scalability" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-green-500/20"
                  >
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div>
                      <h4 className="text-white font-semibold">{item.tech}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-green-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                <div className="absolute inset-4 border border-green-500/30 rounded-2xl flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-32 h-32 border-4 border-green-500/30 border-t-green-500 rounded-full"
                  ></motion.div>
                </div>
                <div className="absolute top-8 left-8 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-12 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 left-12 w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Join the{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Digital Revolution
              </span>
            </h2>
            <p className="text-xl text-slate-300">
              Experience banking without boundaries. Start your digital journey today.
            </p>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 text-lg">
                Start Digital Banking
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
