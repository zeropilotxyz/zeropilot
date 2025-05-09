"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Rocket, Twitter, Github, DiscIcon as Discord, Mail } from "lucide-react"
import { LayerZeroIcon } from "./icons/layerzero-icon"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Use Cases", href: "#use-cases" },
        { name: "Roadmap", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Blog", href: "#" },
        {
          name: "LayerZero",
          href: "https://layerzero.network",
          icon: (
            <div className="w-4 h-4 inline-flex items-center justify-center mr-1">
              <LayerZeroIcon />
            </div>
          ),
        },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Discord className="h-5 w-5" />, href: "#", label: "Discord" },
    { icon: <Mail className="h-5 w-5" />, href: "#", label: "Email" },
  ]

  return (
    <footer className="relative bg-black overflow-hidden pt-20 border-t border-white/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
                className="relative w-14 h-14 flex items-center justify-center"
              >
                <Image src="/logo/logo.png" alt="ZeroPilot Logo" width={80} height={80} />
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                ZeroPilot
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Control any chain from Solana with LayerZero V2. The smart wallet system for the multichain world.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-full bg-white/5 hover:bg-white/10"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {currentYear} ZeroPilot. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
