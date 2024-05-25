import { FeedbackType } from "@/types/feedback"
import { StateCreator } from "zustand"

export interface IFeedbackSlice {
  feedbackData: FeedbackType[]
}

export const createFeedbackSlice: StateCreator<IFeedbackSlice> = (set) => ({
  feedbackData: [],
  addAllFeedback: (allFeedback: FeedbackType[]) =>
    set(() => ({
      feedbackData: allFeedback,
    })),
  addFeedback: (newFeedback: FeedbackType) =>
    set((state) => ({
      feedbackData: [...state.feedbackData, newFeedback],
    })),
})
