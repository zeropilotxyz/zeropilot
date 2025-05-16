"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownUp, Loader2, Wallet } from "lucide-react"
import { TransactionStatus } from "./transaction-status"

interface TokenBalance {
  solana: string
  evm: string
}

type Chain = "solana" | "evm"
type TransactionStatusType =
  | "idle"
  | "initiated"
  | "signing"
  | "layerzero"
  | "settling"
  | "completed"
  | "failed"
  | "sign-solana"
  | "lz-solana-evm"
  | "sign-evm"
  | "execute-evm"
  | "lz-evm-solana"
  | "settle-solana"

export function SwapInterface() {
  const [fromChain, setFromChain] = useState<Chain>("solana")
  const [toChain, setToChain] = useState<Chain>("evm")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatusType>("idle")
  const [balances, setBalances] = useState<TokenBalance>({
    solana: "0",
    evm: "0"
  })
  const [evmBalanceLoading, setEvmBalanceLoading] = useState(false)

  // Fetch balances from localStorage, initialize if not present
  const fetchBalances = async (simulateEvmFetch = false) => {
    const walletAddress = localStorage.getItem("mockWalletAddress")
    if (walletAddress) {
      // Initialize if not present
      if (!localStorage.getItem(`mockBalance_${walletAddress}`)) {
        localStorage.setItem(`mockBalance_${walletAddress}`,
          JSON.stringify({ solana: "10.00", evm: "5.00" })
        )
      }
      if (simulateEvmFetch) {
        setEvmBalanceLoading(true)
        // Simulate LayerZero message delay
        await new Promise(resolve => setTimeout(resolve, 2500))
        setEvmBalanceLoading(false)
      }
      const savedBalances = localStorage.getItem(`mockBalance_${walletAddress}`)
      if (savedBalances) {
        setBalances(JSON.parse(savedBalances))
      }
    }
  }

  useEffect(() => {
    fetchBalances()
  }, [])

  // When switching to EVM as fromChain, simulate fetching
  useEffect(() => {
    if (fromChain === "evm") {
      fetchBalances(true)
    } else {
      fetchBalances()
    }
  }, [fromChain])

  // Swap logic
  const handleSwap = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    const walletAddress = localStorage.getItem("mockWalletAddress")
    if (!walletAddress) return
    setIsLoading(true)
    if (fromChain === "solana" && toChain === "evm") {
      setTransactionStatus("initiated")
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setTransactionStatus("signing")
        await new Promise(resolve => setTimeout(resolve, 2000))
        setTransactionStatus("layerzero")
        await new Promise(resolve => setTimeout(resolve, 4000))
        setTransactionStatus("settling")
        await new Promise(resolve => setTimeout(resolve, 3000))
        setTransactionStatus("completed")
        // Update balances correctly
        const newBalances = { ...balances }
        const amt = parseFloat(amount)
        newBalances.solana = (parseFloat(newBalances.solana) - amt).toFixed(2)
        newBalances.evm = (parseFloat(newBalances.evm) + amt).toFixed(2)
        setBalances(newBalances)
        localStorage.setItem(`mockBalance_${walletAddress}`, JSON.stringify(newBalances))
      } catch (error) {
        setTransactionStatus("failed")
      } finally {
        setIsLoading(false)
        setAmount("")
      }
    } else if (fromChain === "evm" && toChain === "solana") {
      setTransactionStatus("initiated")
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setTransactionStatus("sign-solana")
        await new Promise(resolve => setTimeout(resolve, 1500))
        setTransactionStatus("lz-solana-evm")
        await new Promise(resolve => setTimeout(resolve, 2000))
        setTransactionStatus("sign-evm")
        await new Promise(resolve => setTimeout(resolve, 1500))
        setTransactionStatus("execute-evm")
        await new Promise(resolve => setTimeout(resolve, 1200))
        setTransactionStatus("lz-evm-solana")
        await new Promise(resolve => setTimeout(resolve, 2500))
        setTransactionStatus("settle-solana")
        await new Promise(resolve => setTimeout(resolve, 2000))
        setTransactionStatus("completed")
        // Update balances correctly
        const newBalances = { ...balances }
        const amt = parseFloat(amount)
        newBalances.evm = (parseFloat(newBalances.evm) - amt).toFixed(2)
        newBalances.solana = (parseFloat(newBalances.solana) + amt).toFixed(2)
        setBalances(newBalances)
        localStorage.setItem(`mockBalance_${walletAddress}`, JSON.stringify(newBalances))
      } catch (error) {
        setTransactionStatus("failed")
      } finally {
        setIsLoading(false)
        setAmount("")
      }
    }
  }

  const swapChains = () => {
    setFromChain(toChain)
    setToChain(fromChain)
  }

  // Balance card
  const renderBalanceCard = () => {
    const chain = fromChain === "solana" ? "Solana" : "EVM"
    const balance = fromChain === "solana" ? balances.solana : balances.evm
    return (
      <div className="mb-6 flex items-center gap-4 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-white/10 rounded-xl px-5 py-4 shadow">
        <Wallet className="w-7 h-7 text-cyan-300" />
        <div>
          <div className="text-xs text-gray-400 mb-1">{chain} Balance</div>
          {fromChain === "evm" && evmBalanceLoading ? (
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-lg">
              <Loader2 className="w-4 h-4 animate-spin" /> Fetching via LayerZero...
            </div>
          ) : (
            <div className="text-cyan-200 font-bold text-lg">{balance}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex flex-col gap-2">
      {renderBalanceCard()}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">From</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="bg-white/5 border-white/10 text-white"
              disabled={isLoading || (fromChain === "evm" && evmBalanceLoading)}
            />
            <select
              value={fromChain}
              onChange={e => {
                setFromChain(e.target.value as Chain)
                setToChain(e.target.value === "solana" ? "evm" : "solana")
              }}
              className="bg-white/5 border border-white/10 rounded-md px-3 text-white"
              disabled={isLoading}
            >
              <option value="solana">Solana</option>
              <option value="evm">EVM</option>
            </select>
          </div>
          <p className="text-sm text-gray-400">Balance: {fromChain === "evm" && evmBalanceLoading ? <span className="text-cyan-300">Fetching via LayerZero...</span> : (fromChain === "solana" ? balances.solana : balances.evm)}</p>
        </div>
        <button
          onClick={swapChains}
          className="w-full flex justify-center p-2 hover:bg-white/5 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <ArrowDownUp className="w-5 h-5 text-gray-400" />
        </button>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">To</label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={amount}
              disabled
              className="bg-white/5 border-white/10 text-white"
            />
            <select
              value={toChain}
              onChange={e => setToChain(e.target.value as Chain)}
              className="bg-white/5 border border-white/10 rounded-md px-3 text-white"
              disabled
            >
              <option value="solana">Solana</option>
              <option value="evm">EVM</option>
            </select>
          </div>
          <p className="text-sm text-gray-400">Balance: {balances[toChain]}</p>
        </div>
        <Button
          onClick={handleSwap}
          disabled={isLoading || !amount || (fromChain === "evm" && evmBalanceLoading)}
          className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Swap"
          )}
        </Button>
        {transactionStatus !== "idle" && (
          <TransactionStatus status={transactionStatus} direction={fromChain === "evm" ? "evm-to-solana" : "solana-to-evm"} />
        )}
      </div>
    </div>
  )
} 