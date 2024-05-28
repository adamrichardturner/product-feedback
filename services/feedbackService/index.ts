import {
  FeedbackType,
  NewFeedbackType,
  UpdatedFeedbackType,
} from "@/types/feedback"
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

export const editFeedback = async (feedbackData: UpdatedFeedbackType) => {
  console.log("FEEDBACK DATA IN SERVICE ", feedbackData)
  try {
    await axios.put("/api/feedback", feedbackData)
  } catch (error) {
    console.error("Error updated feedback: ", error)
  }
}

export const deleteFeedback = async (feedbackId: string) => {
  try {
    await axios.delete("/api/feedback", { data: { id: feedbackId } })
  } catch (error) {
    console.error("Error deleting feedback: ", error)
  }
}
