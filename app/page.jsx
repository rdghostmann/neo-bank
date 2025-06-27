"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  Smartphone,
  Shield,
  Zap,
  TrendingUp,
  Globe,
  ArrowRight,
  Menu,
  X,
  Play,
  Sparkles,
  Infinity,
  Bell,
  User,
  Calendar,
  MessageSquare,
  ChevronUp,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Smartphone,
    title: "AI-Powered Banking",
    description:
      "Experience the future with our AI assistant that learns your spending patterns and provides personalized financial insights.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Quantum Security",
    description:
      "Your assets are protected by quantum-encrypted security protocols, ensuring unbreachable protection for your digital wealth.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Zap,
    title: "Instant Everything",
    description:
      "Lightning-fast transactions, real-time analytics, and instant global transfers powered by our next-gen infrastructure.",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Our advanced algorithms predict market trends and optimize your portfolio for maximum growth potential.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Globe,
    title: "Borderless Finance",
    description: "Access global markets, currencies, and investment opportunities from a single, unified platform.",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: Infinity,
    title: "Limitless Possibilities",
    description: "Break free from traditional banking limitations with our revolutionary approach to digital finance.",
    gradient: "from-teal-500 to-emerald-600",
  },
]

const stats = [
  { number: "10M+", label: "Digital Citizens", suffix: "" },
  { number: "500B+", label: "Assets Under Management", suffix: "" },
  { number: "99.99%", label: "Uptime Guarantee", suffix: "" },
  { number: "200+", label: "Countries Connected", suffix: "" },
]

const testimonials = [
  {
    name: "Jim Morison",
    position: "Director, BAT",
    image: "/testimonial-client/client-1.jpg",
    quote:
      "I opened a checking and savings account at NeoBank. The teller who helped me was a pleasure to work with. She was very knowledgeable and thorough setting up my accounts. She made my day a pleasant day. Thank you for the terrific customer service.",
  },
  {
    name: "Alex Cruis",
    position: "CEO, IBAC",
    image: "/testimonial-client/client-2.jpg",
    quote:
      "I opened a checking and savings account at NeoBank. The teller who helped me was a pleasure to work with. She was very knowledgeable and thorough setting up my accounts. She made my day a pleasant day. Thank you for the terrific customer service.",
  },
  {
    name: "Tom Haris",
    position: "Engineer, Olleo",
    image: "/testimonial-client/client-3.jpg",
    quote:
      "I've been with NeoBank for four years. I went through a loan modification with them, as well as a six-month forbearance. I also have a credit card with them, which they have cancelled after every late payment, as well as a cash account with withdrawal fees. They are always there to help me.",
  },
  {
    name: "Harry Jackson",
    position: "Entrepreneur",
    image: "/testimonial-client/client-4.jpg",
    quote:
      "Karla treated me as if I were a person, not simply a customer. She remained on the phone with me until I had calmed down and she was satisfied that I was fine. She stated that she would not be able to go until she had further information.",
  },
  {
    name: "Chris Haris",
    position: "MD, ITec",
    image: "/testimonial-client/client-1.jpg",
    quote:
      "I usually request service through the app or website, although I have called in on occasion. They're all extremely responsive and accommodating.",
  },
]

const blogPosts = [
  {
    title: "5 Things You Need To Know Before Starting Business",
    category: "Corporate",
    date: "May 22, 2022",
    comments: "10+ Comments",
    image: "/blog-img/blog-1.jpg",
    url: "https://www.cnbc.com/2020/02/27/5-things-every-new-business-owner-needs-to-know-before-starting.html",
  },
  {
    title: "Effect Of Inflation On Our Daily Expenditure",
    category: "Consumer",
    date: "May 13, 2022",
    comments: "10+ Comments",
    image: "/blog-img/blog-2.jpg",
    url: "https://www.investopedia.com/articles/insights/122016/9-common-effects-inflation.asp",
  },
  {
    title: "7 Tips To Get Best Exchange Rate In Currency",
    category: "Finance",
    date: "Apr 15, 2022",
    comments: "10+ Comments",
    image: "/blog-img/blog-3.jpg",
    url: "https://www.airtreks.com/go/foreign-currency/",
  },
]

export default function Home() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  // Testimonial auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }



  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-emerald-900/30"></div>
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-slate-900/80 backdrop-blur-xl border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur-lg opacity-50"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                NeoBank
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Features", "Technology", "Security", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-green-400 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-4"
            >
              <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-green-400 hover:bg-green-500/10">
                  Access Portal
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25">
                  Join the Future
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-green-500/20"
          >
            <div className="px-4 py-6 space-y-4">
              {["Features", "Technology", "Security", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-slate-300 hover:text-green-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-green-500/20 space-y-3">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10">
                    Access Portal
                  </Button>
                </Link>
                <Link href="/login" className="block">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    Join the Future
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  SIMPLE, QUICK, SECURED
                </motion.div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white">Transfer Money</span>
                  <span className="text-white">Across The World In </span>
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Real time
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                  NeoBank transformed the digital banking industry using data and technology more than ten years ago. We
                  are now one of the largest digital banking providers, dedicated to innovating, simplifying, and
                  humanizing banking.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 items-start"
              >
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg shadow-2xl shadow-green-500/25"
                  >
                    ONLINE BANKING
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="lg"
                  className="text-green-400 hover:bg-green-500/10 px-8 py-6 text-lg group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                    <span>Watch Video</span>
                  </div>
                </Button>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-green-500/20"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-slate-800 flex items-center justify-center"
                    >
                      <User className="w-5 h-5 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-slate-300 text-sm">
                    Need Help? Contact our{" "}
                    <Link href="/contact" className="text-green-400 hover:text-green-300 transition-colors">
                      digital support
                    </Link>{" "}
                    & tell us about your query.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Floating Stats Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 left-8 z-10 bg-slate-800/90 backdrop-blur-xl border border-green-500/20 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h6 className="text-2xl font-bold text-white">18.5M+</h6>
                      <p className="text-green-400 text-sm">Active Users</p>
                    </div>
                  </div>
                </motion.div>

                {/* Main Hero Image */}
                <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-green-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                  <img
                    src="/hero-img-2.jpg"
                    alt="Digital Banking Interface"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Secondary Image */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 right-8 w-48 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden border border-green-500/20 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20"></div>
                  <img
                    src="/hero-img-3.jpg"
                    alt="Mobile Banking App"
                    className="w-full h-full object-cover opacity-80"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative z-10 py-16 bg-slate-800/30 border-y border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-8">
            <p className="text-slate-400 text-sm">Trusted by leading financial institutions worldwide</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {["TechCorp", "FinanceX", "GlobalBank", "CryptoVault", "PayFlow", "SecureNet"].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="w-24 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center border border-green-500/10 hover:border-green-500/30 transition-colors">
                  <span className="text-slate-400 text-xs font-medium">{partner}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* About Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Images */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="relative">
                {/* Decorative Shape */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>

                {/* Main Image */}
                <div className="relative w-full h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-green-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                  <img
                    src="/"
                    alt="About NeoBank"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Secondary Image */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-8 right-8 w-40 h-28 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden border border-green-500/20 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20"></div>
                  <img
                    src="/placeholder.svg?height=200&width=250"
                    alt="Digital Innovation"
                    className="w-full h-full object-cover opacity-80"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
                  <Sparkles className="w-4 h-4" />
                  ABOUT US
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  We revolutionized{" "}
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Digital Banking
                  </span>
                </h2>

                <p className="text-lg text-slate-300 leading-relaxed">
                  We've grown to become one of the largest digital banking providers, committed to inventing,
                  simplifying, and humanizing the banking experience.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Smartphone,
                    title: "Powerful Mobile & Online App",
                    description:
                      "Our mobile app service is quick and easy to use, and you can get it from your app store.",
                  },
                  {
                    icon: Zap,
                    title: "Brings More Transparency & Speed",
                    description:
                      "Our digital banking services are transparent and quick, and we're building a reliable network.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl border border-green-500/20"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/about">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3">
                  READ MORE
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-10 py-24 bg-slate-800/30 border-y border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
                  <Sparkles className="w-4 h-4" />
                  WHY CHOOSE US
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  We are{" "}
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    innovative and digital
                  </span>
                </h2>

                <p className="text-lg text-slate-300 leading-relaxed">
                  NeoBank transformed the credit card business using data and technology more than ten years ago. We are
                  now one of the largest digital banking providers, dedicated to innovating, simplifying, and humanizing
                  banking.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Historical Currency Rates",
                    description: "Access comprehensive historical data for informed trading decisions",
                  },
                  {
                    title: "Travel Expense Calculator",
                    description: "Plan your international trips with accurate expense calculations",
                  },
                  {
                    title: "Currency Email Updates",
                    description: "Stay informed with real-time currency rate notifications",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl border border-green-500/20"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Images */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-green-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                    <img
                      src="/wh-img-4.jpg"
                      alt="Digital Innovation"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="relative h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden border border-green-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20"></div>
                    <img
                      src="/wh-img-5.jpg"
                      alt="Banking Technology"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="flex items-end">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                    className="relative h-64 w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-green-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                    <img
                      src="/wh-img-6.jpg"
                      alt="Future Banking"
                      className="w-full h-full object-cover opacity-80"
                    />
                    {/* Decorative floating shape */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60"
                    ></motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative floating shape */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Exchange Rates Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-4">
              <TrendingUp className="w-4 h-4" />
              LIVE EXCHANGE RATES
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Exchange Money Across The World{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                In Real Time
              </span>{" "}
              With Lowest Fees
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl overflow-hidden"
          >
            {/* Table Header */}
            <div className="p-6 border-b border-green-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 text-sm">Inverse</span>
                    <div className="relative">
                      <input type="checkbox" id="inverse-toggle" className="sr-only" />
                      <label htmlFor="inverse-toggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                          <div className="w-10 h-6 bg-slate-600 rounded-full shadow-inner"></div>
                          <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 bg-white rounded-full shadow transition-transform"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </div>
              </div>
            </div>

            {/* Exchange Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-green-500/20">
                    <th className="text-left p-4 text-slate-300 font-medium">Currency</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Amount</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Change(24h)</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Chart(24h)</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      flag: "/flags/usa.png",
                      name: "US Dollar",
                      amount: "120.54",
                      change: "+0.50%",
                      positive: true,
                    },
                    {
                      flag: "/flags/japan.png",
                      name: "Japanese Yen",
                      amount: "134.76",
                      change: "+0.24%",
                      positive: true,
                    },
                    {
                      flag: "/flags/uk.png",
                      name: "British Pound",
                      amount: "245.10",
                      change: "-0.30%",
                      positive: false,
                    },
                    {
                      flag: "/flags/newzland.png",
                      name: "New Zealand Dollar",
                      amount: "0.7564",
                      change: "-0.063%",
                      positive: false,
                    },
                    {
                      flag: "/flags/canada.png",
                      name: "Canadian Dollar",
                      amount: "1.2741",
                      change: "-0.76%",
                      positive: false,
                    },
                    {
                      flag: "/flags/france.png",
                      name: "Euro",
                      amount: "1.0852",
                      change: "+0.12%",
                      positive: true,
                    },
                    {
                      flag: "/flags/china.png",
                      name: "Chinese Yuan",
                      amount: "7.1234",
                      change: "+0.18%",
                      positive: true,
                    },
                    {
                      flag: "/flags/korea.png",
                      name: "South Korean Won",
                      amount: "1320.45",
                      change: "-0.22%",
                      positive: false,
                    },
                  ].map((currency, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-green-500/10 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={currency.flag}
                            alt={currency.name + " flag"}
                            className="w-7 h-7 rounded-full border border-green-500/30 bg-white object-cover"
                          />
                          <span className="text-white font-medium">{currency.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-white font-mono">{currency.amount}</td>
                      <td className="p-4">
                        <span className={`font-medium ${currency.positive ? "text-green-400" : "text-red-400"}`}>
                          {currency.change}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="w-16 h-8 bg-slate-700 rounded flex items-center justify-center">
                          <svg
                            className={`w-12 h-6 ${currency.positive ? "text-green-400" : "text-red-400"}`}
                            viewBox="0 0 48 24"
                            fill="none"
                          >
                            <path
                              d="M2 12L8 6L16 18L24 8L32 14L40 4L46 10"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </td>
                      <td className="p-4">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                          Send
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-6 border-t border-green-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Currency
              </Button>
              <p className="text-slate-400 text-sm">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24 bg-slate-800/30 border-y border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              OUR REVIEWS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              More Than{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                18M+ Happy Customers
              </span>{" "}
              Trust Our Services
            </h2>
          </motion.div>

          <div className="relative">
            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div className="flex flex-nowrap gap-6 px-4">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    animate={{
                      x: activeTestimonial === index ? 0 : activeTestimonial < index ? "100%" : "-100%",
                      opacity: activeTestimonial === index ? 1 : 0,
                      scale: activeTestimonial === index ? 1 : 0.9,
                    }}
                    className={`w-full md:w-2/3 lg:w-1/2 mx-auto flex-shrink-0 ${activeTestimonial === index ? "block" : "hidden"
                      }`}
                  >
                    <Card className="bg-slate-800/50 border-green-500/20 transition-all duration-300 h-full backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500/30">
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                              <p className="text-sm text-slate-400">{testimonial.position}</p>
                            </div>
                          </div>
                          <div className="text-green-400 text-2xl">❝</div>
                        </div>
                        <p className="text-slate-300 italic leading-relaxed">{testimonial.quote}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? "bg-green-500 scale-125" : "bg-slate-600 hover:bg-green-500/50"
                    }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              OUR BLOG
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Keep Up To Date With{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Global Content
              </span>{" "}
              From Our Trusted Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-300 h-full backdrop-blur-sm overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10"></div>
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-green-500/80 text-white text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors line-clamp-2">
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </a>
                    </h3>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-400 text-sm font-medium hover:text-green-300 transition-colors"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-24 bg-slate-800/30 border-y border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              YOUR BENEFITS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                one-stop
              </span>{" "}
              digital banking platform
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Coverage",
                icon: Globe,
                description: "Access your money anywhere in the world with our borderless banking solution",
              },
              {
                title: "Easy Transfer Method",
                icon: ArrowRight,
                description: "Send money internationally with just a few taps on your device",
              },
              {
                title: "Global 24/7 Support",
                icon: Smartphone,
                description: "Our AI-powered support team is available around the clock to assist you",
              },
              {
                title: "Lowest Fee",
                icon: TrendingUp,
                description: "Enjoy competitive rates and minimal fees on all your transactions",
              },
              {
                title: "Instant Processing",
                icon: Zap,
                description: "Experience lightning-fast transaction processing with quantum technology",
              },
              {
                title: "Bank Level Security",
                icon: Shield,
                description: "Your assets are protected by military-grade encryption protocols",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-300 h-full backdrop-blur-sm group-hover:bg-slate-800/70">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Currency Tools Section */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-slate-800/50 to-green-900/20 border-y border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-4">
              <CreditCard className="w-4 h-4" />
              POPULAR CURRENCY TOOLS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Set Up & Exchange Money From{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Your Cards In A Minute
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "hand",
                title: "Money Transfer",
                description:
                  "With our digital platform, you may send money to relatives and friends all around the world.",
                link: "SEND MONEY",
                href: "/login",
              },
              {
                icon: "chart",
                title: "Currency Charts",
                description:
                  "You can always watch the market's movement and make trading decisions with our currency charts.",
                link: "VIEW CHART",
                href: "/login",
              },
              {
                icon: "alert",
                title: "Rate Alerts",
                description:
                  "To enable our clients to convert, we at NeoBank provide the finest currency rates in the market.",
                link: "CREATE ALERT",
                href: "/login",
              },
              {
                icon: "user",
                title: "Create Account",
                description: "Create a free digital bank account with us today to send money around the world.",
                link: "GET STARTED",
                href: "/login",
              },
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-green-500/20 hover:border-green-500/40 transition-all duration-300 h-full backdrop-blur-sm group-hover:bg-slate-800/70">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        {tool.icon === "hand" && <ArrowRight className="w-6 h-6 text-white" />}
                        {tool.icon === "chart" && <TrendingUp className="w-6 h-6 text-white" />}
                        {tool.icon === "alert" && <Bell className="w-6 h-6 text-white" />}
                        {tool.icon === "user" && <User className="w-6 h-6 text-white" />}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{tool.description}</p>
                    <Link
                      href={tool.href}
                      className="inline-flex items-center text-green-400 text-sm font-medium hover:text-green-300 transition-colors"
                    >
                      {tool.link} <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Ready to{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Evolve
              </span>{" "}
              Your Banking?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join millions of users who have already transformed their financial future with NeoBank's revolutionary
              digital banking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 text-lg shadow-2xl shadow-green-500/25"
                >
                  START YOUR JOURNEY
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 px-12 py-6 text-lg"
                >
                  CONTACT SUPPORT
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900 border-t border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur-lg opacity-50"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  NeoBank
                </span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                We are now one of the largest digital banking providers, dedicated to innovating, simplifying, and
                humanizing banking.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: "facebook", href: "https://facebook.com/" },
                  { icon: "twitter", href: "https://twitter.com/" },
                  { icon: "instagram", href: "https://instagram.com/" },
                  { icon: "linkedin", href: "https://linkedin.com/" },
                ].map((social, index) => {
                  const Icon =
                    social.icon === "facebook"
                      ? Facebook
                      : social.icon === "twitter"
                        ? Twitter
                        : social.icon === "instagram"
                          ? Instagram
                          : social.icon === "linkedin"
                            ? Linkedin
                            : null
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-slate-800 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/40 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    >
                      {Icon && <Icon className="w-5 h-5 text-slate-400 group-hover:text-green-400 transition-colors" />}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Business Banking", href: "/business-banking" },
                  { name: "Personal Banking", href: "/personal-banking" },
                  { name: "Credit Cards", href: "/cards" },
                  { name: "Loans", href: "/loans" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-slate-400 hover:text-green-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Resources</h3>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", href: "/contact" },
                  { name: "FAQ's", href: "/help" },
                  { name: "Download App", href: "/apps" },
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms & Conditions", href: "/terms-of-service" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-slate-400 hover:text-green-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="text-white font-medium text-sm mb-1">Location</h6>
                    <p className="text-slate-400 text-sm">301 East Water Street, Charlottesville, VA 22904 Virginia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="text-white font-medium text-sm mb-1">Email</h6>
                    <a href="mailto:support@neobank.com" className="text-slate-400 text-sm hover:text-green-400">
                      support@neobank.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="text-white font-medium text-sm mb-1">Phone</h6>
                    <span className="text-slate-400 text-sm">VIP ONLY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-green-500/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} Copyright. All Rights Reserved By{" "}
                <Link href="/" className="text-green-400 hover:text-green-300">
                  NeoBank
                </Link>
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy-policy" className="text-slate-400 hover:text-green-400 text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-slate-400 hover:text-green-400 text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  )
}
