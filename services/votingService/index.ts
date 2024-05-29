import axios from "axios"

export const toggleUpvote = async (feedbackId: string): Promise<void> => {
  try {
    await axios.post("/api/feedback/upvote", { feedbackId })
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
