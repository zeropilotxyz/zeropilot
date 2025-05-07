"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, Globe, Lock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import WaitlistModal from "./waitlist-modal"
import { LayerZeroIcon } from "./icons/layerzero-icon"
import Link from "next/link"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black z-0"></div>

      {/* Animated grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-12 gap-2 transform">
          {Array.from({ length: 12 * 12 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-white/5 rounded-lg"
              style={{
                transform: `translateY(${
                  Math.sin(
                    (i % 12) * 0.5 + Math.floor(i / 12) * 0.5 + mousePosition.x * 0.001 + mousePosition.y * 0.001,
                  ) * 20
                }px)`,
                transition: "transform 0.5s ease-out",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <LayerZeroIcon />
              </div>
              Powered by LayerZero V2
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Control{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              Any Chain
            </span>{" "}
            from Solana
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl"
          >
            ZeroPilot is a smart wallet system that gives you the power to control and initiate transactions on multiple
            blockchains—starting from a single base: Solana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white px-8 group"
              >
                Launch App
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <WaitlistModal
              trigger={
                <Button size="lg"  className="border-purple-500 text-white hover:bg-purple-500/20">
                  Join Waitlist
                </Button>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
          >
            {[
              {
                icon: <Zap className="h-6 w-6 text-purple-400" />,
                title: "High Speed",
                description: "Execute transactions across chains with Solana's lightning-fast performance",
              },
              {
                icon: <Globe className="h-6 w-6 text-cyan-400" />,
                title: "Omnichain Control",
                description: "Manage your assets and interactions on any chain from a single interface",
              },
              {
                icon: <Lock className="h-6 w-6 text-purple-400" />,
                title: "Secure Messaging",
                description: "LayerZero V2 ensures your cross-chain messages are secure and verifiable",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="mb-4 p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 inline-block">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-500 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-cyan-500 rounded-full blur-[100px] animate-pulse"></div>
    </div>
  )
}
