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
  }, [getAllFeedbackData])

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
  }
}

export default useFeedback
