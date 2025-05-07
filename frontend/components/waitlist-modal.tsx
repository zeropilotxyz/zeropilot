"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { joinWaitlist } from "@/app/actions/waitlist"

interface WaitlistModalProps {
  trigger: React.ReactNode
}

export default function WaitlistModal({ trigger }: WaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
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

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      // Reset form when closing the modal
      setTimeout(resetForm, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-black border-none" >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">Waitlist</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Be among the first to experience ZeroPilot and control multiple blockchains from Solana.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              ref={formRef}
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-cyan-400/40 text-white placeholder:text-gray-400 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white"
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
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy and will never share your information.
              </p>
            </motion.form>
          ) : response ? (
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              <div className="flex justify-center mb-4">
                {response.success ? (
                  <CheckCircle2 className="h-16 w-16 text-green-400 mb-4" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-red-400 mb-4" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {response.success ? "Thank You!" : "Oops!"}
              </h3>
              <p className={`text-gray-400 mb-6 ${response.success ? "text-green-300" : "text-red-300"}`}>
                {response.message || "No message returned from server."}
              </p>
              <div className="flex gap-3 justify-center mt-4">
                {response.success ? (
                  <>
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white"
                      onClick={resetForm}
                    >
                      Join Another
                    </Button>
                    <Button
                      className="border-cyan-400 text-white hover:bg-cyan-500/20"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="border-cyan-400 text-white hover:bg-cyan-500/20"
                      onClick={resetForm}
                    >
                      Try Again
                    </Button>
                    <Button
                      className="border-cyan-400 text-white hover:bg-cyan-500/20"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            </div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
