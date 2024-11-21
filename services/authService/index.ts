import axios from "axios"
import { User, Session } from "@supabase/supabase-js"

// Define the type for the response
interface SupabaseAuthResponse {
  user: User | null // Supabase User type
  session: Session | null // Supabase Session type
}

export const loginToDemoAccount =
  async (): Promise<SupabaseAuthResponse | null> => {
    try {
      // Type the Axios POST request
      const response = await axios.post<SupabaseAuthResponse>("/api/auth/demo")

      // Return the response data, which is typed
      return response.data
    } catch (error) {
      console.error("Error logging into demo account:", error)
      return null // Return null in case of an error
    }
  }
