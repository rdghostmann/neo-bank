"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  LogOut,
} from "lucide-react"
import { CustomerLayout } from "@/components/CustomerLayout/CustomerLayout"
import { LogoutButton } from "@/components/Logout-button/logout-button"

export default function ProfilePage() {
  const  user = {
    name: "User",
    email: "user@example.com"
  }
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })

  const [security, setSecurity] = useState({
    twoFactor: true,
    biometric: false,
    loginAlerts: true,
  })

  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "Alex",
    lastName: user?.name?.split(" ")[1] || "Johnson",
    email: user?.email || "alex@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveProfile = () => {
    // Here you would typically save to an API
    setIsEditing(false)
    // Show success message
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    // Here you would typically update password via API
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    alert("Password updated successfully")
  }

  return (
    <CustomerLayout>
      <div className="space-y-6 p-4 md:p-6 pb-20 md:pb-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Profile Settings</h1>
            <p className="text-slate-600">Manage your account preferences and security</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={
                isEditing
                  ? "border-red-200 text-red-600 hover:bg-red-50"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              }
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
            <LogoutButton variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" />
          </div>
        </motion.div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-green-50 border border-green-100">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Personal
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Accounts
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <User className="w-5 h-5 text-green-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24 ring-4 ring-green-100">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl">
                        {user?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-200 text-green-600 hover:bg-green-50"
                        disabled={!isEditing}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-slate-500">JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={personalInfo.firstName}
                        onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                        disabled={!isEditing}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={personalInfo.lastName}
                        onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                        disabled={!isEditing}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700">
                        Phone
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="phone"
                          value={personalInfo.phone}
                          onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-slate-700">
                        Date of Birth
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={personalInfo.dateOfBirth}
                          onChange={(e) => handlePersonalInfoChange("dateOfBirth", e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-slate-700">
                        Address
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="address"
                          value={personalInfo.address}
                          onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-700">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={personalInfo.city}
                        onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
                        disabled={!isEditing}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-slate-700">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={personalInfo.state}
                        onChange={(e) => handlePersonalInfoChange("state", e.target.value)}
                        disabled={!isEditing}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-slate-700">
                        ZIP Code
                      </Label>
                      <Input
                        id="zipCode"
                        value={personalInfo.zipCode}
                        onChange={(e) => handlePersonalInfoChange("zipCode", e.target.value)}
                        disabled={!isEditing}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Security Settings */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Shield className="w-5 h-5 text-green-600" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, twoFactor: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Biometric Login</p>
                      <p className="text-sm text-slate-600">Use fingerprint or face recognition</p>
                    </div>
                    <Switch
                      checked={security.biometric}
                      onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, biometric: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Login Alerts</p>
                      <p className="text-sm text-slate-600">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={security.loginAlerts}
                      onCheckedChange={(checked) => setSecurity((prev) => ({ ...prev, loginAlerts: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Lock className="w-5 h-5 text-green-600" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-slate-700">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                          className="pl-10 pr-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-slate-700">
                        New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                          className="pl-10 pr-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-700">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                          className="pl-10 pr-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Account Security */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <LogOut className="w-5 h-5 text-red-600" />
                    Account Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h3 className="font-medium text-slate-800 mb-2">Sign Out of All Devices</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      This will log you out from all devices where you're currently signed in, including this one.
                    </p>
                    <LogoutButton variant="destructive" className="w-full">
                      Sign Out Everywhere
                    </LogoutButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Bell className="w-5 h-5 text-green-600" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Email Notifications</p>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Push Notifications</p>
                      <p className="text-sm text-slate-600">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">SMS Notifications</p>
                      <p className="text-sm text-slate-600">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Marketing Communications</p>
                      <p className="text-sm text-slate-600">Receive promotional emails and offers</p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Connected Accounts Tab */}
          <TabsContent value="accounts">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Connected Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-green-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Primary Checking</p>
                        <p className="text-sm text-slate-600">•••• 4532</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-200 text-green-600 hover:bg-green-50">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-green-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Savings Account</p>
                        <p className="text-sm text-slate-600">•••• 7891</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-200 text-green-600 hover:bg-green-50">
                      Manage
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-600 hover:bg-green-50 border-dashed"
                  >
                    Add New Account
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
