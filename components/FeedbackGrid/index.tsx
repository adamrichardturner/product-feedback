"use client"

import useFeedback from "@/hooks/feedback/useFeedback"
import FeedbackCard from "../FeedbackCard"
import LoadingDots from "@/assets/shared/loading.svg"
import Image from "next/image"
import { FeedbackType } from "@/types/feedback"
import { SelectedFilterType } from "@/stores/FeedbackState/slices/feedbackSlice"
import FeedbackFallback from "./FeedbackFallback"

const FeedbackGrid = ({
  feedbackData,
  isLoading,
}: {
  feedbackData: FeedbackType[]
  isLoading: boolean
}) => {
  const { filterFeedbackByCategory, selectedFilter } = useFeedback()

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Image
          src={LoadingDots}
          width={60}
          height={60}
          alt='Loading Dots'
          loading='eager'
        />
      </div>
    )
  }

  const filteredFeedback = filterFeedbackByCategory(feedbackData ?? [])
  const sortedFeedback = sortFeedback(
    filteredFeedback.filter((feedback) => Boolean(feedback?.id)),
    selectedFilter
  )

  return (
    <div className='space-y-5'>
      {sortedFeedback.length > 0 ? (
        sortedFeedback.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            id={feedback.id}
            user_id={feedback.user_id}
            title={feedback.title}
            detail={feedback.detail}
            category={feedback.category}
            comments={feedback.comments}
            status={feedback.status}
            upvotes={feedback.upvotes}
            upvotedByUser={feedback.upvotedByUser}
          />
        ))
      ) : (
        <FeedbackFallback />
      )}
    </div>
  )
}

export default FeedbackGrid

function sortFeedback(feedback: FeedbackType[], filter: SelectedFilterType) {
  const sorted = [...feedback]

  switch (filter) {
    case "mostUpvotes":
      return sorted.sort((a, b) => b.upvotes - a.upvotes)
    case "leastUpvotes":
      return sorted.sort((a, b) => a.upvotes - b.upvotes)
    case "mostComments":
      return sorted.sort((a, b) => b.comments - a.comments)
    case "leastComments":
      return sorted.sort((a, b) => a.comments - b.comments)
    default:
      return sorted
  }
}
