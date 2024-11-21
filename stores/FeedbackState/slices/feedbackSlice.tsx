import { StateCreator } from "zustand"

export type SelectedFilterType =
  | "mostUpvotes"
  | "leastUpvotes"
  | "mostComments"
  | "leastComments"

export interface IFeedbackSlice {
  selectedFilter: SelectedFilterType
  setSelectedFilter: (newFilter: SelectedFilterType) => void
}

export const createFeedbackSlice: StateCreator<IFeedbackSlice> = (set) => ({
  feedbackData: [],
  loading: false,
  selectedFilter: "mostUpvotes",
  setSelectedFilter: (newFilter: SelectedFilterType) =>
    set(() => ({ selectedFilter: newFilter })),
})
