"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Shield, Zap, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Signin = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    legalFirstName: "",
    middleName: "",
    legalLastName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    accountType: "",
    transactionPin: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Login handler
  async function handleLoginSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { email, password } = loginData;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (res?.error) {
      setError(res.error);
      toast.error(res.error);
    } else if (res?.ok) {
      toast.success("Login successful!");
      // Fetch session to get user role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }

  // Register handler
  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setError("");
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }
    if (registerData.transactionPin.length !== 4 || !/^\d{4}$/.test(registerData.transactionPin)) {
      setError("Transaction pin must be exactly 4 digits.");
      toast.error("Transaction pin must be exactly 4 digits.");
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          legalFirstName: registerData.legalFirstName,
          middleName: registerData.middleName,
          legalLastName: registerData.legalLastName,
          username: registerData.username,
          email: registerData.email,
          phone: registerData.phone,
          country: registerData.country,
          accountType: registerData.accountType,
          transactionPin: registerData.transactionPin,
          password: registerData.password,
        }),
      });

      const result = await res.json();
      setIsLoading(false);

      if (!result?.success) {
        setError(result?.message || "Registration failed.");
        toast.error(result?.message || "Registration failed.");
        return;
      }

      toast.success("Registration successful! Please check your email to verify your account.");
      setRegisterData({
        legalFirstName: "",
        middleName: "",
        legalLastName: "",
        username: "",
        email: "",
        phone: "",
        country: "",
        accountType: "",
        transactionPin: "",
        password: "",
        confirmPassword: "",
      });

      router.push(`/verify-email/confirm-email/${encodeURIComponent(registerData.email)}`);
    } catch (err) {
      setError("Registration failed.");
      toast.error("Registration failed.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-8"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  NeoBank
                </h1>
                <p className="text-slate-600">Digital Banking Revolution</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-800">Banking Made Simple, Secure & Smart</h2>
              <p className="text-lg text-slate-600">
                Experience the future of banking with our cutting-edge digital platform. Manage your finances with ease
                and confidence.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Mobile First</h3>
                  <p className="text-sm text-slate-600">Bank anywhere, anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Bank-Grade Security</h3>
                  <p className="text-sm text-slate-600">Your money is always protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Instant Transfers</h3>
                  <p className="text-sm text-slate-600">Lightning-fast transactions</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login/Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Mobile Header */}
          <div className="text-center mb-8 lg:hidden">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              NeoBank
            </h1>
            <p className="text-slate-600">Digital Banking Revolution</p>
          </div>

          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl">
            <Tabs defaultValue="login">
              <CardHeader className="space-y-4">
                <TabsList className="grid grid-cols-2 w-full bg-green-50 border border-green-100">
                  <TabsTrigger
                    id="login-tab"
                    value="login"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <TabsContent value="login">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-slate-700">
                          Password
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-green-600 hover:text-green-700 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>

                  <div className="hidden mt-6 text-center text-sm text-slate-600 space-y-2">
                    <p className="font-medium">Demo Accounts:</p>
                    <div className="space-y-1 text-xs">
                      <p>
                        Customer: <span className="font-medium text-green-600">user@example.com / password</span>
                      </p>
                      <p>
                        Admin: <span className="font-medium text-green-600">admin@example.com / admin</span>
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="legalFirstName" className="text-slate-700">
                        Legal First Name
                      </Label>
                      <Input
                        id="legalFirstName"
                        placeholder="Enter your first name"
                        value={registerData.legalFirstName}
                        onChange={e => setRegisterData({ ...registerData, legalFirstName: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="middleName" className="text-slate-700">
                        Middle Name
                      </Label>
                      <Input
                        id="middleName"
                        placeholder="Enter your middle name"
                        value={registerData.middleName}
                        onChange={e => setRegisterData({ ...registerData, middleName: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="legalLastName" className="text-slate-700">
                        Legal Last Name
                      </Label>
                      <Input
                        id="legalLastName"
                        placeholder="Last name"
                        value={registerData.legalLastName}
                        onChange={e => setRegisterData({ ...registerData, legalLastName: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-slate-700">
                        User Name
                      </Label>
                      <Input
                        id="username"
                        placeholder="Enter Unique Username"
                        value={registerData.username}
                        onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-slate-700">
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="name@email.com"
                        value={registerData.email}
                        onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+123456789"
                        value={registerData.phone}
                        onChange={e => setRegisterData({ ...registerData, phone: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-slate-700">
                        Country
                      </Label>
                      <Input
                        id="country"
                        placeholder="Choose Country"
                        value={registerData.country}
                        onChange={e => setRegisterData({ ...registerData, country: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountType" className="text-slate-700">
                        Account Type
                      </Label>
                      <Input
                        id="accountType"
                        placeholder="Please select Account Type"
                        value={registerData.accountType}
                        onChange={e => setRegisterData({ ...registerData, accountType: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transactionPin" className="text-slate-700">
                        4 Digit Transaction Pin
                      </Label>
                      <Input
                        id="transactionPin"
                        type="password"
                        placeholder="Transaction Pin"
                        value={registerData.transactionPin}
                        onChange={e => setRegisterData({ ...registerData, transactionPin: e.target.value.replace(/\D/, "") })}
                        maxLength={4}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-slate-700">
                        Password
                      </Label>
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-slate-700">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={registerData.confirmPassword}
                          onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 text-slate-800"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </CardContent>

              <CardFooter className="flex justify-center border-t border-green-100 p-6">
                <div className="text-center text-sm text-slate-600">
                  By continuing, you agree to our{" "}
                  <Link href="#" className="text-green-600 hover:text-green-700 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-green-600 hover:text-green-700 hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </CardFooter>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signin;