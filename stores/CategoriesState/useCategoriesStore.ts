import { create } from "zustand"
import {
  createCategoriesSlice,
  ICategoriesSlice,
} from "./slices/categoriesSlice"

export type ICategoriesStore = ICategoriesSlice

export const useCategoriesStore = create<ICategoriesStore>()((...a) => ({
  ...createCategoriesSlice(...a),
}))
