"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, LogOut } from "lucide-react"
import { LogoutButton } from "@/components/Logout-button/logout-button"

export default function PendingPage() {
  const { data: session, status } = useSession()
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.username) {
      setUsername(session.user.username)
    } else if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [session, status, router])

  const handleGetSupport = () => {
    console.log("Opening support...")
    // router.push("/support")
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Banner */}
      <div className="bg-green-500 text-white px-4 py-3 text-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-start sm:items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-1 sm:mt-0" />
            <span>
              Action Successful! Please wait while we verify your application. You will receive an email regarding the
              status of your application.
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="text-white hover:text-gray-200"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button> */}
            <LogoutButton/>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 max-w-4xl mx-auto space-y-4">
        {/* Account Under Review Card */}
        <Card className="shadow-sm border border-gray-200 bg-gray-50">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-semibold text-orange-500">Account Under Review</h1>
              <div className="space-y-2">
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                  Hi <span className="font-medium">{username || "User"}</span>, your{" "}
                  <span className="font-medium">NeoBank</span> internet banking account is currently inactive. Kindly
                  contact our online customer care representative.
                </p>
                <p className="text-green-600 text-sm font-medium">
                  Your previous application is under review, please wait
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Card */}
        <Card className="shadow-sm border border-gray-200 bg-gray-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Support Icon */}
              <div className="flex-shrink-0 w-full sm:w-auto">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>


              {/* Support Content */}
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-gray-900">We're here to help you!</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ask a question, manage request, report an issue. Our support team will get back to you by email.
                </p>
              </div>

              {/* Support Button */}
              <div className="w-full sm:w-auto">
                <Button
                  onClick={handleGetSupport}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Get Support Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
