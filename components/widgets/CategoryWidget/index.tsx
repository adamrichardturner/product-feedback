"use client"

import useCategories from "@/hooks/categories/useCategories"

function CategoryWidget() {
  const { setCategory, selectedCategory } = useCategories()
  const active = selectedCategory
  return (
    <ul className='w-full hidden md:flex gap-x-2.5 flex-1 lg:flex-none gap-y-4 rounded-btn flex-row flex-wrap p-6 bg-white'>
      <li
        className={`text-xs items-center justify-center flex transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "all"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white font-[500]"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
        onClick={() => setCategory("all")}
      >
        All
      </li>
      <li
        className={`text-xs items-center justify-center flex transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "ui"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white font-[500]"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
        onClick={() => setCategory("ui")}
      >
        UI
      </li>
      <li
        className={`text-xs items-center justify-center flex transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "ux"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white font-[500]"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
        onClick={() => setCategory("ux")}
      >
        UX
      </li>
      <li
        className={`text-xs items-center justify-center flex transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "enhancement"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white font-[500]"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
        onClick={() => setCategory("enhancement")}
      >
        Enhancement
      </li>
      <li
        className={`text-xs items-center justify-center flex transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "bug"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white font-[500]"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
        onClick={() => setCategory("bug")}
      >
        Bug
      </li>
      <li
        className={`text-xs items-center justify-center flex transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer ${
          active === "feature"
            ? "bg-btn-upvote-active hover:bg-btn-upvote-active text-white font-[500]"
            : "bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover font-[500]"
        }`}
        onClick={() => setCategory("feature")}
      >
        Feature
      </li>
    </ul>
  )
}

export default CategoryWidget
