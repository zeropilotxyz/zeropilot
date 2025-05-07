"use server"

import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

// Define the schema for email validation
const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type WaitlistResponse = {
  success: boolean
  message: string
}

export async function joinWaitlist(formData: FormData): Promise<WaitlistResponse> {
  try {
    // Get the email from the form data
    const email = formData.get("email") as string

    // Validate the email
    const result = emailSchema.safeParse({ email })

    if (!result.success) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Initialize Supabase client with proper error handling for URLs
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase credentials are missing")
      return {
        success: false,
        message: "Configuration error. Please try again later.",
      }
    }

    // Validate URL format before creating client
    try {
      // Test if the URL is valid
      new URL(supabaseUrl)
    } catch (error) {
      console.error("Invalid Supabase URL format:", error)
      return {
        success: false,
        message: "Configuration error. Please try again later.",
      }
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Create the waitlist table if it doesn't exist
    // This is a simplified approach - in production, you'd use migrations
    try {
      // First, check if the table exists
      const { error: tableCheckError } = await supabase.from("waitlist").select("*").limit(1)

      if (tableCheckError && tableCheckError.message.includes("does not exist")) {
        // Create the table using SQL - this requires appropriate permissions
        const { error: createTableError } = await supabase.rpc("create_waitlist_table")

        if (createTableError) {
          console.error("Error creating waitlist table:", createTableError)
          // Fall back to just trying to insert anyway
        }
      }
    } catch (error) {
      console.error("Error checking/creating table:", error)
      // Continue anyway - the insert might still work if the table exists
    }

    // Check if email already exists
    try {
      const { data: existingUser, error: queryError } = await supabase
        .from("waitlist")
        .select("email")
        .eq("email", email)
        .maybeSingle()

      if (queryError) {
        console.error("Error querying waitlist:", queryError)
      }

      if (existingUser) {
        return {
          success: true,
          message: "You're already on our waitlist! We'll keep you updated.",
        }
      }
    } catch (error) {
      console.error("Error checking existing email:", error)
      // Continue to insertion attempt
    }

    // Insert the new email into the waitlist table
    try {
      const { error: insertError } = await supabase
        .from("waitlist")
        .insert([{ email, joined_at: new Date().toISOString() }])

      if (insertError) {
        console.error("Error inserting into Supabase:", insertError)

        // If the error is about the table not existing, we'll try to create it
        if (insertError.message.includes("does not exist")) {
          return {
            success: false,
            message: "We're setting up our waitlist. Please try again in a few minutes.",
          }
        }

        return {
          success: false,
          message: "Something went wrong. Please try again later.",
        }
      }
    } catch (error) {
      console.error("Error in insert operation:", error)
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      }
    }

    return {
      success: true,
      message: "You've successfully joined our waitlist! We'll keep you updated on our progress.",
    }
  } catch (error) {
    console.error("Error in joinWaitlist:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
