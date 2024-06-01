"use client"

import FeedbackButtonAuth from "@/components/Navigation/FeebackButtonAuth"
import BackButton from "@/components/BackButton"
import { FeedbackButtonUnAuth } from "@/components/Navigation/FeedbackButtonUnAuth"
import useUser from "@/hooks/user/useUser"

function RoadMapNavigation() {
  const { isAuth } = useUser()
  return (
    <div className='w-full bg-btn-back-background md:rounded-btn flex items-center justify-between md:pl-6 md:py-6 md:pr-[44px]'>
      <div className='flex items-center space-x-8'>
        <div className='flex flex-col'>
          <BackButton isDark={false} />
          <h3 className='font-[700] text-white tracking-[-0.25px] text-[24px]'>
            Roadmap
          </h3>
        </div>
      </div>
      <div>{isAuth ? <FeedbackButtonAuth /> : <FeedbackButtonUnAuth />}</div>
    </div>
  )
}

export default RoadMapNavigation
