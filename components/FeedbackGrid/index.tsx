"use client"

import useFeedback from "@/hooks/feedback/useFeedback"
import FeedbackCard from "../FeedbackCard"
import LoadingDots from "@/assets/shared/loading.svg"
import Image from "next/image"
import { FeedbackType } from "@/types/feedback"
import { SelectedFilterType } from "@/stores/FeedbackState/slices/feedbackSlice"

const FeedbackGrid = () => {
  const { feedbackData, filterFeedbackByCategory, loading, selectedFilter } =
    useFeedback()

  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Image src={LoadingDots} width={60} height={60} alt='Loading Dots' />
      </div>
    )
  }

  const filteredFeedback = filterFeedbackByCategory(feedbackData)

  const sortFeedback = (
    feedback: FeedbackType[],
    filter: SelectedFilterType
  ) => {
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

  const sortedFeedback = sortFeedback(filteredFeedback, selectedFilter)

  return (
    <div className='space-y-5'>
      {sortedFeedback.map(
        ({
          id,
          title,
          user_id,
          detail,
          category_id,
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
              category_id={category_id}
              comments={comments}
              status={status}
              upvotes={upvotes}
              upvotedByUser={upvotedByUser}
            />
          )
        }
      )}
    </div>
  )
}

export default FeedbackGrid
