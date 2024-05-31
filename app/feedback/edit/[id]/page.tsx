"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import FeedbackCardSingle from "@/components/FeedbackCardSingle"
import { FeedbackCardProps } from "@/types/feedback"
import LoadingDots from "@/assets/shared/loading.svg"
import BackButton from "@/components/BackButton"
import Image from "next/image"
import { FeedbackFormEditable } from "@/components/FeedbackFormEditable"
import { useRouter } from "next/navigation"

export default function Page({ params }: { params: { id: string } }) {
  const [feedback, setFeedback] = useState<FeedbackCardProps | null>(null)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const router = useRouter()
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

      if (user?.aud !== "authenticated") {
        router.push("/")
      }

      if (user?.aud === "authenticated") {
        setIsAuth(true)
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
    <section className='min-h-screen py-20 px-6 flex flex-col justify-center'>
      {feedback ? (
        <>
          <div className='pb-8 md:pb-12'>
            <BackButton isDark={true} />
          </div>
          <FeedbackFormEditable feedback={feedback} isAuth={isAuth} />
        </>
      ) : (
        <Image src={LoadingDots} width={60} height={60} alt='Loading' />
      )}
    </section>
  )
}
