import { useFeedbackStore } from "@/stores/FeedbackState/useFeedbackStore"
import { useCategoriesStore } from "@/stores/CategoriesState/useCategoriesStore"
import { useCallback, useEffect } from "react"
import {
  getAllFeedback,
  getSingleFeedback,
  editFeedback,
} from "@/services/feedbackService"
import { FeedbackType, UpdatedFeedbackType } from "@/types/feedback"
import { SelectedFilterType } from "@/stores/FeedbackState/slices/feedbackSlice"
import { getAllComments } from "@/services/commentService"
import { createClient } from "@/utils/supabase/client"

const useFeedback = () => {
  const feedbackData = useFeedbackStore((state) => state.feedbackData) || []
  const loading = useFeedbackStore((state) => state.loading)
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory)
  const addAllFeedback = useFeedbackStore((state) => state.addAllFeedback)
  const setLoading = useFeedbackStore((state) => state.setLoading)
  const selectedFilter = useFeedbackStore((state) => state.selectedFilter)
  const setSelectedFeedback = useFeedbackStore(
    (state) => state.setSelectedFilter
  )
  const feedbackCount = feedbackData.length
  const supabase = createClient()

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

  const filterFeedbackByCategory = useCallback(
    (feedbackData: FeedbackType[]) => {
      if (selectedCategory === "all") {
        return feedbackData
      }
      return feedbackData.filter(
        (feedback) => feedback.category === selectedCategory
      )
    },
    [selectedCategory]
  )

  const getFeedbackAndComments = useCallback(async (feedbackId: string) => {
    const singleFeedback = await getSingleFeedback(feedbackId)
    const singleComments = await getAllComments(feedbackId)

    return {
      ...singleFeedback[0],
      comments: [...singleComments],
    }
  }, [])

  const setFeedbackFilter = useCallback(
    (newFilter: SelectedFilterType) => {
      setSelectedFeedback(newFilter)
    },
    [setSelectedFeedback]
  )

  const filterFeedbackByStatus = useCallback(
    (feedbackData: FeedbackType[], selectedStatus: string) => {
      return feedbackData.filter(
        (feedback) => feedback.status === selectedStatus
      )
    },
    []
  )

  const updateFeedbackData = useCallback(
    async (updatedFeedback: UpdatedFeedbackType) => {
      try {
        const response = await editFeedback(updatedFeedback)
        return response
      } catch (error) {
        console.error(error)
      }
    },
    []
  )

  const checkAuthAndFetchFeedback = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user && user.aud === "authenticated") {
        const data = await getAllFeedback()
        addAllFeedback(data)
      } else {
        console.log("User is not authenticated")
        return null
      }
    } catch (error) {
      console.error(
        "Error checking authentication or fetching feedback:",
        error
      )
      return null
    }
  }

  return {
    feedbackData,
    loading,
    selectedFilter,
    feedbackCount,
    filterFeedbackByCategory,
    getAllFeedbackData,
    getFeedbackAndComments,
    setFeedbackFilter,
    filterFeedbackByStatus,
    updateFeedbackData,
    checkAuthAndFetchFeedback,
  }
}

export default useFeedback
