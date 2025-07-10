"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Clock, XCircle, ArrowLeft, Download, Share, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function TransactionStatus() {
  const searchParams = useSearchParams()
  const [transactionData, setTransactionData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const status = searchParams.get("status") || "success"
    const type = searchParams.get("type") || "transfer"
    const reference = searchParams.get("ref") || `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

    const storedData = localStorage.getItem("lastTransaction")

    if (storedData) {
      const parsed = JSON.parse(storedData)
      setTransactionData({
        ...parsed,
        status,
        reference,
      })
    } else {
      const mockData = {
        reference,
        amount: "250.00",
        type,
        timestamp: new Date().toISOString(),
        status,
      }

      switch (type) {
        case "transfer":
          mockData.recipientName = "John Smith"
          mockData.bankName = "Chase Bank"
          mockData.accountNumber = "••••1234"
          break
        case "deposit":
          mockData.type = "Mobile Check Deposit"
          break
        case "mobilepay":
          mockData.phone = "+1 (555) 123-4567"
          mockData.recipientName = "Sarah Wilson"
          break
        case "paybill":
          mockData.provider = "ConEd"
          mockData.type = "Utilities"
          break
      }

      if (status === "error") {
        mockData.errorMessage = "Transaction failed due to insufficient funds. Please try again."
      }

      setTransactionData(mockData)
    }

    setIsLoading(false)
  }, [searchParams])

  const getStatusConfig = (status) => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          iconColor: "text-green-600",
          bgColor: "bg-green-100",
          title: "Transaction Successful!",
          subtitle: "Your transaction has been completed successfully",
          badgeColor: "bg-green-500 text-white",
          badgeText: "Completed",
        }
      case "pending":
        return {
          icon: Clock,
          iconColor: "text-orange-600",
          bgColor: "bg-orange-100",
          title: "Transaction Pending",
          subtitle: "Your transaction is being processed",
          badgeColor: "bg-orange-500 text-white",
          badgeText: "Processing",
        }
      case "error":
        return {
          icon: XCircle,
          iconColor: "text-red-600",
          bgColor: "bg-red-100",
          title: "Transaction Failed",
          subtitle: "We couldn't process your transaction",
          badgeColor: "bg-red-500 text-white",
          badgeText: "Failed",
        }
      default:
        return {
          icon: Clock,
          iconColor: "text-gray-700",
          bgColor: "bg-gray-200",
          title: "Transaction Status",
          subtitle: "Checking transaction status...",
          badgeColor: "bg-gray-500 text-white",
          badgeText: "Unknown",
        }
    }
  }

  const formatAmount = (amount) => {
    const num = Number.parseFloat(amount)
    return isNaN(num) ? "$0.00" : `$${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleBack = () => window.history.back()
  const handleRetry = () => {
    localStorage.removeItem("lastTransaction")
    window.location.href = "/dashboard"
  }
  const handleDownloadReceipt = () => console.log("Downloading receipt...")
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Transaction Receipt",
        text: `Transaction ${transactionData?.reference} - ${formatAmount(transactionData?.amount || "0")}`,
      })
    }
  }

  if (isLoading || !transactionData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const statusConfig = getStatusConfig(transactionData.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-black">Transaction Details</h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          <Card className="text-center bg-white border border-gray-200 shadow-sm">
            <CardContent className="pt-8 pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`w-20 h-20 ${statusConfig.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <StatusIcon className={`w-10 h-10 ${statusConfig.iconColor}`} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-2xl font-bold text-black">{statusConfig.title}</h2>
                <p className="text-gray-700">{statusConfig.subtitle}</p>

                {transactionData.status === "error" && transactionData.errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{transactionData.errorMessage}</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <p className="text-3xl font-bold text-black">{formatAmount(transactionData.amount)}</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-white border border-gray-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status</span>
                  <Badge className={statusConfig.badgeColor}>{statusConfig.badgeText}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Reference</span>
                  <span className="font-mono text-sm font-medium text-gray-900">{transactionData.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Date & Time</span>
                  <span className="font-medium text-gray-900">{formatDate(transactionData.timestamp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Transaction Type</span>
                  <span className="font-medium capitalize text-gray-900">{transactionData.type}</span>
                </div>

                {transactionData.recipientName && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      {transactionData.type === "mobilepay" ? "Sent to" : "Recipient"}
                    </span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{transactionData.recipientName}</p>
                      {transactionData.bankName && (
                        <p className="text-sm text-gray-500">{transactionData.bankName} {transactionData.accountNumber}</p>
                      )}
                      {transactionData.phone && <p className="text-sm text-gray-500">{transactionData.phone}</p>}
                    </div>
                  </div>
                )}

                {transactionData.provider && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Biller</span>
                    <span className="font-medium">{transactionData.provider}</span>
                  </div>
                )}

                {transactionData.status === "pending" && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-orange-600 animate-spin" />
                      <p className="text-sm text-orange-700">
                        Processing time: 1–3 business days. You'll receive a notification when complete.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-3">
          {transactionData.status === "success" && (
            <>
              <div className="flex gap-3 text-gray-900">
                <Button
                  onClick={() => toast("Receipt is being prepared...")}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button
                  onClick={() => toast("Preparing share options...")}
                  variant="outline"
                  className="flex-1"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button onClick={() => (window.location.href = "/dashboard")} className="w-full">
                Back to Dashboard
              </Button>
            </>
          )}

          {transactionData.status === "pending" && (
            <Button onClick={() => (window.location.href = "/dashboard")} className="w-full">
              Back to Dashboard
            </Button>
          )}

          {transactionData.status === "error" && (
            <div className="space-y-3">
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
              <Button onClick={() => (window.location.href = "/dashboard")} variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-white border border-gray-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-medium text-black">Need Help?</h3>
                <p className="text-sm text-gray-700">
                  Contact our support team if you have questions about this transaction.
                </p>
                <Button variant="link" className="text-blue-600 p-0">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
