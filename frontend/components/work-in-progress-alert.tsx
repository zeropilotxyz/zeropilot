"use client"

import { motion } from "framer-motion"
import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function WorkInProgressAlert() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-950/30 to-cyan-950/30 backdrop-blur-md p-6 mb-8"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px]"></div>
      </div>

      <div className="flex items-start gap-4 relative z-10">
        <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
          <AlertTriangle className="h-5 w-5 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white mb-1">Work in Progress</h3>
          <div className="text-sm text-gray-300">
            <p className="mb-2">
              This is a preview of the ZeroPilot application interface. The functionality is not yet implemented and
              transactions will not be processed.
            </p>
            <p>
              We're actively developing the cross-chain messaging system. Join our waitlist to be notified when the full
              functionality is available.
            </p>
          </div>
          <div className="mt-4">
            <Button
              size="sm"
              className="border-purple-500/50 text-white hover:bg-purple-500/20 text-xs"
              onClick={() => window.open("/", "_self")}
            >
              Return to Home
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Animated pulse effect */}
      <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: [0.5, 0.2, 0.5], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-lg"
      ></motion.div>
    </motion.div>
  )
}
