"use client"

import { NavSheet } from "./NavSheet"
import { FeedbackType } from "@/types/feedback"

interface TitleWidgetProps {
  feedbackData: FeedbackType[]
}

function TitleWidget({ feedbackData }: TitleWidgetProps) {
  return (
    <nav className='flex w-full flex-1 lg:h-[138px] lg:flex-none'>
      <div className='lg:flex-0 flex w-full flex-1 items-center justify-between bg-radial-gradient p-6 md:items-end md:justify-start md:rounded-btn lg:w-full lg:flex-none'>
        <div className='flex flex-col'>
          <h1 className='text-[20px] font-bold tracking-[-0.33px] text-white'>
            Product Feedback
          </h1>
          <p className='text-[12px] tracking-wider text-white opacity-75'>
            Made by{" "}
            <a href='https://adamrichardturner.dev' target='_blank'>
              <span className='font-semibold'>Adam Richard Turner</span>
            </a>
          </p>
        </div>

        <div className='md:hidden'>
          <NavSheet feedbackData={feedbackData} />
        </div>
      </div>
    </nav>
  )
}

export default TitleWidget
