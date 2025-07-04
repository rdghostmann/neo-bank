"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CreditCard, Smartphone, Shield, TrendingUp, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Smartphone,
    title: "Mobile Banking",
    description: "Complete banking control in your pocket with our award-winning mobile app",
    benefits: ["24/7 account access", "Instant notifications", "Biometric security", "Offline mode"],
  },
  {
    icon: CreditCard,
    title: "Smart Debit Cards",
    description: "AI-powered cards that adapt to your spending patterns and preferences",
    benefits: ["Real-time fraud protection", "Spending insights", "Instant card controls", "Global acceptance"],
  },
  {
    icon: TrendingUp,
    title: "Savings & Investments",
    description: "Grow your wealth with intelligent savings and investment recommendations",
    benefits: ["High-yield savings", "Auto-investing", "Goal tracking", "Tax optimization"],
  },
  {
    icon: Shield,
    title: "Premium Security",
    description: "Bank-grade security with quantum encryption and biometric authentication",
    benefits: ["Quantum encryption", "Biometric login", "Real-time monitoring", "Insurance protection"],
  },
]

const plans = [
  {
    name: "Essential",
    price: "Free",
    description: "Perfect for everyday banking needs",
    features: [
      "Free checking account",
      "Mobile banking app",
      "Online bill pay",
      "ATM fee reimbursement (5/month)",
      "24/7 customer support",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99/month",
    description: "Enhanced features for active users",
    features: [
      "Everything in Essential",
      "Unlimited ATM fee reimbursement",
      "Priority customer support",
      "Advanced spending analytics",
      "Investment advisory",
      "Travel insurance",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "$24.99/month",
    description: "Exclusive benefits for high-net-worth individuals",
    features: [
      "Everything in Premium",
      "Dedicated relationship manager",
      "Concierge services",
      "Private banking access",
      "Exclusive investment opportunities",
      "Global lounge access",
    ],
    popular: false,
  },
]

export default function PersonalBankingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-emerald-900/30"></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Personal Banking
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
              <span className="block text-white">Banking</span>
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Personalized
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience banking that adapts to your lifestyle. From everyday transactions to long-term financial goals,
              we provide intelligent solutions tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg">
                  Open Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 px-8 py-6 text-lg"
              >
                Compare Plans
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need,{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Nothing You Don't
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
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
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {benefit}
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

      {/* Pricing Plans */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Choose Your Plan</h2>
            <p className="text-xl text-slate-300">Select the perfect banking plan for your lifestyle</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <Card
                  className={`bg-slate-800/50 backdrop-blur-sm h-full ${
                    plan.popular
                      ? "border-green-500/60 shadow-lg shadow-green-500/20"
                      : "border-green-500/20 hover:border-green-500/40"
                  } transition-all duration-500`}
                >
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold text-green-400 mb-2">{plan.price}</div>
                      <p className="text-slate-300">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full py-6 ${
                        plan.popular
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                          : "border-green-500/30 text-green-400 hover:bg-green-500/10"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
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
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Financial Journey
              </span>
              ?
            </h2>
            <p className="text-xl text-slate-300">
              Join millions who have already transformed their banking experience with NeoBank.
            </p>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 text-lg">
                Open Your Account Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
