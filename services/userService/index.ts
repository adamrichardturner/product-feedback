import axios from "axios"

export const getAuthUser = async (): Promise<any> => {
  try {
    const response = await axios.get("/api/user")
    return response
  } catch (error) {
    console.error("Error fetching all feedback:", error)
    throw error
  }
}
