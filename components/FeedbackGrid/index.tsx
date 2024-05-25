"use client"

import useFeedback from "@/hooks/feedback/useFeedback"
import FeedbackCard from "../FeedbackCard"

const FeedbackGrid = () => {
  const { feedbackData } = useFeedback()

  if (feedbackData.length <= 0) {
    return <h2>No Feedback</h2>
  }

  console.log(feedbackData)

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
