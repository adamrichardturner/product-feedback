"use client"

import FeedbackCard from "../FeedbackCard"
import LoadingDots from "@/assets/shared/loading.svg"
import Image from "next/image"
import FeedbackFallback from "./FeedbackFallback"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import { useIntersectionObserver } from "usehooks-ts"
import { FeedbackType } from "@/types/feedback"

const listItemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
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
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "200px",
  })

  useEffect(() => {
    if (!isIntersecting) {
      return
    }

    onLoadMore()
  }, [isIntersecting, onLoadMore])

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
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
      <AnimatePresence mode='popLayout' initial={false}>
        {feedbackItems.map((feedback) => (
          <motion.div
            key={feedback.id}
            layout
            variants={listItemVariants}
            initial='initial'
            animate='animate'
            exit='exit'
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

      <div ref={loadMoreRef} className='flex h-12 items-center justify-center'>
        {isLoadingMore ? (
          <Image
            src={LoadingDots}
            width={40}
            height={40}
            alt='Loading more'
            loading='eager'
          />
        ) : null}
        {!hasMore && feedbackItems.length > 0 ? (
          <span className='text-sm text-txt-secondary'>
            You&apos;ve reached the end
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default FeedbackGrid
