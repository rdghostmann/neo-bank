import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeoBank - Modern Digital Banking",
  description: "Experience the future of banking with NeoBank's digital platform",
}

export default function RootLayout({ children }) {

  if (typeof window !== "undefined") {
    // Suppress console errors related to MetaMask
    const originalConsoleError = console.error
    console.error = (...args) => {
      if (args[0]?.includes?.("MetaMask")) {
        return
      }
      originalConsoleError(...args)
    }
  }
  return (
    <html lang="en" crosspilot="" suppressHydrationWarning>
    <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} cz-shortcut-listen="true">
      <SessionWrapper>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </SessionWrapper>
    </body>
  </html>
  );
}
