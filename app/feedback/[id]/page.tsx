"use client"

import Image from "next/image"
import CommentGrid from "@/components/Comments/CommentGrid"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import FeedbackCardSingle from "@/components/FeedbackCardSingle"
import { FeedbackCardProps } from "@/types/feedback"
import BackButton from "@/components/BackButton"
import Link from "next/link"
import LoadingDots from "@/assets/shared/loading.svg"

export default function Page({ params }: { params: { id: string } }) {
  const [feedback, setFeedback] = useState<FeedbackCardProps | null>(null)
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("feedback")
          .select("*")
          .eq("id", params.id)
          .single()

        if (error) {
          console.error("Error fetching feedback:", error)
        } else {
          setFeedback(data)
        }

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user?.id) {
          setUserId(user?.id)
        }

        const { data: comments, error: commentError } = await supabase
          .from("comments")
          .select("*")
          .eq("feedback_id", params.id)

        if (commentError) {
          console.error("Error fetching comments: ", commentError)
        } else {
          setFeedback({
            ...data,
            comments: comments.length,
          })
        }
      } catch (error) {
        console.error("Error fetching feedback or user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [params.id, supabase])

  return (
    <div className='p-4 md:w-[730px]'>
      <div className='flex items-center justify-between pb-6 pt-[80px]'>
        <div>
          <BackButton />
        </div>
        <div>
          {feedback?.user_id === userId && (
            <Link href={`/feedback/edit/${feedback?.id}`}>
              <div className='flex items-center rounded-btn py-2 px-4 space-x-1 text-white bg-[#4661E6] hover:bg-[#7C91F9] transition-colors cursor-pointer'>
                <span className='font-semibold text-sm'>Edit Feedback</span>
              </div>
            </Link>
          )}
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
              category_id={feedback.category_id}
              comments={feedback.comments}
              status={feedback.status}
              upvotes={feedback.upvotes}
              authUserId={userId}
              upvotedByUser={feedback.upvotedByUser}
            />
          )}
          <div className=''>
            <CommentGrid
              feedbackId={feedback?.id}
              totalComments={feedback?.comments}
            />
          </div>
        </>
      )}
    </div>
  )
}
