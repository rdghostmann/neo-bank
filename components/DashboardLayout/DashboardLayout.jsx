"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, CreditCard, TrendingUp, Settings, Menu, Bell, Search, Users, Shield, BarChart3, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoutButton } from "../Logout-button/logout-button"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Cards", href: "/cards", icon: CreditCard },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
]

const adminNavigation = [
  { name: "Overview", href: "/admin", icon: BarChart3 },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "KYC", href: "/admin/kyc", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function Layout({ children, isAdmin = false }) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navItems = isAdmin ? adminNavigation : navigation

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  }

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r"
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">{isAdmin ? "Admin Panel" : "NeoBank"}</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent",
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
            <div className="p-4 border-t">
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{isAdmin ? "Admin User" : "Alex Johnson"}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {isAdmin ? "admin@neobank.com" : "alex@example.com"}
                  </p>
                </div>
              </div>
              <LogoutButton variant="outline" className="w-full text-sm" />
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
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r"
            >
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between px-6 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">{isAdmin ? "Admin" : "NeoBank"}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.name} href={item.href}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent",
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
      <div className={cn("flex flex-col", !isMobile && "ml-64")}>
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6"
        >
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          )}

          <div className="flex-1" />

          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>

          {isMobile && (
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          )}
        </motion.header>

        {/* Page Content */}
        <main className={cn("flex-1", isMobile && "pb-20")}>{children}</main>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t"
          >
            <nav className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} className="flex-1">
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex flex-col items-center gap-1 py-2 px-3 rounded-lg mx-1",
                        isActive ? "text-primary" : "text-muted-foreground",
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
