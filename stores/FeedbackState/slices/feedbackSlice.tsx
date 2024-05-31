import { FeedbackType } from "@/types/feedback"
import { StateCreator } from "zustand"
import { toggleUpvote as toggleUpvoteService } from "@/services/votingService" // Adjust the import path as necessary
import { getAllFeedback } from "@/services/feedbackService"

export type SelectedFilterType =
  | "mostUpvotes"
  | "leastUpvotes"
  | "mostComments"
  | "leastComments"

export interface IFeedbackSlice {
  feedbackData: FeedbackType[]
  loading: boolean
  selectedFilter: SelectedFilterType
  setLoading: (isLoading: boolean) => void
  addAllFeedback: (allFeedback: FeedbackType[]) => void
  addFeedback: (newFeedback: FeedbackType) => void
  setSelectedFilter: (newFilter: SelectedFilterType) => void
  toggleUpvote: (feedbackId: string) => void
  fetchFeedback: () => void
}

export const createFeedbackSlice: StateCreator<IFeedbackSlice> = (
  set,
  get
) => ({
  feedbackData: [],
  loading: false,
  selectedFilter: "mostUpvotes",
  setLoading: (isLoading: boolean) => set(() => ({ loading: isLoading })),
  addAllFeedback: (allFeedback: FeedbackType[]) =>
    set(() => ({
      feedbackData: allFeedback,
    })),
  addFeedback: (newFeedback: FeedbackType) =>
    set((state) => ({
      feedbackData: [...state.feedbackData, newFeedback],
    })),
  setSelectedFilter: (newFilter: SelectedFilterType) =>
    set(() => ({ selectedFilter: newFilter })),
  toggleUpvote: async (feedbackId: string) => {
    try {
      // Call the service to toggle the upvote
      await toggleUpvoteService(feedbackId)

      // Update the state
      set((state) => {
        const feedbackData = state.feedbackData.map((feedback) => {
          if (feedback.id === feedbackId) {
            const newUpvotes = feedback.upvotedByUser
              ? feedback.upvotes - 1
              : feedback.upvotes + 1
            return {
              ...feedback,
              upvotes: newUpvotes,
              upvotedByUser: !feedback.upvotedByUser,
            }
          }
          return feedback
        })

        return { feedbackData }
      })
    } catch (error) {
      console.error("Failed to toggle upvote:", error)
    }
  },
  fetchFeedback: async () => {
    set(() => ({ loading: true }))
    try {
      const feedbackData = await getAllFeedback()
      set(() => ({ feedbackData, loading: false }))
    } catch (error) {
      console.error("Failed to fetch feedback:", error)
      set(() => ({ loading: false }))
    }
  },
})
