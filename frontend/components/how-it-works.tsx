"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LayerZeroIcon } from "./icons/layerzero-icon"

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      number: "01",
      title: "Sign Instruction",
      description: "User signs a cross-chain instruction from the Solana wallet interface",
      color: "from-purple-500 to-purple-700",
    },
    {
      number: "02",
      title: "Smart Contract",
      description: "The signed instruction is passed to the Solana smart contract",
      color: "from-blue-500 to-blue-700",
    },
    {
      number: "03",
      title: "LayerZero Message",
      description: "The smart contract sends a structured message via LayerZero to the target chain",
      color: "from-cyan-500 to-cyan-700",
    },
    {
      number: "04",
      title: "Execute Action",
      description: "On the destination chain, the Executor contract verifies and executes the requested action",
      color: "from-purple-500 to-purple-700",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900/10 z-0"></div>

      {/* Animated lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">It Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            ZeroPilot uses a simple but powerful flow to enable cross-chain actions
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="mb-20 relative"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="relative h-[300px] md:h-[400px] w-full">
                {/* This would be replaced with your actual architecture diagram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-3xl mx-auto relative">
                    {/* Solana side */}
                    <div className="absolute top-0 left-0 w-1/3 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                      <h4 className="text-purple-400 font-semibold mb-2">Solana Smart Wallet</h4>
                      <p className="text-sm text-gray-400">User identity & command layer</p>
                    </div>

                    {/* LayerZero */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <LayerZeroIcon />
                        </div>
                        <h4 className="text-blue-400 font-semibold">LayerZero V2</h4>
                      </div>
                      <p className="text-sm text-gray-400">Cross-chain messaging protocol</p>
                    </div>

                    {/* EVM side */}
                    <div className="absolute top-0 right-0 w-1/3 p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
                      <h4 className="text-cyan-400 font-semibold mb-2">EVM Executor</h4>
                      <p className="text-sm text-gray-400">Verifies & executes actions</p>
                    </div>

                    {/* Future chains */}
                    <div className="absolute bottom-0 right-0 w-1/3 p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                      <h4 className="text-green-400 font-semibold mb-2">Future Chains</h4>
                      <p className="text-sm text-gray-400">Cosmos, Polkadot, & more</p>
                    </div>

                    {/* Connection lines */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 800 400"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Line from Solana to LayerZero */}
                      <path
                        d="M200 100 L400 200"
                        stroke="url(#purple-gradient)"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                      />
                      {/* Line from LayerZero to EVM */}
                      <path d="M400 200 L600 100" stroke="url(#cyan-gradient)" strokeWidth="2" strokeDasharray="6 4" />
                      {/* Line from LayerZero to Future Chains */}
                      <path d="M400 200 L600 300" stroke="url(#green-gradient)" strokeWidth="2" strokeDasharray="6 4" />

                      {/* Animated dots */}
                      <circle className="animate-pulse" cx="200" cy="100" r="5" fill="#a855f7" />
                      <circle className="animate-pulse" cx="400" cy="200" r="5" fill="#3b82f6" />
                      <circle className="animate-pulse" cx="600" cy="100" r="5" fill="#06b6d4" />
                      <circle className="animate-pulse" cx="600" cy="300" r="5" fill="#22c55e" />

                      {/* Gradients */}
                      <defs>
                        <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                        <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`text-3xl font-bold mb-4 bg-gradient-to-r ${step.color} text-transparent bg-clip-text`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Future Chain Expansion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Future Chain Support</h3>
            <p className="text-gray-400 mb-4">
              While ZeroPilot initially focuses on Solana and EVM chains, our roadmap includes expanding to additional
              blockchain ecosystems:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-900/20 to-green-900/5 rounded-lg border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-2">Cosmos Ecosystem</h4>
                <p className="text-sm text-gray-400">
                  Control Cosmos chains like Osmosis and Juno from your Solana wallet
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-900/20 to-pink-900/5 rounded-lg border border-pink-500/30">
                <h4 className="text-pink-400 font-semibold mb-2">Polkadot Parachains</h4>
                <p className="text-sm text-gray-400">
                  Interact with Polkadot's ecosystem through the same unified interface
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-900/20 to-orange-900/5 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-400 font-semibold mb-2">Additional L1/L2s</h4>
                <p className="text-sm text-gray-400">
                  Support for other major chains and L2s as LayerZero expands its network
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
