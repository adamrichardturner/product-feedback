import { useFeedbackStore } from "@/stores/FeedbackState/useFeedbackStore"
import { useCategoriesStore } from "@/stores/CategoriesState/useCategoriesStore"
import { useCallback } from "react"
import { FeedbackType } from "@/types/feedback"
import { SelectedFilterType } from "@/stores/FeedbackState/slices/feedbackSlice"

const useFeedback = () => {
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory)
  const selectedFilter = useFeedbackStore((state) => state.selectedFilter)
  const setSelectedFeedback = useFeedbackStore(
    (state) => state.setSelectedFilter
  )

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

  return {
    selectedFilter,
    filterFeedbackByCategory,
    setFeedbackFilter,
    filterFeedbackByStatus,
  }
}

export default useFeedback
