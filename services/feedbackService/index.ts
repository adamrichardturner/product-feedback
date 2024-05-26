import { FeedbackType, NewFeedbackType } from "@/types/feedback"
import axios from "axios"

export const getAllFeedback = async (): Promise<FeedbackType[]> => {
  try {
    const response = await axios.get("/api/feedback")
    return response.data
  } catch (error) {
    console.error("Error fetching all feedback:", error)
    throw error
  }
}

export const postFeedback = async (feedbackData: NewFeedbackType) => {
  try {
    await axios.post("/api/feedback/", feedbackData)
  } catch (error) {
    console.error("Error posting feedback:", error)
  }
}
