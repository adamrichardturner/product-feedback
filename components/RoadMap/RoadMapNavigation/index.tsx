"use client"

import FeedbackButtonAuth from "@/components/Navigation/FeebackButton"
import BackButton from "@/components/BackButton"

function RoadMapNavigation() {
  return (
    <div className='flex w-full items-center justify-between bg-btn-back-background p-6 md:rounded-btn md:py-6 md:pl-6 md:pr-[44px]'>
      <div className='flex items-center space-x-8'>
        <div className='flex flex-col'>
          <BackButton isDark={false} />
          <h3 className='text-[24px] font-[700] tracking-[-0.25px] text-white'>
            Roadmap
          </h3>
        </div>
      </div>
      <div>
        <FeedbackButtonAuth />
      </div>
    </div>
  )
}

export default RoadMapNavigation
