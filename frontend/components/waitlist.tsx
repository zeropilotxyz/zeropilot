"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { joinWaitlist } from "@/app/actions/waitlist"

export default function Waitlist() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(formRef.current!)
      const result = await joinWaitlist(formData)

      setResponse(result)
      setSubmitted(true)
    } catch (error) {
      setResponse({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setEmail("")
    setResponse(null)
  }

  return (
    <section className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-black z-0"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-400/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-8 md:p-12 border border-cyan-400/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                Waitlist
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Be among the first to experience ZeroPilot and control multiple blockchains from Solana
            </p>

            {!submitted ? (
              <motion.form
                ref={formRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-cyan-400/40 text-white placeholder:text-gray-400 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  We respect your privacy and will never share your information.
                </p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md mx-auto"
              >
                <div className="flex justify-center mb-4">
                  {response?.success ? (
                    <CheckCircle2 className="h-16 w-16 text-green-400" />
                  ) : (
                    <AlertCircle className="h-16 w-16 text-red-400" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{response?.success ? "Thank You!" : "Oops!"}</h3>
                <p className={`mb-6 ${response?.success ? "text-green-300" : "text-red-300"}`}>
                  {response?.message}
                </p>
                <Button
                  className={
                    response?.success
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white"
                      : "border-cyan-400 text-white hover:bg-cyan-500/20"
                  }
                  variant={response?.success ? "default" : "outline"}
                  onClick={resetForm}
                >
                  {response?.success ? "Join Another" : "Try Again"}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
