import axios from "axios"

export const toggleUpvote = async (feedbackId: string): Promise<void> => {
  try {
    const response = await axios.post("/api/feedback/upvote", { feedbackId })
    console.log("Vote toggled successfully:", response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error toggling vote:",
        error.response?.data || error.message
      )
      throw new Error(error.response?.data || error.message)
    } else {
      console.error("Unexpected error:", error)
      throw new Error("Unexpected error occurred")
    }
  }
}
