"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, CreditCard, AlertTriangle, DollarSign, Activity, UserPlus, List, Shield, BarChart3 } from "lucide-react"
import { LogoutButton } from "@/components/Logout-button/logout-button";
import Link from "next/link"
import { Layout } from "@/components/DashboardLayout/DashboardLayout"
import StatCard from "./components/StatsCard"
import RecentActivityCard from "./components/RecentActivityCard"

const stats = [
  {
    title: "Total Customers",
    value: "12,345",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Accounts",
    value: "9,876",
    change: "+8%",
    icon: CreditCard,
    color: "text-green-600",
  },
  {
    title: "Total Volume",
    value: "$2.4M",
    change: "+23%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Pending KYC",
    value: "156",
    change: "-5%",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
]

const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "Account Created",
    time: "2 minutes ago",
    status: "success",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "KYC Approved",
    time: "5 minutes ago",
    status: "success",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Large Transaction",
    time: "10 minutes ago",
    status: "warning",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "KYC Rejected",
    time: "15 minutes ago",
    status: "error",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    user: "David Chen",
    action: "Password Reset",
    time: "20 minutes ago",
    status: "info",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const kycQueue = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex@example.com",
    submitted: "2 hours ago",
    status: "pending",
    documents: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    submitted: "4 hours ago",
    status: "review",
    documents: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "David Chen",
    email: "david@example.com",
    submitted: "6 hours ago",
    status: "pending",
    documents: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// const recentCustomers = [
//   {
//     id: 1,
//     name: "Emily Johnson",
//     email: "emily@example.com",
//     joinDate: "Today",
//     status: "active",
//     balance: "$2,450.00",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 2,
//     name: "Robert Smith",
//     email: "robert@example.com",
//     joinDate: "Yesterday",
//     status: "pending",
//     balance: "$0.00",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 3,
//     name: "Lisa Brown",
//     email: "lisa@example.com",
//     joinDate: "2 days ago",
//     status: "active",
//     balance: "$5,230.50",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
// ]

export default function AdminDashboard({ recentActivity, recentCustomers }) {
  return (
    <Layout >
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your banking platform</p>
            <LogoutButton />

          </div>
          <div className="flex gap-2">
            <Link href="/admin/customers/add">
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </Link>
            <Button variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <StatCard {...stat} Icon={stat.icon} />
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/customers/add">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                    <UserPlus className="w-6 h-6" />
                    <span className="text-sm">Add Customer</span>
                  </Button>
                </Link>
                <Link href="/admin/customers">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                    <List className="w-6 h-6" />
                    <span className="text-sm">Customer List</span>
                  </Button>
                </Link>
                <Link href="/admin/kyc">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                    <Shield className="w-6 h-6" />
                    <span className="text-sm">Review KYC</span>
                  </Button>
                </Link>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <RecentActivityCard recentActivity={recentActivity} />
          </motion.div>

          {/* Recent Customers */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Customers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCustomers.map((customer) => (
                  <motion.div
                    key={customer._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent"
                  >
                    <Avatar>
                      <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {customer.username
                          ? customer.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{customer.username}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                      <p className="text-xs text-muted-foreground">Joined {customer.joinDate}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={customer.type === "active" ? "default" : "secondary"} className="text-xs">
                        {customer.type}
                      </Badge>
                      <p className="text-xs font-medium mt-1">{customer.balance}</p>
                    </div>
                  </motion.div>
                ))}
                <Link href="/admin/customers">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Customers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* KYC Queue */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  KYC Review Queue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {kycQueue.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.documents} docs • {item.submitted}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.type === "pending" ? "secondary" : "outline"} className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
                <Link href="/admin/kyc">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Pending
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
