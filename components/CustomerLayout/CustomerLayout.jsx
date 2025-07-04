"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, CreditCard, TrendingUp, Menu, Bell, Search, X, Wallet, Receipt, User as UserIcon } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogoutButton } from "../Logout-button/logout-button"
import { useSession, signIn } from "next-auth/react"
import Loading from "@/app/dashboard/loading"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Accounts", href: "/dashboard/accounts", icon: Wallet },
  { name: "Transactions", href: "/dashboard/transactions", icon: Receipt },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
]

export function CustomerLayout({ children }) {
  // state and router hooks
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // auth session
  const { data: session, status } = useSession()

  // screen size effect (always runs)
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // redirect effect (always runs)
  useEffect(() => {
    if (status === "unauthenticated") signIn()
  }, [status])

  if (status === "loading") {
    return(
      <>
      <Loading />
      </>
    )
  }

  if (!session) {
    return <p>No user signed in.</p>
  }

  const authUser = session.user
  const currentUser = {
    name: authUser.username ?? authUser.name ?? "Alex Johnson",
    email: authUser.email,
  }

  // animation variants
  const sidebarVariants = { open: { x: 0 }, closed: { x: "-100%" } }
  const overlayVariants = { open: { opacity: 1 }, closed: { opacity: 0 } }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-green-100 shadow-xl"
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-20 items-center px-6 border-b border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    NeoBank
                  </span>
                  <p className="text-xs text-muted-foreground">Digital Banking</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                          : "text-slate-600 hover:text-green-600 hover:bg-green-50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </motion.div>
                  </Link>
                )
              })}
            </nav>

            {/* User Profile */}
            <div className="p-6 border-b border-green-100">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 ring-2 ring-green-200">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-green-100">
              <LogoutButton variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-green-100 shadow-2xl"
            >
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between px-6 border-b border-green-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      NeoBank
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.name} href={item.href}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                            isActive
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                              : "text-slate-600 hover:text-green-600 hover:bg-green-50"
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          {item.name}
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={cn("flex flex-col min-h-screen", !isMobile && "ml-72")}>        
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-green-100 bg-white/80 backdrop-blur-xl px-4 lg:px-6 shadow-sm"
        >
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          )}

          <div className="flex-1" />

          <Button variant="ghost" size="icon" className="bg-gray-100 hover:bg-gray-200 relative">
            <Bell className="w-5 h-5 text-green-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
          </Button>

          {isMobile && (
            <Avatar className="w-8 h-8 ring-2 ring-green-200">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-green-100 shadow-lg">
            <nav className="flex items-center justify-around py-2 px-4">
              {navigation.slice(0, 4).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} className="flex-1">
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex flex-col items-center gap-1 py-2 px-3 rounded-xl mx-1 transition-colors",
                        isActive ? "text-green-600 bg-green-50" : "text-slate-500 hover:text-green-600"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </div>
    </div>
  )
}
