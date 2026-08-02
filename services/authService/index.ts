import { api, isAxiosError } from "@/services/api"

interface DemoAuthResponse {
  message: string
  user: {
    id: string
    email: string
    aud: string
  }
}

export const loginToDemoAccount =
  async (): Promise<DemoAuthResponse | null> => {
    try {
      const response = await api.post<DemoAuthResponse>("/api/auth/demo")
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Error logging into demo account:", error.message)
        return null
      }
      console.error("Error logging into demo account:", error)
      return null
    }
  }
