import axios from "axios"

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
      const response = await axios.post<DemoAuthResponse>(
        "/api/auth/demo",
        null,
        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      console.error("Error logging into demo account:", error)
      return null
    }
  }
