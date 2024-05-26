import { CategoriesType } from "@/types/categories"
import { StateCreator } from "zustand"

export interface ICategoriesSlice {
  categories: CategoriesType[]
  selectedCategory: CategoriesType
  setCategory: (category: CategoriesType) => void
}

export const createCategoriesSlice: StateCreator<ICategoriesSlice> = (set) => ({
  categories: ["all", "ui", "ux", "enhancement", "bug", "feature"],
  selectedCategory: "all",
  setCategory: (category: CategoriesType) =>
    set(() => ({
      selectedCategory: category,
    })),
})
