"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import FeedbackCardSingle from "@/components/FeedbackCardSingle"
import { FeedbackCardProps } from "@/types/feedback"
import LoadingDots from "@/assets/shared/loading.svg"
import BackButton from "@/components/BackButton"
import Link from "next/link"
import Image from "next/image"

export default function Page({ params }: { params: { id: string } }) {
  const [feedback, setFeedback] = useState<FeedbackCardProps | null>(null)
  const [userAud, setUserAud] = useState<string | undefined>(undefined)
  const supabase = createClient()

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .eq("id", params.id)
        .single()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user?.aud) {
        setUserAud(user?.aud)
      }

      if (error) {
        console.error("Error fetching feedback:", error)
      } else {
        setFeedback(data)
      }
    }

    if (params.id) {
      fetchFeedback()
    }
  }, [])

  return (
    <div className='w-[730px]'>
      <div className='flex items-center justify-between pb-6 pt-[80px]'>
        <div>
          <BackButton />
        </div>
        <div>
          <Link href='/feedback/edit'>
            <div className='flex items-center rounded-btn py-2 px-4 space-x-1 text-white bg-[#4661E6] hover:bg-[#7C91F9] transition-colors cursor-pointer'>
              <span className='font-semibold text-sm'>Edit Feedback</span>
            </div>
          </Link>
        </div>
      </div>
      {feedback ? (
        <FeedbackCardSingle
          id={feedback.id}
          user_id={feedback.user_id}
          title={feedback.title}
          detail={feedback.detail}
          category_id={feedback.category_id}
          comments={[]}
          status={feedback.status}
          upvotes={feedback.upvotes}
          authUserId={userAud}
        />
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <Image src={LoadingDots} width={60} height={60} alt='Loading Dots' />
        </div>
      )}
    </div>
  )
}
