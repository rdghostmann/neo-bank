"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Send, Smartphone, Wifi, X } from "lucide-react"
import BankTransfer from "./components/TransferAction"
import DepositAction from "./components/DepositAction"
import MobilePayAction from "./components/MobilePayAction"
import PayBillsAction from "./components/PayBillsAction"

const QuickAction = () => {
  const [openAction, setOpenAction] = useState(null)

  const quickActions = [
    {
      icon: Send,
      label: "Transfer",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      onClick: () => setOpenAction("transfer"),
    },
    {
      icon: Plus,
      label: "Deposit",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      onClick: () => setOpenAction("deposit"),
    },
    {
      icon: Smartphone,
      label: "Mobile Pay",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      onClick: () => setOpenAction("mobilepay"),
    },
    {
      icon: Wifi,
      label: "Pay Bills",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      onClick: () => setOpenAction("paybill"),
    },
  ]

  const renderActionComponent = () => {
    switch (openAction) {
      case "transfer":
        return <BankTransfer onClose={() => setOpenAction(null)} />
      case "deposit":
        return <DepositAction onClose={() => setOpenAction(null)} />
      case "mobilepay":
        return <MobilePayAction onClose={() => setOpenAction(null)} />
      case "paybill":
        return <PayBillsAction onClose={() => setOpenAction(null)} />
      default:
        return null
    }
  }

  return (
    <>
      {/* Quick Action Grid */}
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
              onClick={action.onClick}
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

      {/* Modal Overlay */}
      <AnimatePresence>
        {openAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setOpenAction(null)}
          >
            <motion.div
              key={openAction}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-gray-900 w-full max-w-md max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl relative shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpenAction(null)}
                className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Scrollable Modal Content */}
              <div className="pt-4 px-4 pb-6 overflow-y-auto max-h-[calc(90vh-60px)]">
                {renderActionComponent()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default QuickAction
