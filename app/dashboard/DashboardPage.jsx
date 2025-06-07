"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CreditCard,
  Plus,
  Send,
  Smartphone,
  Wifi,
  Bell,
  Target,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
} from "lucide-react"
// import { CustomerLayout } from "@/components/customer-layout"

import { LogoutButton } from '@/components/Logout-button/logout-button';
import { CustomerLayout } from "@/components/CustomerLayout/CustomerLayout"

const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 2500.0,
    description: "Salary Deposit",
    date: "Today, 2:30 PM",
    category: "Income",
    avatar: "💼",
  },
  {
    id: 2,
    type: "debit",
    amount: 45.99,
    description: "Netflix Subscription",
    date: "Yesterday, 11:45 AM",
    category: "Entertainment",
    avatar: "🎬",
  },
  {
    id: 3,
    type: "debit",
    amount: 120.5,
    description: "Grocery Store",
    date: "Dec 28, 4:20 PM",
    category: "Shopping",
    avatar: "🛒",
  },
  {
    id: 4,
    type: "credit",
    amount: 75.0,
    description: "Cashback Reward",
    date: "Dec 27, 9:15 AM",
    category: "Rewards",
    avatar: "🎁",
  },
]

const quickActions = [
  { icon: Send, label: "Transfer", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
  { icon: Plus, label: "Deposit", color: "from-green-500 to-green-600", bgColor: "bg-green-50" },
  { icon: Smartphone, label: "Mobile Pay", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50" },
  { icon: Wifi, label: "Pay Bills", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50" },
]

const notifications = [
  {
    id: 1,
    title: "Payment Received",
    message: "You received $2,500 from Acme Corp",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: 2,
    title: "Bill Reminder",
    message: "Your electricity bill is due tomorrow",
    time: "1 day ago",
    type: "warning",
  },
  {
    id: 3,
    title: "Security Alert",
    message: "New login from Chrome on Windows",
    time: "2 days ago",
    type: "info",
  },
]

export default function Dashboard() {
  const user  = {
    name: "User"
  }
  const [selectedCard, setSelectedCard] = useState(0)
  const [showBalance, setShowBalance] = useState(true)

  const cards = [
    {
      type: "Checking",
      number: "•••• 4532",
      balance: 12345.67,
      color: "from-green-500 to-emerald-600",
    },
    {
      type: "Savings",
      number: "•••• 7891",
      balance: 25678.9,
      color: "from-blue-500 to-blue-600",
    },
    {
      type: "Credit",
      number: "•••• 2468",
      balance: 3456.78,
      color: "from-purple-500 to-purple-600",
    },
  ]

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0)

  return (
    <CustomerLayout>
      <div className="space-y-6 p-4 md:p-6 pb-20 md:pb-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 ring-4 ring-green-100">
              <AvatarImage src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xl">
                {user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Good morning, {user?.name?.split(" ")[0] || "Alex"}! 👋
              </h1>
              <LogoutButton />
              <div className="flex items-center gap-2">
                <p className="text-slate-600">Total Balance:</p>
                <div className="flex items-center gap-2">
                  {showBalance ? (
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ${totalBalance.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-2xl font-bold text-slate-400">••••••</span>
                  )}
                  <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hidden md:flex">
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </motion.div>

        {/* Cards Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-slate-800">Your Accounts</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard(index)}
                className={`min-w-[300px] h-[180px] rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white cursor-pointer relative overflow-hidden shadow-xl ${
                  selectedCard === index ? "ring-4 ring-green-200 ring-offset-2" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm opacity-90 font-medium">{card.type} Account</p>
                    <p className="text-lg font-mono tracking-wider mt-1">{card.number}</p>
                  </div>
                  <CreditCard className="w-8 h-8 opacity-90" />
                </div>
                <div>
                  <p className="text-sm opacity-90 font-medium">Available Balance</p>
                  <p className="text-2xl font-bold">{showBalance ? `$${card.balance.toLocaleString()}` : "••••••"}</p>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-6 rounded-2xl ${action.bgColor} border border-white/50 cursor-pointer hover:shadow-lg transition-all duration-200`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-lg`}
                >
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{action.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="text-xl font-bold text-slate-800">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Monthly Income</CardTitle>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$8,450</div>
                  <p className="text-xs text-green-600/70">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-red-100 bg-gradient-to-br from-red-50 to-rose-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Monthly Expenses</CardTitle>
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">$3,240</div>
                  <p className="text-xs text-red-600/70">-8% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Savings Goal</CardTitle>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <p className="text-xs text-blue-600/70">$8,500 of $10,000</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-4 h-4 text-green-600" />
                  </div>
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === "success"
                          ? "bg-green-500"
                          : notification.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{notification.title}</p>
                      <p className="text-xs text-slate-600">{notification.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-green-600 hover:bg-green-50">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Recent Transactions</h2>
            <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
              View All
            </Button>
          </div>
          <Card className="border-green-100">
            <CardContent className="p-0">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 border-b border-green-50 last:border-b-0 hover:bg-green-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-lg">
                      {transaction.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{transaction.description}</p>
                      <p className="text-sm text-slate-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                    <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {transaction.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </CustomerLayout>
  )
}
