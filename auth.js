// auth.js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import bcrypt from "bcrypt"
import { connectToDB } from "./lib/connectDB"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB()
        const { email, password } = credentials

        const user = await User.findOne({ email }).select("+password +status +role +username")
        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          name: user.legalFirstName,
          role: user.role,
          status: user.status, // ✅ include status
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.username = user.username
        token.role = user.role
        token.name = user.name
        token.status = user.status // ✅ attach status to token
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        role: token.role,
        name: token.name,
        status: token.status, // ✅ pass status to session
      }
      return session
    },
    async redirect({ url, baseUrl, token }) {
      if (token?.status === "inactive") return "/pending"
      if (token?.role === "admin") return "/admin"
      if (token?.role === "user") return "/dashboard"
      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
