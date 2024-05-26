"use client"

import { useCategoriesStore } from "@/stores/CategoriesState/useCategoriesStore"

const useCategories = () => {
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory)
  const setCategory = useCategoriesStore((state) => state.setCategory)

  return {
    selectedCategory,
    setCategory,
  }
}

export default useCategories
