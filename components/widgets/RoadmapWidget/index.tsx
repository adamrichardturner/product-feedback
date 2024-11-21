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
    <div className='bg-white flex-1 lg:flex-none rounded-btn p-6 text-txt-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className='text-txt-primary font-bold text-[18px] tracking-[-0.25px]'>
          Roadmap
        </h2>
        <Link href='/roadmap'>
          <span className='text-btn-secondary-background underline text-sm cursor-pointer'>
            View
          </span>
        </Link>
      </div>
      <div className='flex pt-5 justify-between'>
        <div className='flex space-x-3 items-center'>
          <div className='rounded-full w-2 h-2 bg-[#F49F85]'></div>
          <span className='text-base'>Planned</span>
        </div>
        <div className='font-bold'>{getFeedbackStatusCount("planned")}</div>
      </div>
      <div className='flex pt-2 justify-between'>
        <div className='flex space-x-3 items-center'>
          <div className='rounded-full w-2 h-2 bg-[#AD1FEA]'></div>
          <span className='text-base'>In-Progress</span>
        </div>
        <div className='font-bold'>{getFeedbackStatusCount("progress")}</div>
      </div>
      <div className='flex pt-2 justify-between'>
        <div className='flex space-x-3 items-center'>
          <div className='rounded-full w-2 h-2 bg-[#62BCFA]'></div>
          <span className='text-base'>Live</span>
        </div>
        <div className='font-bold'>{getFeedbackStatusCount("live")}</div>
      </div>
    </div>
  )
}

export default RoadmapWidget
