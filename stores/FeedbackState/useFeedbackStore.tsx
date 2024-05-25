import { create } from "zustand"
import { createFeedbackSlice, IFeedbackSlice } from "./slices/feedbackSlice"

export type IFeedbackStore = IFeedbackSlice

export const useFeedbackStore = create<IFeedbackStore>()((...a) => ({
  ...createFeedbackSlice(...a),
}))
