"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Clock, ArrowRight, Loader2, PenLine, ArrowLeftRight } from "lucide-react"
import { LayerZeroIcon } from "./icons/layerzero-icon"

interface TransactionStatusProps {
  status: string
  direction: "solana-to-evm" | "evm-to-solana"
}

export function TransactionStatus({ status, direction }: TransactionStatusProps) {
  // Steps for each direction
  const stepsSolanaToEvm = [
    { id: "initiated", label: "Initiated", icon: Clock },
    { id: "signing", label: "Sign on Solana", icon: PenLine },
    { id: "layerzero", label: "LayerZero", icon: LayerZeroIcon },
    { id: "settling", label: "Settle on EVM", icon: ArrowRight },
    { id: "completed", label: "Completed", icon: CheckCircle2 },
  ]
  const stepsEvmToSolana = [
    { id: "initiated", label: "Initiated", icon: Clock },
    { id: "sign-solana", label: "Sign on Solana", icon: PenLine },
    { id: "lz-solana-evm", label: "LayerZero", icon: LayerZeroIcon },
    { id: "sign-evm", label: "Sign on EVM", icon: PenLine },
    { id: "execute-evm", label: "Execute on EVM", icon: ArrowLeftRight },
    { id: "lz-evm-solana", label: "LayerZero", icon: LayerZeroIcon },
    { id: "settle-solana", label: "Settle on Solana", icon: ArrowRight },
    { id: "completed", label: "Completed", icon: CheckCircle2 },
  ]

  const steps = direction === "evm-to-solana" ? stepsEvmToSolana : stepsSolanaToEvm
  const currentStepIndex = steps.findIndex(step => step.id === status)
  const isCompleted = status === "completed"
  const isFailed = status === "failed"

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 flex flex-col items-center shadow-sm">
        {/* Progress bar */}
        <div className="relative w-full flex items-center mb-2" style={{ minHeight: 32 }}>
          <div className="absolute left-4 right-4 top-1/2 h-1 bg-white/10 -translate-y-1/2 z-0 rounded-full" />
          <motion.div
            className="absolute left-4 top-1/2 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 z-10 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: isCompleted
                ? "calc(100% - 2rem)"
                : `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 2rem * ${(1 - currentStepIndex / (steps.length - 1))})`,
            }}
            style={{ right: '4rem' }}
            transition={{ duration: 0.5 }}
          />
          {steps.map((step, idx) => {
            const isActive = idx <= currentStepIndex
            const isCurrent = step.id === status
            const Icon = step.icon
            return (
              <div key={step.id} className="relative z-20 flex-1 flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                  isActive
                    ? "border-cyan-400 bg-gradient-to-r from-purple-500 to-cyan-400"
                    : "border-white/20 bg-white/10"
                }`}>
                  {isCurrent && !isCompleted && !isFailed ? (
                    <Loader2 className="w-3 h-3 text-white animate-spin" />
                  ) : (
                    <Icon className={`w-3 h-3 ${isActive ? "text-white" : "text-gray-400"}`} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {/* Step labels */}
        <div className="flex w-full justify-between px-1">
          {steps.map((step, idx) => (
            <span
              key={step.id}
              className={`text-[10px] text-center w-12 ${idx <= currentStepIndex ? "text-cyan-300 font-semibold" : "text-gray-400"}`}
            >
              {step.label}
            </span>
          ))}
        </div>
        {isFailed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-center text-red-400 text-xs"
          >
            Transaction failed. Please try again.
          </motion.div>
        )}
      </div>
    </div>
  )
} 