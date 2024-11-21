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
        <Image src={LoadingDots} width={60} height={60} alt='Loading Dots' />
      </div>
    )
  }

  const filteredFeedback = filterFeedbackByCategory(feedbackData)
  const sortedFeedback = sortFeedback(filteredFeedback, selectedFilter)

  return (
    <div className='space-y-5'>
      {sortedFeedback.length > 0 ? (
        sortedFeedback.map(
          ({
            id,
            title,
            user_id,
            detail,
            category,
            comments,
            status,
            upvotes,
            upvotedByUser,
          }) => {
            return (
              <FeedbackCard
                key={id}
                id={id}
                user_id={user_id}
                title={title}
                detail={detail}
                category={category}
                comments={comments}
                status={status}
                upvotes={upvotes}
                upvotedByUser={upvotedByUser}
              />
            )
          }
        )
      ) : (
        <FeedbackFallback />
      )}
    </div>
  )
}

export default FeedbackGrid

function sortFeedback(feedback: FeedbackType[], filter: SelectedFilterType) {
  switch (filter) {
    case "mostUpvotes":
      return feedback.sort((a, b) => b.upvotes - a.upvotes)
    case "leastUpvotes":
      return feedback.sort((a, b) => a.upvotes - b.upvotes)
    case "mostComments":
      return feedback.sort((a, b) => b.comments - a.comments)
    case "leastComments":
      return feedback.sort((a, b) => a.comments - b.comments)
    default:
      return feedback
  }
}
