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
      <div className='mt-[30px] flex w-full items-center justify-center p-4 md:w-[730px]'>
        <Image src={LoadingDots} width={60} height={60} alt='Loading' />
      </div>
    )
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-end justify-center md:pt-6'>
      <div className='flex min-h-screen w-full max-w-full flex-1 flex-col pb-[55px] md:gap-[30px] md:px-4 md:pb-[130px] md:pt-6 lg:flex-row'>
        <div className='flex gap-6 lg:w-[255px] lg:flex-col'>
          <TitleWidget feedbackData={feedbackData || []} />
          <div className='hidden flex-1 md:flex lg:flex-none'>
            <CategoryWidget />
          </div>
          <div className='hidden flex-1 md:block lg:flex-none'>
            <RoadmapWidget feedbackData={feedbackData || []} />
          </div>
        </div>
        <div className='flex-grow'>
          <Navigation suggestionsCounts={feedbackData?.length || 0} />
          <main className='flex-grow px-4 pt-8 md:px-0'>
            <FeedbackGrid feedbackData={feedbackData} isLoading={isLoading} />
          </main>
        </div>
      </div>
    </div>
  )
}
