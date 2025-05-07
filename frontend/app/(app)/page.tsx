import { redirect } from "next/navigation"

export default function AppIndexPage() {
  // Redirect to dashboard
  redirect("/dashboard")
}
