"use client"

import TitleWidget from "@/components/widgets/TitleWidget"
import Navigation from "@/components/Navigation"
import CategoryWidget from "@/components/widgets/CategoryWidget"
import RoadmapWidget from "@/components/widgets/RoadmapWidget"
import FeedbackGrid from "@/components/FeedbackGrid"
import useInfiniteFeedback from "@/hooks/feedback/useInfiniteFeedback"

export default function Index() {
  const {
    feedbackItems,
    total,
    statusCounts,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
  } = useInfiniteFeedback()

  return (
    <div className='flex min-h-screen w-full flex-col items-end justify-center md:pt-6'>
      <div className='flex min-h-screen w-full max-w-full flex-1 flex-col pb-[55px] md:gap-[30px] md:px-4 md:pb-[130px] md:pt-6 lg:flex-row'>
        <div className='flex gap-6 lg:w-[255px] lg:flex-col'>
          <TitleWidget statusCounts={statusCounts} />
          <div className='hidden flex-1 md:flex lg:flex-none'>
            <CategoryWidget />
          </div>
          <div className='hidden flex-1 md:block lg:flex-none'>
            <RoadmapWidget statusCounts={statusCounts} />
          </div>
        </div>
        <div className='min-w-0 flex-1'>
          <Navigation suggestionsCounts={total} />
          <main className='px-4 pt-8 md:px-0'>
            {error ? (
              <div className='flex min-h-[400px] w-full items-center justify-center text-txt-secondary'>
                Failed to load feedback
              </div>
            ) : (
              <FeedbackGrid
                feedbackItems={feedbackItems}
                hasMore={hasMore}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                onLoadMore={loadMore}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
