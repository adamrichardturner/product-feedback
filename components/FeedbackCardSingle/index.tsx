"use client"

import UpVote from "../UpVote"
import SpeechBubble from "@/assets/shared/icon-comments.svg"
import Image from "next/image"
import { formatCategory } from "@/utils/feedback/formatCategory"
import { SingleFeedbackCardProps } from "@/types/feedback"

function FeedbackCardSingle({
  id,
  title,
  detail,
  category,
  comments,
  upvotes,
  upvotedByUser,
}: SingleFeedbackCardProps) {
  return (
    <div className='flex w-full flex-1 flex-col justify-between gap-4 rounded-btn bg-white p-6 md:h-auto md:min-h-[152px] md:flex-row md:items-center md:gap-6 md:pl-8 md:pt-7'>
      <div className='flex min-w-0 flex-1 bg-white md:gap-10'>
        <div className='hidden shrink-0 md:flex'>
          <UpVote
            upvotedByUser={upvotedByUser}
            feedbackId={id}
            upvotes={upvotes}
            isVertical={true}
          />
        </div>
        <article className='min-w-0 flex-1'>
          <h3 className='truncate text-[14px] font-semibold leading-md tracking-md text-txt-primary md:text-md'>
            {title}
          </h3>
          <p className='line-clamp-2 pt-1 text-[14px] leading-body1 text-txt-secondary'>
            {detail}
          </p>
          <div className='mt-2.5 inline-block rounded-btn bg-btn-upvote-background px-4 py-1.5 text-body3 font-semibold text-btn-upvote-active transition-colors'>
            {formatCategory(category)}
          </div>
          <div className='mt-3 flex w-full items-center justify-between md:hidden'>
            <UpVote
              upvotedByUser={upvotedByUser}
              feedbackId={id}
              upvotes={upvotes}
              isVertical={false}
            />

            <div className='flex shrink-0 items-center gap-2'>
              <Image
                src={SpeechBubble}
                width={18}
                height={16}
                alt='Speech Bubble'
              />
              <span className='font-semibold text-txt-primary'>
                {comments.length}
              </span>
            </div>
          </div>
        </article>
      </div>
      <div className='hidden shrink-0 items-center gap-2 md:flex'>
        <Image src={SpeechBubble} width={18} height={16} alt='Speech Bubble' />
        <span className='font-semibold text-txt-primary'>
          {comments.length}
        </span>
      </div>
    </div>
  )
}

export default FeedbackCardSingle
