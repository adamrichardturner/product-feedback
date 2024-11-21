import axios from "axios"
import { User, Session } from "@supabase/supabase-js"

interface SupabaseAuthResponse {
  user: User | null
  session: Session | null
}

export const loginToDemoAccount =
  async (): Promise<SupabaseAuthResponse | null> => {
    try {
      const response = await axios.post<SupabaseAuthResponse>("/api/auth/demo")
      return response.data
    } catch (error) {
      console.error("Error logging into demo account:", error)
      return null
    }
  }
