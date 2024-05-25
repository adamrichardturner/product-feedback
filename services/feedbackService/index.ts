import { NewFeedbackType } from "@/types/feedback"
import axios from "axios"

export const getAllFeedback = async () => {
  try {
    const data = await fetch("/api/feedback", {
      cache: "no-store",
    })
    const result = await data.json()
    return result
  } catch (error) {
    console.error(error)
  }
}

export const postFeedback = async (feedbackData: NewFeedbackType) => {
  try {
    await axios.post("/api/feedback/", feedbackData)
  } catch (error) {
    console.error(error)
  }
}
