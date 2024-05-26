"use client"

import useFeedback from "@/hooks/feedback/useFeedback"
import FeedbackCard from "../FeedbackCard"
import LoadingDots from "@/assets/shared/loading.svg"
import Image from "next/image"

interface FeedbackGridProps {
  userId?: string
}

const FeedbackGrid = ({ userId }: FeedbackGridProps) => {
  const { feedbackData, filterFeedbackByCategory, loading } = useFeedback()

  console.log("FEEDBACK GRID USER: ", userId)

  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Image src={LoadingDots} width={60} height={60} alt='Loading Dots' />
      </div>
    )
  }

  const filteredFeedback = filterFeedbackByCategory(feedbackData)

  console.log(filteredFeedback)

  return (
    <div className='space-y-5'>
      {filteredFeedback.map(
        ({
          id,
          title,
          user_id,
          detail,
          category_id,
          comments,
          status,
          upvotes,
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
              authUserId={userId}
            />
          )
        }
      )}
    </div>
  )
}

export default FeedbackGrid
