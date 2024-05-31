"use client"

import { useFeedbackStore } from "@/stores/FeedbackState/useFeedbackStore"
import { useCategoriesStore } from "@/stores/CategoriesState/useCategoriesStore"
import { useCallback, useEffect } from "react"
import { getAllFeedback, getSingleFeedback } from "@/services/feedbackService"
import { FeedbackType } from "@/types/feedback"
import { SelectedFilterType } from "@/stores/FeedbackState/slices/feedbackSlice"
import { getAllComments } from "@/services/commentService"

const useFeedback = () => {
  const feedbackData = useFeedbackStore((state) => state.feedbackData)
  const loading = useFeedbackStore((state) => state.loading)
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory)
  const addAllFeedback = useFeedbackStore((state) => state.addAllFeedback)
  const setLoading = useFeedbackStore((state) => state.setLoading)
  const selectedFilter = useFeedbackStore((state) => state.selectedFilter)
  const setSelectedFeedback = useFeedbackStore(
    (state) => state.setSelectedFilter
  )
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

  const getFeedbackAndComments = useCallback(
    async (feedbackId: string) => {
      const singleFeedback = await getSingleFeedback(feedbackId)
      const singleComments = await getAllComments(feedbackId)

      return {
        ...singleFeedback[0],
        comments: [...singleComments],
      }
    },
    [feedbackData]
  )

  const setFeedbackFilter = useCallback((newFilter: SelectedFilterType) => {
    setSelectedFeedback(newFilter)
  }, [])

  return {
    feedbackData,
    feedbackCount,
    loading,
    selectedFilter,
    filterFeedbackByCategory,
    getAllFeedbackData,
    getFeedbackAndComments,
    setFeedbackFilter,
  }
}

export default useFeedback
