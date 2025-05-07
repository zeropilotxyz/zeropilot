import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import UseCases from "@/components/use-cases"
import Waitlist from "@/components/waitlist"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Waitlist />
      <Footer />
    </main>
  )
}
