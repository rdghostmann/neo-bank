"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { LogIn } from "lucide-react"

export default function BasicIdentityStep({ data, updateData, onNext }) {
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!data.firstName.trim()) newErrors.firstName = "First name is required"
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!data.username.trim()) {
      newErrors.username = "Username is required"
    } else if (data.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onNext()
    }
  }

  const handleInputChange = (field, value) => {
    updateData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Let's get to know you</h1>
        <p className="text-muted-foreground">Tell us a bit about yourself to get started</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">Legal First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            className={`bg-white text-gray-900 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
        </div>

        {/* Middle Name */}
        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name (Optional)</Label>
          <Input
            id="middleName"
            value={data.middleName}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
            placeholder="Enter your middle name"
            className="bg-white text-gray-900 border-gray-300"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Legal Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            className={`bg-white text-gray-900 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            value={data.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            placeholder="Choose a username"
            className={`bg-white text-gray-900 ${errors.username ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:opacity-90"
        >
          Next
        </Button>
      </form>

      {/* Sign-in Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:text-emerald-500 inline-flex items-center"
          >
            <LogIn className="w-4 h-4 mr-1" />
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
