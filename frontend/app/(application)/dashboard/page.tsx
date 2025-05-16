"use client"

import { WalletConnect } from "@/components/wallet-connect"
import { SwapInterface } from "@/components/swap-interface"
import { Toaster } from "sonner"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">ZeroPilot Dashboard</h1>
          <WalletConnect />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Cross-Chain Swap</h2>
            <p className="text-gray-400 mb-6">
              Swap tokens between Solana and EVM chains using LayerZero's cross-chain messaging.
            </p>
            <SwapInterface />
          </div>
        </div>
      </div>
      <Toaster position="top-right" theme="dark" />
    </div>
  )
}
