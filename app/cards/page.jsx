"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Eye, EyeOff, Copy, Settings, Lock, Unlock, Pause } from "lucide-react"
import { Layout } from "@/components/DashboardLayout/DashboardLayout"

const cards = [
  {
    id: 1,
    type: "Checking",
    number: "4532 1234 5678 9012",
    balance: 12345.67,
    color: "from-blue-600 to-blue-800",
    status: "active",
    expiryDate: "12/26",
    cvv: "123",
  },
  {
    id: 2,
    type: "Savings",
    number: "4532 7891 2345 6789",
    balance: 25678.9,
    color: "from-green-600 to-green-800",
    status: "active",
    expiryDate: "08/27",
    cvv: "456",
  },
  {
    id: 3,
    type: "Credit",
    number: "4532 2468 1357 9024",
    balance: 3456.78,
    color: "from-purple-600 to-purple-800",
    status: "locked",
    expiryDate: "03/28",
    cvv: "789",
  },
]

export default function CardsPage() {
  const [showDetails, setShowDetails] = useState({})
  const [cardStatuses, setCardStatuses] = useState({
    1: "active",
    2: "active",
    3: "locked",
  })

  const toggleCardDetails = (cardId) => {
    setShowDetails((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  const toggleCardStatus = (cardId) => {
    setCardStatuses((prev) => ({
      ...prev,
      [cardId]: prev[cardId] === "active" ? "locked" : "active",
    }))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
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
            <h1 className="text-2xl font-bold">My Cards</h1>
            <p className="text-muted-foreground">Manage your debit and credit cards</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Card
          </Button>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="space-y-4"
            >
              {/* Card Visual */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative h-48 rounded-xl bg-gradient-to-br ${card.color} p-6 text-white overflow-hidden cursor-pointer`}
                onClick={() => toggleCardDetails(card.id)}
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm opacity-80">{card.type} Card</p>
                    <Badge variant={cardStatuses[card.id] === "active" ? "default" : "destructive"} className="mt-1">
                      {cardStatuses[card.id]}
                    </Badge>
                  </div>
                  <CreditCard className="w-8 h-8 opacity-80" />
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-mono tracking-wider">
                    {showDetails[card.id] ? card.number : "•••• •••• •••• " + card.number.slice(-4)}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-80">Balance</p>
                      <p className="text-xl font-bold">${card.balance.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-80">Expires</p>
                      <p className="text-sm font-mono">{card.expiryDate}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
              </motion.div>

              {/* Card Details */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: showDetails[card.id] ? 1 : 0,
                  height: showDetails[card.id] ? "auto" : 0,
                }}
                className="overflow-hidden"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Card Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Card Number</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(card.number)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="font-mono">{card.number}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        <p className="font-mono">{card.expiryDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CVV</p>
                        <p className="font-mono">{card.cvv}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card Actions */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleCardDetails(card.id)}>
                      {showDetails[card.id] ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Show
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toggleCardStatus(card.id)}>
                      {cardStatuses[card.id] === "active" ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Lock
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 mr-2" />
                          Unlock
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-2" />
                      Freeze
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Card Benefits */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Card Benefits & Features</CardTitle>
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
                    <Plus className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Cashback Rewards</h3>
                  <p className="text-sm text-muted-foreground">Earn rewards on every purchase you make</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  )
}
