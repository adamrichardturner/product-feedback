"use client"

import Bulb from "@/assets/suggestions/icon-suggestions.svg"
import Image from "next/image"
import { SelectDropdownMenu } from "../ui/SelectDropdownMenu"
import useFeedback from "@/hooks/feedback/useFeedback"
import FeedbackButton from "./FeebackButton"

interface NavigationProps {
  suggestionsCounts: number
}

function Navigation({ suggestionsCounts }: NavigationProps) {
  return (
    <div className='flex h-[72px] w-full items-center justify-between bg-btn-back-background pr-6 md:rounded-btn md:py-6 md:pl-6 md:pr-4'>
      <div className='flex space-x-5 md:items-center md:space-x-8'>
        <div className='hidden space-x-4 md:flex'>
          <Image src={Bulb} width={24} height={24} alt='Bulb' />
          <h3 className='text-md font-[700] tracking-[-0.25px] text-white'>
            {suggestionsCounts} Suggestions
          </h3>
        </div>
        <div>
          <SelectDropdownMenu options={options} />
        </div>
      </div>
      <div>
        <FeedbackButton />
      </div>
    </div>
  )
}

export default Navigation

const options = [
  { value: "mostUpvotes", label: "Most Upvotes" },
  { value: "leastUpvotes", label: "Least Upvotes" },
  { value: "mostComments", label: "Most Comments" },
  { value: "leastComments", label: "Least Comments" },
]
