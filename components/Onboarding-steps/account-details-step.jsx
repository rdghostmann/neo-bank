"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe, Building } from "lucide-react"

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "Singapore",
  "Other",
]

const accountTypes = [
  { value: "personal", label: "Personal", description: "For individual use" },
  { value: "business", label: "Business", description: "For companies and organizations" },
]

export default function AccountDetailsStep({ data, updateData, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!data.country) newErrors.country = "Please select your country"
    if (!data.accountType) newErrors.accountType = "Please select an account type"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) onNext()
  }

  const handleSelectChange = (field, value) => {
    updateData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Icon & Heading */}
      <div className="text-center space-y-2">
        <div className="relative mx-auto w-12 h-12">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center z-10 relative">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-lg opacity-50" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Account Details</h1>
        <p className="text-muted-foreground">Help us customize your experience</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Country Select */}
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select value={data.country} onValueChange={(value) => handleSelectChange("country", value)}>
            <SelectTrigger
              className={`bg-white text-gray-900 ${errors.country ? "border-red-500" : "border-gray-300"}`}
            >
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
        </div>

        {/* Account Type Cards */}
        <div className="space-y-2">
          <Label>Account Type *</Label>
          <div className="grid gap-3">
            {accountTypes.map((type) => {
              const isSelected = data.accountType === type.value
              return (
                <div
                  key={type.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-green-500 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-400"
                  } ${errors.accountType ? "border-red-500" : ""}`}
                  onClick={() => handleSelectChange("accountType", type.value)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {type.value === "personal" ? (
                        <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                          {isSelected && <div className="w-2 h-2 rounded-full bg-green-600" />}
                        </div>
                      ) : (
                        <Building
                          className={`w-5 h-5 ${isSelected ? "text-green-600" : "text-gray-500"}`}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {errors.accountType && <p className="text-sm text-red-500">{errors.accountType}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1 bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:opacity-90">
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}
