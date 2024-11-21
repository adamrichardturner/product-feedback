"use client"

import Image from "next/image"
import useSWR from "swr"
import CommentGrid from "@/components/Comments/CommentGrid"
import FeedbackCardSingle from "@/components/FeedbackCardSingle"
import BackButton from "@/components/BackButton"
import LoadingDots from "@/assets/shared/loading.svg"
import Link from "next/link"

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch")
  }
  return response.json()
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const {
    data: feedback,
    error: feedbackError,
    isLoading: feedbackLoading,
  } = useSWR(`/api/feedback/single?feedback_id=${id}`, fetcher, {
    revalidateOnFocus: false,
  })

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useSWR(`/api/feedback/comments?feedback_id=${id}`, fetcher, {
    revalidateOnFocus: false,
  })

  if (feedbackError || commentsError) {
    return (
      <div className='w-full p-4 md:w-[730px]'>
        <div className='text-red-500'>Failed to load data.</div>
      </div>
    )
  }

  if (feedbackLoading || commentsLoading) {
    return (
      <div className='mt-[30px] flex w-full items-center justify-center p-4 md:w-[730px]'>
        <Image src={LoadingDots} width={60} height={60} alt='Loading' />
      </div>
    )
  }

  return (
    <div className='w-full p-4 md:w-[730px]'>
      <div className='flex items-center justify-between pb-6 pt-[80px]'>
        <BackButton isDark={true} />
        {feedback.user_id === feedback.current_user_id && (
          <Link href={`/feedback/edit/${feedback.id}`}>
            <div className='flex cursor-pointer items-center space-x-1 rounded-btn bg-[#4661E6] px-4 py-2 text-white transition-colors hover:bg-[#7C91F9]'>
              <span className='text-sm font-semibold'>Edit Feedback</span>
            </div>
          </Link>
        )}
      </div>
      <FeedbackCardSingle
        id={feedback.id}
        user_id={feedback.user_id}
        title={feedback.title}
        detail={feedback.detail}
        category={feedback.category}
        comments={comments}
        status={feedback.status}
        upvotes={feedback.upvotes}
        upvotedByUser={feedback.upvotedByUser}
      />
      <CommentGrid feedbackId={feedback.id} initialComments={comments} />
    </div>
  )
}
