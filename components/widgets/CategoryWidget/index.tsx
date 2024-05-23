"use client"

import useCategories from "@/app/hooks/categories/useCategories"
interface CategoryWidgetProps {
  active: string
}

function CategoryWidget({ active }: CategoryWidgetProps) {
  const { categories } = useCategories()
  console.log("CATEGORIES: ", categories)
  return (
    <ul className='w-full gap-x-2.5 gap-y-4 rounded-btn flex flex-row flex-wrap p-6 bg-white'>
      <li
        className={`text-xs transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "all"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
      >
        All
      </li>
      <li
        className={`text-xs transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "ui"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
      >
        UI
      </li>
      <li
        className={`text-xs transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "ux"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
      >
        UX
      </li>
      <li
        className={`text-xs transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "enhancement"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
      >
        Enhancement
      </li>
      <li
        className={`text-xs transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "bug"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
      >
        Bug
      </li>
      <li
        className={`text-xs transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "feature"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
      >
        Feature
      </li>
    </ul>
  )
}

export default CategoryWidget
