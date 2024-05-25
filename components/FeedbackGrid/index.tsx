"use client"

import useFeedback from "@/hooks/feedback/useFeedback"
import FeedbackCard from "../FeedbackCard"
import LoadingDots from "@/assets/shared/loading.svg"
import Image from "next/image"

const FeedbackGrid = () => {
  const { feedbackData, loading } = useFeedback()

  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Image src={LoadingDots} width={60} height={60} alt='Loading Dots' />
      </div>
    )
  }

  return (
    <div className='space-y-5'>
      {feedbackData.map(
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
              id={id}
              user_id={user_id}
              title={title}
              detail={detail}
              category_id={category_id}
              comments={comments}
              status={status}
              upvotes={upvotes}
            />
          )
        }
      )}
    </div>
  )
}

export default FeedbackGrid
