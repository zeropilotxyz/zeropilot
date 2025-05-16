import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { LayerZeroIcon } from "@/components/icons/layerzero-icon"

export const metadata: Metadata = {
  title: "ZeroPilot App - Control Any Chain from Solana",
  description: "ZeroPilot application dashboard and controls",
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* App Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image src="/logo/logo.png" alt="ZeroPilot Logo" width={40} height={40} className="animate-spin-slow" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              ZeroPilot
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <div className="w-4 h-4">
                <LayerZeroIcon />
              </div>
              <span>Powered by LayerZero</span>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors px-3 py-1 rounded-md bg-white/5 hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* App Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* App Footer */}
      <footer className="border-t border-white/10 py-4 bg-black/80">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ZeroPilot. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
