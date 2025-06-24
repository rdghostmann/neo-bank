"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Plus, Eye, EyeOff, Copy, Settings, Lock, Unlock, Pause, TrendingUp, Clock } from "lucide-react"
import { CustomerLayout } from "@/components/CustomerLayout/CustomerLayout"

// ...existing code...

export default function AccountsPage({accounts}) {
  const [showDetails, setShowDetails] = useState({})
  const [accountStatuses, setAccountStatuses] = useState({
    1: "active",
    2: "active",
    3: "active",
  })

  const toggleCardDetails = (accountId) => {
    setShowDetails((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }))
  }

  const toggleCardStatus = (accountId) => {
    setAccountStatuses((prev) => ({
      ...prev,
      [accountId]: prev[accountId] === "active" ? "locked" : "active",
    }))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

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
            <h1 className="text-2xl font-bold">My Accounts</h1>
            <p className="text-muted-foreground">Manage your banking accounts and cards</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Open New Account
          </Button>
        </motion.div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="space-y-4"
            >
              {/* Account Visual */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative h-48 rounded-xl bg-gradient-to-br ${account.color} p-6 text-white overflow-hidden cursor-pointer`}
                onClick={() => toggleCardDetails(account.id)}
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm opacity-80">{account.type} Account</p>
                    {/* CHANGED: Use account.status from DB for badge */}
                    <Badge
                      variant={account.status === "active" ? "default" : "destructive"}
                      className="mt-1"
                    >
                      {account.status}
                    </Badge>
                  </div>
                  <CreditCard className="w-8 h-8 opacity-80" />
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-mono tracking-wider">
                    {showDetails[account.id] ? account.number : "•••• •••• •••• " + account.number.slice(-4)}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-80">Balance</p>
                      <p className="text-xl font-bold">${account.balance.toLocaleString()}</p>
                    </div>
                    {account.type === "Credit" && (
                      <div className="text-right">
                        <p className="text-xs opacity-80">Available</p>
                        <p className="text-sm font-mono">${account.availableBalance.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
              </motion.div>

              {/* Account Details */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: showDetails[account.id] ? 1 : 0,
                  height: showDetails[account.id] ? "auto" : 0,
                }}
                className="overflow-hidden"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Account Number</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(account.number)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="font-mono">{account.number}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {account.type === "Credit" && (
                        <>
                          <div>
                            <p className="text-sm text-muted-foreground">Expiry Date</p>
                            <p className="font-mono">{account.expiryDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">CVV</p>
                            <p className="font-mono">{account.cvv}</p>
                          </div>
                        </>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-mono">{account.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Opened On</p>
                        <p className="font-mono">{account.openedDate}</p>
                      </div>
                    </div>

                    {account.type === "Credit" && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Credit Limit</span>
                          <span className="font-medium">${account.creditLimit?.toLocaleString()}</span>
                        </div>
                        <Progress value={(account.balance / (account.creditLimit || 1)) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Used: ${account.balance.toLocaleString()}</span>
                          <span>Available: ${account.availableBalance.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4 p-2 bg-amber-50 rounded-md">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <div>
                              <p className="text-sm font-medium text-amber-800">Payment Due</p>
                              <p className="text-xs text-amber-700">{account.paymentDue}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-amber-800">${account.minimumPayment?.toFixed(2)}</p>
                            <p className="text-xs text-amber-700">Minimum Payment</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Actions */}
              <Card>
                <CardContent className="p-4">
                  <Tabs defaultValue="actions">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="actions">Quick Actions</TabsTrigger>
                      <TabsTrigger value="info">Account Info</TabsTrigger>
                    </TabsList>
                    <TabsContent value="actions" className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleCardDetails(account.id)}>
                          {showDetails[account.id] ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Show Details
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toggleCardStatus(account.id)}>
                          {accountStatuses[account.id] === "active" ? (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Lock Account
                            </>
                          ) : (
                            <>
                              <Unlock className="w-4 h-4 mr-2" />
                              Unlock Account
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-2" />
                          Freeze Card
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </TabsContent>
                    {/* CHANGED: Use account.status from DB for badge in Account Info */}
                    <TabsContent value="info">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge variant={account.status === "active" ? "default" : "destructive"}>
                            {account.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Transactions</span>
                          <span className="font-medium">{account.transactions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Account Type</span>
                          <span className="font-medium">{account.type}</span>
                        </div>
                        {account.type === "Credit" && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Credit Limit</span>
                            <span className="font-medium">${account.creditLimit?.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Account Benefits */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Account Benefits & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">No Annual Fee</h3>
                  <p className="text-sm text-muted-foreground">Enjoy all benefits without any yearly charges</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Secure Transactions</h3>
                  <p className="text-sm text-muted-foreground">Advanced security features to protect your money</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Cashback Rewards</h3>
                  <p className="text-sm text-muted-foreground">Earn rewards on every purchase you make</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </CustomerLayout>
  )
}