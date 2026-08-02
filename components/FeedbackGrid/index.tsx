"use client"

import FeedbackCard from "../FeedbackCard"
import LoadingDots from "@/assets/shared/loading.svg"
import Image from "next/image"
import FeedbackFallback from "./FeedbackFallback"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { FeedbackType } from "@/types/feedback"

/**
 * Entry only fades and lifts. Animating size, scale or position would make
 * every sibling reflow as pages append, which is what caused the list to jerk.
 */
const listItemVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: "linear" as const },
  },
}

function SkeletonFeedbackCard() {
  return (
    <div
      role='status'
      aria-live='polite'
      className='flex min-h-[200px] w-full flex-col gap-4 rounded-btn bg-white p-6 md:min-h-[152px] md:flex-row md:items-center md:justify-between md:gap-6 md:pl-8 md:pt-7'
    >
      <div className='flex min-w-0 flex-1 flex-col-reverse justify-between md:flex-row md:items-start md:gap-10'>
        <div className='mt-4 md:mt-0'>
          <div className='h-[40px] w-[69px] animate-pulse rounded-btn bg-[#F2F4FF] md:h-[53px] md:w-10' />
        </div>
        <div className='min-w-0 flex-1 space-y-2'>
          <div className='h-4 w-2/3 animate-pulse rounded bg-[#F2F4FF]' />
          <div className='h-4 w-full animate-pulse rounded bg-[#F2F4FF]' />
          <div className='h-4 w-1/2 animate-pulse rounded bg-[#F2F4FF]' />
          <div className='mt-2.5 h-8 w-20 animate-pulse rounded-btn bg-[#F2F4FF]' />
        </div>
      </div>
      <div className='hidden h-4 w-8 animate-pulse rounded bg-[#F2F4FF] md:block' />
      <span className='sr-only'>Loading feedback…</span>
    </div>
  )
}

interface FeedbackGridProps {
  feedbackItems: FeedbackType[]
  hasMore: boolean
  isLoading: boolean
  isLoadingMore: boolean
  onLoadMore: () => void
}

const FeedbackGrid = ({
  feedbackItems,
  hasMore,
  isLoading,
  isLoadingMore,
  onLoadMore,
}: FeedbackGridProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (!entry?.isIntersecting) {
          return
        }

        onLoadMore()
      },
      {
        root: null,
        rootMargin: "240px 0px",
        threshold: 0,
      }
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [onLoadMore, hasMore])

  if (isLoading) {
    return (
      <div
        role='status'
        aria-live='polite'
        className='flex min-h-[400px] w-full items-center justify-center'
      >
        <Image
          src={LoadingDots}
          width={60}
          height={60}
          alt='Loading Dots'
          loading='eager'
        />
      </div>
    )
  }

  if (feedbackItems.length === 0) {
    return <FeedbackFallback />
  }

  return (
    <div className='space-y-5'>
      <AnimatePresence initial={false}>
        {feedbackItems.map((feedback) => (
          <motion.div
            key={feedback.id}
            variants={listItemVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='w-full'
          >
            <FeedbackCard
              id={feedback.id}
              user_id={feedback.user_id}
              title={feedback.title}
              detail={feedback.detail}
              category={feedback.category}
              comments={feedback.comments}
              status={feedback.status}
              upvotes={feedback.upvotes}
              upvotedByUser={feedback.upvotedByUser}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {isLoadingMore ? (
        <div className='flex w-full flex-col space-y-5'>
          {Array.from({ length: 2 }).map((_, index) => (
            <SkeletonFeedbackCard key={`more-${index}`} />
          ))}
        </div>
      ) : null}

      {hasMore ? (
        <div ref={sentinelRef} className='h-4 w-full' aria-hidden />
      ) : null}
    </div>
  )
}

export default FeedbackGrid
