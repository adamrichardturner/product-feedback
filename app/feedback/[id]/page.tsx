"use client"

import Image from "next/image"
import CommentGrid from "@/components/Comments/CommentGrid"
import { useEffect, useState } from "react"
import FeedbackCardSingle from "@/components/FeedbackCardSingle"
import { SingleFeedbackCardProps } from "@/types/feedback"
import BackButton from "@/components/BackButton"
import Link from "next/link"
import LoadingDots from "@/assets/shared/loading.svg"
import useFeedback from "@/hooks/feedback/useFeedback"
import useUser from "@/hooks/user/useUser"
import useVoting from "@/hooks/voting/useVoting"

export default function Page({ params }: { params: { id: string } }) {
  const [feedback, setFeedback] = useState<SingleFeedbackCardProps>()
  const [loading, setLoading] = useState<boolean>(true)
  const { getFeedbackAndComments } = useFeedback()
  const { user, isAuth, updateUserAuth } = useUser()
  const { toggleUserUpvote } = useVoting()

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true)
      try {
        await updateUserAuth()
        const singleFeedback: SingleFeedbackCardProps =
          await getFeedbackAndComments(params.id)
        setFeedback(singleFeedback)
      } catch (error) {
        console.error("Error fetching feedback or user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [params.id])

  const handleToggleUpvote = (feedbackId: string) => {
    if (feedback) {
      const updatedFeedback = {
        ...feedback,
        upvotedByUser: !feedback.upvotedByUser,
        upvotes: feedback.upvotedByUser
          ? feedback.upvotes - 1
          : feedback.upvotes + 1,
      }
      setFeedback(updatedFeedback)
      toggleUserUpvote(feedbackId)
    }
  }

  return (
    <div className='p-4 w-full md:w-[730px]'>
      <div className='flex items-center justify-between pb-6 pt-[80px]'>
        <div>
          <BackButton isDark={true} />
        </div>
        <div>
          {feedback?.user_id === user.id ? (
            <Link href={`/feedback/edit/${feedback?.id}`}>
              <div className='flex items-center rounded-btn py-2 px-4 space-x-1 text-white bg-[#4661E6] hover:bg-[#7C91F9] transition-colors cursor-pointer'>
                <span className='font-semibold text-sm'>Edit Feedback</span>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
      {loading ? (
        <div className='w-full h-full flex items-center justify-center'>
          <Image src={LoadingDots} width={60} height={60} alt='Loading Dots' />
        </div>
      ) : (
        <>
          {feedback && (
            <FeedbackCardSingle
              id={feedback.id}
              user_id={feedback.user_id}
              title={feedback.title}
              detail={feedback.detail}
              category={feedback.category}
              comments={feedback.comments}
              status={feedback.status}
              upvotes={feedback.upvotes}
              isAuth={isAuth}
              upvotedByUser={feedback.upvotedByUser}
              onToggleUpvote={handleToggleUpvote}
            />
          )}
          {feedback?.id && feedback?.comments && (
            <div className=''>
              <CommentGrid
                feedbackId={feedback.id}
                initialComments={feedback.comments}
                isAuth={isAuth}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
