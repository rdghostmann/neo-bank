"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Upload, ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Shield, Camera } from "lucide-react"
import Link from "next/link"
import { Layout } from "@/components/DashboardLayout/DashboardLayout"
import { addCustomer } from "@/controllers/addCustomers"


// Array of countries
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "Singapore",
  "Nigeria",
  "South Africa",
  "India",
  "Brazil",
  "Other",
]

// Array of account types
const accountTypes = [
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
]


export default function AddCustomerPage() {
  const [formData, setFormData] = useState({
    legalFirstName: "",
    middleName: "",
    legalLastName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    accountType: "",
  })


  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // const [profileImage, setProfileImage] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    const result = await addCustomer(formData)
    if (result.success) {
      setSuccess("User added successfully!")
      setFormData({
        legalFirstName: "",
        middleName: "",
        legalLastName: "",
        username: "",
        email: "",
        phone: "",
        country: "",
        accountType: "",
      })
    } else {
      setError(result.message || "Failed to add user")
    }
    setLoading(false)
  }

  return (
    <Layout >
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <Link href="/admin/customers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Add New Customer</h1>
            <p className="text-muted-foreground">Create a new customer account</p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Legal First Name *</Label>
                      <Input
                        value={formData.legalFirstName}
                        onChange={e => handleInputChange("legalFirstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Middle Name</Label>
                      <Input
                        value={formData.middleName}
                        onChange={e => handleInputChange("middleName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Legal Last Name *</Label>
                      <Input
                        value={formData.legalLastName}
                        onChange={e => handleInputChange("legalLastName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Username *</Label>
                      <Input
                        value={formData.username}
                        onChange={e => handleInputChange("username", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Email *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={e => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Phone</Label>
                      <Input
                        value={formData.phone}
                        onChange={e => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block" >Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={v => handleInputChange("country", v)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block" >Account Type *</Label>
                      <Select
                        value={formData.accountType}
                        onValueChange={v => handleInputChange("accountType", v)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    {loading ? "Adding..." : "Add User"}
                  </Button>
                  {error && <div className="text-red-500">{error}</div>}
                  {success && <div className="text-green-600">{success}</div>}
                </CardContent>
              </Card>

              {/* Address Information */}
              {/* <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter street address"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </motion.div>

            {/* Account Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type *</Label>
                    <Select onValueChange={(value) => handleInputChange("accountType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initialDeposit">Initial Deposit</Label>
                    <Input
                      id="initialDeposit"
                      type="number"
                      value={formData.initialDeposit}
                      onChange={(e) => handleInputChange("initialDeposit", e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Send Welcome Email</p>
                      <p className="text-sm text-muted-foreground">Send account setup instructions</p>
                    </div>
                    <Switch
                      checked={formData.sendWelcomeEmail}
                      onCheckedChange={(checked) => handleInputChange("sendWelcomeEmail", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Require KYC Verification</p>
                      <p className="text-sm text-muted-foreground">Customer must complete identity verification</p>
                    </div>
                    <Switch
                      checked={formData.requireKyc}
                      onCheckedChange={(checked) => handleInputChange("requireKyc", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Add any additional notes about this customer..."
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button type="submit" className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Customer Account
                </Button>
                <Link href="/admin/customers">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </Layout>
  )
}
