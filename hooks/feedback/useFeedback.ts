"use client"

import { useFeedbackStore } from "@/stores/FeedbackState/useFeedbackStore"
import { useCallback, useEffect, useState } from "react"
import { FeedbackType } from "@/types/feedback"
import { getAllFeedback } from "@/services/feedbackService"

const useFeedback = () => {
  const feedbackStoreData = useFeedbackStore((state) => state.feedbackData)
  const [feedbackData, setFeedbackData] =
    useState<FeedbackType[]>(feedbackStoreData)

  const getAllFeedbackData = useCallback(async () => {
    try {
      const data = await getAllFeedback()
      return data
    } catch (error) {
      console.error("Error fetching feedback data:", error)
      return []
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllFeedbackData()
      setFeedbackData(data)
    }

    fetchData()
  }, [getAllFeedbackData])

  return { feedbackData }
}

export default useFeedback
