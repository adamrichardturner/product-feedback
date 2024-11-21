"use client"

import UpVote from "../UpVote/UpVoteAuth"
import SpeechBubble from "@/assets/shared/icon-comments.svg"
import Image from "next/image"
import useCategories from "@/hooks/categories/useCategories"
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
  const { setCategory } = useCategories()

  return (
    <div className='md:h-[152px] w-full flex-1 flex-grow rounded-btn bg-white p-6 md:pl-8 md:pt-7 flex flex-col md:flex-row justify-between'>
      <div className='bg-white w-full flex md:space-x-10'>
        <div className='hidden md:flex'>
          <UpVote
            upvotedByUser={upvotedByUser}
            feedbackId={id}
            upvotes={upvotes}
            isVertical={true}
          />
        </div>
        <article className='w-full'>
          <h3 className='font-semibold text-[14px] text-txt-primary md:text-md leading-md tracking-md'>
            {title}
          </h3>
          <p className='pt-1 text-[14px] leading-body1 text-txt-secondary'>
            {detail}
          </p>
          <div
            className='mt-2.5 inline-block text-body3 font-semibold transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover'
            onClick={() => setCategory(category)}
          >
            {formatCategory(category)}
          </div>
          <div className='md:hidden mt-3 flex justify-between w-full'>
            <div>
              <UpVote
                upvotedByUser={upvotedByUser}
                feedbackId={id}
                upvotes={upvotes}
                isVertical={false}
              />
            </div>

            <div className='items-center flex space-x-2'>
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
      <div className='hidden md:flex items-center space-x-2'>
        <Image src={SpeechBubble} width={18} height={16} alt='Speech Bubble' />
        <span className='font-semibold text-txt-primary'>
          {comments.length}
        </span>
      </div>
    </div>
  )
}

export default FeedbackCardSingle
