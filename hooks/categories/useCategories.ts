"use client"

import { getCategoriesList } from "@/services/categoriesService"
import { useCallback, useEffect, useState } from "react"

const useCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    categoriesList()
  }, [])

  const categoriesList = useCallback(async () => {
    const list = await getCategoriesList()
    setCategories(list)
  }, [])

  return {
    categories,
  }
}

export default useCategories
