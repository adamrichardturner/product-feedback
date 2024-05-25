"use client"

import { useFeedbackStore } from "@/stores/FeedbackState/useFeedbackStore"
import { useCallback, useEffect } from "react"
import { getAllFeedback } from "@/services/feedbackService"

const useFeedback = () => {
  const feedbackData = useFeedbackStore((state) => state.feedbackData)
  const loading = useFeedbackStore((state) => state.loading)
  const addAllFeedback = useFeedbackStore((state) => state.addAllFeedback)
  const setLoading = useFeedbackStore((state) => state.setLoading)
  const feedbackCount = feedbackData.length

  const getAllFeedbackData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAllFeedback()
      addAllFeedback(data)
    } catch (error) {
      console.error("Error fetching feedback data:", error)
    } finally {
      setLoading(false)
    }
  }, [addAllFeedback, setLoading])

  useEffect(() => {
    getAllFeedbackData()
  }, [getAllFeedbackData])

  return { feedbackData, feedbackCount, loading }
}

export default useFeedback
