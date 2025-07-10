"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { verifyMifCode } from "@/controllers/mifCode"
import { toast } from "sonner"
// ...rest of your code...
// import { verifyMifCode } from "@/controllers/mifCode"

export default function IMFVerification() {
  const [imfCode, setImfCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [transferData, setTransferData] = useState(null)

  useEffect(() => {
    const storedTransfer = localStorage.getItem("pendingTransfer")
    if (storedTransfer) {
      setTransferData(JSON.parse(storedTransfer))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imfCode.trim()) {
      setError("IMF Code is required");
      return;
    }

    if (imfCode.length < 8) {
      setError("IMF Code must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Get userId from transferData
      const userId = transferData?.userId;
      if (!userId) {
        setError("User not found for this transfer.");
        setIsLoading(false);
        return;
      }
      const result = await verifyMifCode(userId, imfCode);
      if (result.success) {
        // Save the completed transaction to localStorage for TransactionStatus page
        localStorage.setItem("lastTransaction", JSON.stringify({
          ...transferData,
          status: "success",
          timestamp: new Date().toISOString(),
          type: transferData.type || "transfer",
        }));
        localStorage.removeItem("pendingTransfer");
        window.location.href = "/dashboard/transaction-status";
        toast.success("Redirecting!");
      } else {
        setError(result.message || "Invalid IMF Code. Please try again.");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back()
  }

  const formatAmount = (amount) => {
    const num = Number.parseFloat(amount)
    return isNaN(num) ? "$0.00" : `$${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="p-2">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Transfer Verification</h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800 mb-1">Security Verification Required</h3>
              <p className="text-sm text-red-700 leading-relaxed">
                Due to international transfer regulations, we need to verify your transaction with an IMF (International
                Monetary Fund) code before processing your transfer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Transfer Summary */}
        {transferData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white border border-gray-200 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Transfer Details</h3>
                    <p className="text-sm text-gray-500">Pending verification</p>
                  </div>
                </div>

                <div className="space-y-3 text-gray-800">
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">{transferData.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">{formatAmount(transferData.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-sm">{transferData.reference}</span>

                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* IMF Code Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Enter IMF Code</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Please enter the IMF verification code provided by your bank to complete this international transfer.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="imfCode" className="text-base font-medium text-gray-800">
                    IMF Verification Code *
                  </Label>
                  <Input
                    id="imfCode"
                    type="text"
                    value={imfCode}
                    onChange={(e) => {
                      setImfCode(e.target.value.toUpperCase())
                      if (error) setError("")
                    }}
                    placeholder="Enter IMF code (e.g., IMF123456)"
                    className={`mt-2 text-center text-lg font-mono tracking-wider text-gray-900 ${error ? "border-red-500" : ""}`}
                    disabled={isLoading}
                    maxLength={20}
                  />
                  {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

                  <p className="text-xs text-gray-500 mt-2">
                    The IMF code is typically 8–12 characters long and may contain letters and numbers.
                  </p>

                </div>

                <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Complete Transfer"
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-blue-900">
                <h4 className="font-medium mb-2">Need help?</h4>
                <p className="text-sm leading-relaxed">
                  If you haven’t received your IMF code, please contact your bank’s international transfer department or
                  customer service for assistance.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gray-100 rounded-lg text-gray-800"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Security Notice</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                This verification step is required by international banking regulations to ensure the security and
                legitimacy of cross-border transfers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
