import { FeedbackType } from "@/types/feedback"
import { StateCreator } from "zustand"

export interface IFeedbackSlice {
  feedbackData: FeedbackType[]
  loading: boolean
  setLoading: (isLoading: boolean) => void
  addAllFeedback: (allFeedback: FeedbackType[]) => void
  addFeedback: (newFeedback: FeedbackType) => void
}

export const createFeedbackSlice: StateCreator<IFeedbackSlice> = (set) => ({
  feedbackData: [],
  loading: false,
  setLoading: (isLoading: boolean) => set(() => ({ loading: isLoading })),
  addAllFeedback: (allFeedback: FeedbackType[]) =>
    set(() => ({
      feedbackData: allFeedback,
    })),
  addFeedback: (newFeedback: FeedbackType) =>
    set((state) => ({
      feedbackData: [...state.feedbackData, newFeedback],
    })),
})
