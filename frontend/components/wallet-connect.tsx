"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    // Check if wallet was previously connected
    const savedWallet = localStorage.getItem("mockWalletAddress")
    if (savedWallet) {
      setWalletAddress(savedWallet)
      setIsConnected(true)
    }
  }, [])

  const connectWallet = () => {
    // Mock wallet connection
    const mockAddress = "mock" + Math.random().toString(36).substring(2, 15)
    setWalletAddress(mockAddress)
    setIsConnected(true)
    localStorage.setItem("mockWalletAddress", mockAddress)
    
    // Initialize mock balances if not exists
    if (!localStorage.getItem(`mockBalance_${mockAddress}`)) {
      localStorage.setItem(`mockBalance_${mockAddress}`, JSON.stringify({
        solana: "10.00",
        evm: "5.00"
      }))
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setIsConnected(false)
    localStorage.removeItem("mockWalletAddress")
  }

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
            className="border-purple-500 text-white hover:bg-purple-500/20"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      )}
    </div>
  )
} 