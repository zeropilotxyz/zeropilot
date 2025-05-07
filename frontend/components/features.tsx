"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket, Zap, Shield, Layers, RefreshCw, Wallet } from "lucide-react"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Rocket className="h-10 w-10 text-purple-400" />,
      title: "Solana Command Hub",
      description: "Use Solana as your home base to control and initiate transactions across multiple blockchains",
    },
    {
      icon: <Zap className="h-10 w-10 text-cyan-400" />,
      title: "Fast & Low Cost",
      description: "Leverage Solana's high-speed, low-cost environment for handling control logic",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-400" />,
      title: "Secure Messaging",
      description: "LayerZero V2's Ultra-Light Nodes relay authenticated messages between chains with robust security",
    },
    {
      icon: <Layers className="h-10 w-10 text-cyan-400" />,
      title: "Multi-Chain Execution",
      description: "Execute actions on Ethereum, Arbitrum, Base, and other EVM chains from your Solana wallet",
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-purple-400" />,
      title: "Replay Protection",
      description: "Built-in nonce tracking and state verification prevents transaction replays and ensures security",
    },
    {
      icon: <Wallet className="h-10 w-10 text-cyan-400" />,
      title: "Unified Experience",
      description: "One wallet, many chains - simplify your Web3 experience with a single control interface",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="features" className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/0 z-0"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Powerful{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">Features</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            ZeroPilot combines the best of Solana and LayerZero V2 to create a seamless cross-chain experience
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 inline-block group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
