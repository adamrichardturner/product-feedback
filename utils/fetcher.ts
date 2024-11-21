import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
})

// Global fetcher for SWR
const fetcher = async (url: string) => {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    // Handle errors appropriately
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        window.location.href = "/"
      }
      throw new Error(error.response?.data?.message || "An error occurred")
    }
    throw error
  }
}

export default fetcher
