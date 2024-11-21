"use client"

import useCategories from "@/hooks/categories/useCategories"
import { CategoriesType } from "@/types/categories"

interface CategoryWidgetProps {
  setIsOpen?: (isOpen: boolean) => void
  isOpen?: boolean
}

function CategoryWidget({ setIsOpen, isOpen }: CategoryWidgetProps) {
  const { setCategory, selectedCategory } = useCategories()
  const active = selectedCategory

  const onClickCategory = (category: CategoriesType) => {
    setCategory(category)
    if (setIsOpen) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <ul className='flex w-full flex-1 flex-row flex-wrap gap-x-2.5 gap-y-4 rounded-btn bg-white p-6 md:flex lg:flex-none'>
      <li
        className={`flex items-center justify-center rounded-btn px-4 py-1.5 text-xs transition-colors hover:cursor-pointer ${
          active === "all"
            ? "bg-btn-upvote-active font-[500] text-white hover:bg-btn-upvote-active"
            : "bg-btn-upvote-background font-[500] text-btn-upvote-active hover:bg-btn-upvote-background-hover"
        }`}
        onClick={() => onClickCategory("all")}
      >
        All
      </li>
      <li
        className={`flex items-center justify-center rounded-btn px-4 py-1.5 text-xs transition-colors hover:cursor-pointer ${
          active === "ui"
            ? "bg-btn-upvote-active font-[500] text-white hover:bg-btn-upvote-active"
            : "bg-btn-upvote-background font-[500] text-btn-upvote-active hover:bg-btn-upvote-background-hover"
        }`}
        onClick={() => onClickCategory("ui")}
      >
        UI
      </li>
      <li
        className={`flex items-center justify-center rounded-btn px-4 py-1.5 text-xs transition-colors hover:cursor-pointer ${
          active === "ux"
            ? "bg-btn-upvote-active font-[500] text-white hover:bg-btn-upvote-active"
            : "bg-btn-upvote-background font-[500] text-btn-upvote-active hover:bg-btn-upvote-background-hover"
        }`}
        onClick={() => onClickCategory("ux")}
      >
        UX
      </li>
      <li
        className={`flex items-center justify-center rounded-btn px-4 py-1.5 text-xs transition-colors hover:cursor-pointer ${
          active === "enhancement"
            ? "bg-btn-upvote-active font-[500] text-white hover:bg-btn-upvote-active"
            : "bg-btn-upvote-background font-[500] text-btn-upvote-active hover:bg-btn-upvote-background-hover"
        }`}
        onClick={() => onClickCategory("enhancement")}
      >
        Enhancement
      </li>
      <li
        className={`flex items-center justify-center rounded-btn px-4 py-1.5 text-xs transition-colors hover:cursor-pointer ${
          active === "bug"
            ? "bg-btn-upvote-active font-[500] text-white hover:bg-btn-upvote-active"
            : "bg-btn-upvote-background font-[500] text-btn-upvote-active hover:bg-btn-upvote-background-hover"
        }`}
        onClick={() => onClickCategory("bug")}
      >
        Bug
      </li>
      <li
        className={`flex items-center justify-center rounded-btn px-4 py-1.5 text-xs transition-colors hover:cursor-pointer ${
          active === "feature"
            ? "bg-btn-upvote-active font-[500] text-white hover:bg-btn-upvote-active"
            : "bg-btn-upvote-background font-[500] text-btn-upvote-active hover:bg-btn-upvote-background-hover"
        }`}
        onClick={() => onClickCategory("feature")}
      >
        Feature
      </li>
    </ul>
  )
}

export default CategoryWidget
