"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Repeat, Vote, Clock, Wallet, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UseCases() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const useCases = [
    {
      icon: <Repeat className="h-10 w-10 text-purple-400" />,
      title: "Cross-Chain Swaps",
      description: "Sign once on Solana, swap tokens on any supported chain without switching wallets",
      color: "from-purple-500/20 to-purple-700/20",
      borderColor: "group-hover:border-purple-500",
    },
    {
      icon: <Vote className="h-10 w-10 text-blue-400" />,
      title: "Governance Voting",
      description: "Participate in Ethereum-based DAOs and governance systems directly from Solana",
      color: "from-blue-500/20 to-blue-700/20",
      borderColor: "group-hover:border-blue-500",
    },
    {
      icon: <Clock className="h-10 w-10 text-cyan-400" />,
      title: "DeFi Automation",
      description:
        "Schedule and automate vault interactions, yield farming, and other DeFi activities across multiple chains",
      color: "from-cyan-500/20 to-cyan-700/20",
      borderColor: "group-hover:border-cyan-500",
    },
    {
      icon: <Wallet className="h-10 w-10 text-purple-400" />,
      title: "Unified UX",
      description: "One wallet, many chains - simplify your Web3 experience with a single control interface",
      color: "from-purple-500/20 to-purple-700/20",
      borderColor: "group-hover:border-purple-500",
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
    <section id="use-cases" className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900/10 z-0"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              Use Cases
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            ZeroPilot enables powerful cross-chain interactions for various use cases
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 ${useCase.borderColor} transition-all duration-300 group`}
            >
              <div className={`mb-4 p-3 rounded-lg bg-gradient-to-r ${useCase.color} inline-block`}>{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
              <p className="text-gray-400">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white px-8 group"
          >
            Explore All Use Cases
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
