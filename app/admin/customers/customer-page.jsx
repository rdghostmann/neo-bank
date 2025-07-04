"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Download,
  Mail,
  Phone,
  CreditCard,
  Shield,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { Layout } from "@/components/DashboardLayout/DashboardLayout"

const stats = [
  { label: "Total Customers", value: "12,345", color: "text-blue-600" },
  { label: "Active", value: "9,876", color: "text-green-600" },
  { label: "Inactive", value: "1,234", color: "text-yellow-600" },
  { label: "Suspended", value: "235", color: "text-red-600" },
]

export default function CustomersPage({ customers: initialCustomers }) {
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [kycFilter, setKycFilter] = useState("all")
  const [loadingUserId, setLoadingUserId] = useState(null)

  const handleToggle = async (userId) => {
    setLoadingUserId(userId)

    try {
      const res = await fetch("/api/admin/toggle-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (data.success) {
        setCustomers((prev) =>
          prev.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  isActive: data.status === "active",
                  status: data.status,
                }
              : user
          )
        )
      }
    } catch (err) {
      console.error("Error toggling user:", err)
    } finally {
      setLoadingUserId(null)
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const name = customer.name || ""
    const email = customer.email || ""
    const phone = customer.phone || ""

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm)

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter
    const matchesKyc =
      kycFilter === "all" || customer.kycStatus === kycFilter

    return matchesSearch && matchesStatus && matchesKyc
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getKycStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <h1 className="text-2xl font-bold">Customer Management</h1>
            <p className="text-muted-foreground">
              Manage and monitor all customer accounts
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Link href="/admin/customers/add">
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
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
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {/* Status filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>
                  Suspended
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* KYC filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  KYC: {kycFilter === "all" ? "All" : kycFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setKycFilter("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setKycFilter("verified")}>
                  Verified
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setKycFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setKycFilter("rejected")}>
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Customer</th>
                      <th className="p-4 font-medium">Contact</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">KYC</th>
                      <th className="p-4 font-medium">Balance</th>
                      <th className="p-4 font-medium">Account Type</th>
                      <th className="p-4 font-medium">Last Login</th>
                      <th className="p-4 font-medium">Status Switch</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-accent/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {(customer.name || "NA")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.username || "No Name"}</p>
                              <p className="text-sm text-muted-foreground">
                                ID: {customer.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getKycStatusColor(customer.kycStatus)}>
                            {customer.kycStatus}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <p className="font-medium">{customer.balance}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            {customer.accountType}
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm">{customer.lastLogin}</p>
                        </td>
                        <td className="p-4">
                          {loadingUserId === customer.id ? (
                            <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                          ) : (
                            <Switch
                              checked={customer.isActive}
                              onCheckedChange={() => handleToggle(customer.id)}
                              className={`${
                                customer.isActive ? "bg-green-500" : "bg-gray-300"
                              } border rounded-full`}
                            />
                          )}
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="w-4 h-4 mr-2" />
                                Manage Accounts
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Suspend Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
    </Layout>
  )
}
