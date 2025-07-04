"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Send,
    Smartphone,
    Wifi,
    XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


const QuickAction = () => {
    const [openAction, setOpenAction] = useState(null); // 'transfer' | 'paybill' | null
    const [formData, setFormData] = useState({
        accountName: "",
        accountNumber: "",
        amount: "",
        description: "",
        category: "",
        account: "",
    });

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
            onClick: () => toast("Deposit feature coming soon!", { description: "Stay tuned" }),
        },
        {
            icon: Smartphone,
            label: "Mobile Pay",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            onClick: () => toast("Mobile Pay feature coming soon!", { description: "Coming in future update" }),
        }
        ,
        {
            icon: Wifi,
            label: "Pay Bills",
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50",
            onClick: () => setOpenAction("paybill"),
        },
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            amount: parseFloat(formData.amount),
            type: "debit",
            date: new Date(),
            time: new Date().toLocaleTimeString(),
            reference: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
            status: "completed",
            avatar: openAction === "transfer" ? "💳" : "⚡",
        };

        console.log("Submitted Transaction:", payload);

        // Reset
        setFormData({
            accountName: "",
            accountNumber: "",
            amount: "",
            description: "",
            category: "",
            account: "",
        });
        setOpenAction(null);
    };

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
                            <span className="text-sm font-semibold text-slate-700">
                                {action.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Modal Overlay */}
            {openAction && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setOpenAction(null)}
                            className="absolute right-4 top-4 text-red-500 hover:text-red-600"
                        >
                            <XCircle className="w-6 h-6" />
                        </button>

                        <h2 className="text-xl font-bold text-slate-800">
                            {openAction === "transfer" ? "New Transfer" : "Pay a Bill"}
                        </h2>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="accountName" className="mb-3 text-gray-700">Account Name</Label>
                                <Input
                                    id="accountName"
                                    name="accountName"
                                    value={formData.accountName}
                                    onChange={handleInputChange}
                                    required
                                    className="text-gray-700 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="accountNumber" className="mb-3 text-gray-700">Account Number</Label>
                                <Input
                                    id="accountNumber"
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="text-gray-700 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="amount" className="mb-3 text-gray-700">Amount</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                    className="text-gray-700 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description" className="mb-3 text-gray-700">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="text-gray-700 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="category" className="mb-3 text-gray-700">Category</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="text-gray-700 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="account" className="mb-3 text-gray-700">Account Type</Label>
                                <Input
                                    id="account"
                                    name="account"
                                    value={formData.account}
                                    onChange={handleInputChange}
                                    required
                                    className="text-gray-700 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                                />
                            </div>

                            <Button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
                                {openAction === "transfer" ? "Send Transfer" : "Pay Bill"}
                            </Button>
                        </form>

                    </div>
                </div>
            )}
        </>
    );
};

export default QuickAction;
