"use client"

import { useFeedbackStore } from "@/stores/FeedbackState/useFeedbackStore"
import { useCategoriesStore } from "@/stores/CategoriesState/useCategoriesStore"
import { useCallback, useEffect } from "react"
import { getAllFeedback } from "@/services/feedbackService"
import { FeedbackType } from "@/types/feedback"

const useFeedback = () => {
  const feedbackData = useFeedbackStore((state) => state.feedbackData)
  const loading = useFeedbackStore((state) => state.loading)
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory)
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
    const fetchUserData = async () => {
      await getAllFeedbackData()
    }
    fetchUserData()
  }, [])

  const filterFeedbackByCategory = useCallback(
    (feedbackData: FeedbackType[]) => {
      if (selectedCategory === "all") {
        return feedbackData
      }
      return feedbackData.filter(
        (feedback) => feedback.category_id === selectedCategory
      )
    },
    [selectedCategory]
  )

  const getSingleFeedback = useCallback(async (feedbackId: string) => {
    const singleFeedback = await feedbackData.find(
      (feedback) => feedback.id === feedbackId
    )
    return singleFeedback
  }, [])

  return {
    feedbackData,
    feedbackCount,
    loading,
    filterFeedbackByCategory,
    getAllFeedbackData,
    getSingleFeedback,
  }
}

export default useFeedback
