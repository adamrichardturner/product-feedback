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
    <div className='h-[72px] w-full bg-btn-back-background md:rounded-btn flex items-center justify-between md:pl-6 md:py-6 pr-6 md:pr-4'>
      <div className='flex items-center space-x-8'>
        <div className='hidden md:flex space-x-4'>
          <Image src={Bulb} width={24} height={24} alt='Bulb' />
          <h3 className='font-[700] text-white tracking-[-0.25px] text-md'>
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
