import { Manrope } from "next/font/google"

import type { Metadata } from "next"

import "./globals.css"

import { getCookie } from "@/actions/actions"
import { Toaster } from "sonner"

import { Navbar } from "@/components/Navbar"

import Providers from "./providers"

const manrope = Manrope({
  variable: "--font-manrope"
})

export const metadata: Metadata = {
  title: "Cat Blog",
  description: "Blog about cats"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticated = !!(await getCookie("token"))?.value

  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Providers>
          <Navbar isAuthenticated={isAuthenticated} />
          <main className="max-w-6xl w-full mx-auto py-10 px-6">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
