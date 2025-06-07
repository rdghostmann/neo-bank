"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react"
import { CustomerLayout } from "@/components/CustomerLayout/CustomerLayout"

const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 2500.0,
    description: "Salary Deposit",
    date: "2024-01-15",
    time: "14:30:00",
    category: "Income",
    account: "Checking",
    reference: "REF123456789",
    status: "completed",
    avatar: "💼",
  },
  {
    id: 2,
    type: "debit",
    amount: 45.99,
    description: "Netflix Subscription",
    date: "2024-01-14",
    time: "11:45:00",
    category: "Entertainment",
    account: "Credit",
    reference: "REF987654321",
    status: "completed",
    avatar: "🎬",
  },
  {
    id: 3,
    type: "debit",
    amount: 120.5,
    description: "Grocery Store",
    date: "2023-12-28",
    time: "16:20:00",
    category: "Shopping",
    account: "Checking",
    reference: "REF456789123",
    status: "completed",
    avatar: "🛒",
  },
  {
    id: 4,
    type: "credit",
    amount: 75.0,
    description: "Cashback Reward",
    date: "2023-12-27",
    time: "09:15:00",
    category: "Rewards",
    account: "Credit",
    reference: "REF789123456",
    status: "completed",
    avatar: "🎁",
  },
  {
    id: 5,
    type: "debit",
    amount: 89.99,
    description: "Electric Bill",
    date: "2023-12-26",
    time: "15:15:00",
    category: "Bills",
    account: "Checking",
    reference: "REF321654987",
    status: "completed",
    avatar: "⚡",
  },
  {
    id: 6,
    type: "debit",
    amount: 35.5,
    description: "Restaurant",
    date: "2023-12-25",
    time: "19:45:00",
    category: "Dining",
    account: "Credit",
    reference: "REF654987321",
    status: "completed",
    avatar: "🍽️",
  },
  {
    id: 7,
    type: "debit",
    amount: 65.0,
    description: "Gas Station",
    date: "2023-12-24",
    time: "10:30:00",
    category: "Transportation",
    account: "Checking",
    reference: "REF987321654",
    status: "completed",
    avatar: "⛽",
  },
  {
    id: 8,
    type: "credit",
    amount: 500.0,
    description: "Freelance Payment",
    date: "2023-12-23",
    time: "13:20:00",
    category: "Income",
    account: "Savings",
    reference: "REF159753486",
    status: "completed",
    avatar: "💻",
  },
  {
    id: 9,
    type: "debit",
    amount: 129.99,
    description: "Phone Bill",
    date: "2023-12-22",
    time: "08:45:00",
    category: "Bills",
    account: "Checking",
    reference: "REF753159486",
    status: "completed",
    avatar: "📱",
  },
  {
    id: 10,
    type: "debit",
    amount: 250.0,
    description: "Rent Payment",
    date: "2023-12-01",
    time: "09:00:00",
    category: "Housing",
    account: "Checking",
    reference: "REF486753159",
    status: "completed",
    avatar: "🏠",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")

  const categories = [...new Set(transactions.map((t) => t.category))]
  const accounts = [...new Set(transactions.map((t) => t.account))]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter
    const matchesAccount = accountFilter === "all" || transaction.account === accountFilter

    return matchesSearch && matchesType && matchesCategory && matchesAccount
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const totalIncome = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "debit").reduce((sum, t) => sum + t.amount, 0)

  return (
    <CustomerLayout>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">View and manage your transaction history</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Balance</p>
                  <p className="text-2xl font-bold text-blue-600">${(totalIncome - totalExpenses).toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Income</SelectItem>
                <SelectItem value="debit">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={accountFilter} onValueChange={setAccountFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History ({filteredTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Description</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Category</th>
                      <th className="p-4 font-medium">Account</th>
                      <th className="p-4 font-medium">Amount</th>
                      <th className="p-4 font-medium">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-accent/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg">
                              {transaction.avatar}
                            </div>
                            <span className="font-medium">{transaction.description}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p>{formatDate(transaction.date)}</p>
                            <p className="text-xs text-muted-foreground">{transaction.time.substring(0, 5)}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="secondary">{transaction.category}</Badge>
                        </td>
                        <td className="p-4">{transaction.account}</td>
                        <td className="p-4">
                          <span
                            className={`font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-xs text-muted-foreground">{transaction.reference}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </CustomerLayout>
  )
}
