"use client"

import { FeedbackCardProps } from "@/types/feedback"
import LoadingDots from "@/assets/shared/loading.svg"
import BackButton from "@/components/BackButton"
import Image from "next/image"
import { FeedbackFormEditable } from "@/components/FeedbackFormEditable"
import useSWR from "swr"

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch")
  }
  return response.json()
}

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: feedback,
    error,
    isLoading,
  } = useSWR<FeedbackCardProps>(
    `/api/feedback/single?feedback_id=${params.id}`,
    fetcher
  )

  const { data: user } = useSWR("/api/auth/user", fetcher)

  if (error) return <div>Failed to load feedback</div>

  if (isLoading) {
    return (
      <div className='mt-[30px] flex w-full items-center justify-center p-4 md:w-[730px]'>
        <Image src={LoadingDots} width={60} height={60} alt='Loading' />
      </div>
    )
  }

  return (
    <section className='flex min-h-screen flex-col justify-center px-6 py-20'>
      <>
        <div className='pb-8 md:pb-12'>
          <BackButton isDark={true} />
        </div>
        {feedback && <FeedbackFormEditable feedback={feedback} />}
      </>
    </section>
  )
}
