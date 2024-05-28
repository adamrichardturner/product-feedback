"use client"

import Bulb from "@/assets/suggestions/icon-suggestions.svg"
import Image from "next/image"
import { SelectDropdownMenu } from "../ui/SelectDropdownMenu"
import useUser from "@/hooks/user/useUser"
import useFeedback from "@/hooks/feedback/useFeedback"
import FeedbackButtonAuth from "./FeebackButtonAuth"
import { FeedbackButtonUnAuth } from "./FeedbackButtonUnAuth"

function Navigation() {
  const { feedbackCount } = useFeedback()
  const { isAuth } = useUser()
  return (
    <div className='h-[72px] w-full bg-btn-back-background md:rounded-btn flex items-center justify-between md:pl-6 md:py-6 pr-6 md:pr-4'>
      <div className='flex items-center space-x-8'>
        <div className='hidden md:flex space-x-4'>
          <Image src={Bulb} width={23} height={24} alt='Bulb' />
          <h3 className='font-[700] text-white tracking-[-0.25px] text-md'>
            {feedbackCount} Suggestions
          </h3>
        </div>
        <div>
          <SelectDropdownMenu options={options} />
        </div>
      </div>
      <div>{isAuth ? <FeedbackButtonAuth /> : <FeedbackButtonUnAuth />}</div>
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
