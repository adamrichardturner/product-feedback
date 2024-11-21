"use client"

import TitleWidget from "@/components/widgets/TitleWidget"
import Navigation from "@/components/Navigation"
import CategoryWidget from "@/components/widgets/CategoryWidget"
import RoadmapWidget from "@/components/widgets/RoadmapWidget"
import FeedbackGrid from "@/components/FeedbackGrid"
import Image from "next/image"
import LoadingDots from "@/assets/shared/loading.svg"
import useSWR from "swr"

export default function Index() {
  const { data: feedbackData, error, isLoading } = useSWR("/api/feedback")

  if (error) return <div>Failed to load feedback</div>
  if (isLoading) {
    return (
      <div className='p-4 w-full md:w-[730px] mt-[30px] flex items-center justify-center'>
        <Image src={LoadingDots} width={60} height={60} alt='Loading' />
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col items-end justify-center md:pt-6 min-h-screen'>
      <div className='min-h-screen flex md:gap-[30px] flex-col lg:flex-row w-full flex-1 max-w-full md:pt-6 pb-[55px] md:pb-[130px]'>
        <div className='lg:w-[255px] flex lg:flex-col gap-6'>
          <TitleWidget feedbackData={feedbackData || []} />
          <div className='hidden md:flex flex-1 lg:flex-none'>
            <CategoryWidget />
          </div>
          <div className='hidden md:block flex-1 lg:flex-none'>
            <RoadmapWidget feedbackData={feedbackData || []} />
          </div>
        </div>
        <div className='flex-grow'>
          <Navigation suggestionsCounts={feedbackData?.length || 0} />
          <main className='px-4 md:px-0 pt-8 flex-grow'>
            <FeedbackGrid feedbackData={feedbackData} isLoading={isLoading} />
          </main>
        </div>
      </div>
    </div>
  )
}
