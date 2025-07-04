"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Smartphone,
  Download,
} from "lucide-react"
import { Layout } from "@/components/DashboardLayout/DashboardLayout"

const monthlyData = [
  { month: "Jan", income: 4500, expenses: 3200 },
  { month: "Feb", income: 4800, expenses: 3100 },
  { month: "Mar", income: 4200, expenses: 3400 },
  { month: "Apr", income: 5100, expenses: 3600 },
  { month: "May", income: 4900, expenses: 3300 },
  { month: "Jun", income: 5300, expenses: 3800 },
]

const categories = [
  { name: "Shopping", amount: 1240, percentage: 32, icon: ShoppingCart, color: "bg-blue-500" },
  { name: "Transportation", amount: 680, percentage: 18, icon: Car, color: "bg-green-500" },
  { name: "Food & Dining", amount: 520, percentage: 14, icon: Utensils, color: "bg-orange-500" },
  { name: "Bills & Utilities", amount: 450, percentage: 12, icon: Home, color: "bg-purple-500" },
  { name: "Entertainment", amount: 320, percentage: 8, icon: Smartphone, color: "bg-pink-500" },
  { name: "Others", amount: 590, percentage: 16, icon: DollarSign, color: "bg-gray-500" },
]

const insights = [
  {
    title: "Spending Trend",
    description: "Your spending decreased by 8% this month",
    type: "positive",
    icon: TrendingDown,
  },
  {
    title: "Top Category",
    description: "Shopping accounts for 32% of your expenses",
    type: "neutral",
    icon: ShoppingCart,
  },
  {
    title: "Savings Goal",
    description: "You're 85% towards your monthly savings goal",
    type: "positive",
    icon: TrendingUp,
  },
]

export default function AnalyticsPage() {
  return (
    <Layout isAdmin>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold">Financial Analytics</h1>
            <p className="text-muted-foreground">Track your spending patterns and financial health</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$5,300</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$3,800</div>
              <p className="text-xs text-muted-foreground">-8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$1,500</div>
              <p className="text-xs text-muted-foreground">+28% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <motion.div
                      key={data.month}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium w-12">{data.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="flex gap-1 h-8">
                          <div
                            className="bg-green-500 rounded-sm flex items-center justify-center text-xs text-white"
                            style={{ width: `${(data.income / 6000) * 100}%` }}
                          >
                            ${data.income}
                          </div>
                          <div
                            className="bg-red-500 rounded-sm flex items-center justify-center text-xs text-white"
                            style={{ width: `${(data.expenses / 6000) * 100}%` }}
                          >
                            ${data.expenses}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                      <span>Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                      <span>Expenses</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Spending Categories */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center`}>
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm font-semibold">${category.amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${category.percentage}%` }}
                              transition={{ delay: 0.2 * index, duration: 0.8 }}
                              className={`h-2 rounded-full ${category.color}`}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{category.percentage}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Financial Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-4 rounded-lg border"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        insight.type === "positive"
                          ? "bg-green-100 text-green-600"
                          : insight.type === "negative"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <insight.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{insight.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Savings Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Emergency Fund</span>
                    <span className="text-sm text-muted-foreground">$8,500 / $10,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ delay: 0.6, duration: 1 }}
                      className="bg-green-500 h-3 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">85% complete</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Vacation Fund</span>
                    <span className="text-sm text-muted-foreground">$2,100 / $5,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "42%" }}
                      transition={{ delay: 0.7, duration: 1 }}
                      className="bg-blue-500 h-3 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">42% complete</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">New Car</span>
                    <span className="text-sm text-muted-foreground">$12,000 / $25,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "48%" }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="bg-purple-500 h-3 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">48% complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  )
}
