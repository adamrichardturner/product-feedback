"use client"

import Link from "next/link"
import { FeedbackType } from "@/types/feedback"

interface RoadmapWidgetProps {
  feedbackData: FeedbackType[]
}

function RoadmapWidget({ feedbackData }: RoadmapWidgetProps) {
  const getFeedbackStatusCount = (status: string) => {
    return feedbackData.filter((feedback) => feedback.status === status).length
  }

  return (
    <div className='flex-1 rounded-btn bg-white p-6 text-txt-secondary lg:flex-none'>
      <div className='flex items-center justify-between'>
        <h2 className='text-[18px] font-bold tracking-[-0.25px] text-txt-primary'>
          Roadmap
        </h2>
        <Link href='/roadmap'>
          <span className='cursor-pointer text-sm text-btn-secondary-background underline'>
            View
          </span>
        </Link>
      </div>
      <div className='flex justify-between pt-5'>
        <div className='flex items-center space-x-3'>
          <div className='h-2 w-2 rounded-full bg-[#F49F85]'></div>
          <span className='text-base'>Planned</span>
        </div>
        <div className='font-bold'>{getFeedbackStatusCount("planned")}</div>
      </div>
      <div className='flex justify-between pt-2'>
        <div className='flex items-center space-x-3'>
          <div className='h-2 w-2 rounded-full bg-[#AD1FEA]'></div>
          <span className='text-base'>In-Progress</span>
        </div>
        <div className='font-bold'>{getFeedbackStatusCount("progress")}</div>
      </div>
      <div className='flex justify-between pt-2'>
        <div className='flex items-center space-x-3'>
          <div className='h-2 w-2 rounded-full bg-[#62BCFA]'></div>
          <span className='text-base'>Live</span>
        </div>
        <div className='font-bold'>{getFeedbackStatusCount("live")}</div>
      </div>
    </div>
  )
}

export default RoadmapWidget
