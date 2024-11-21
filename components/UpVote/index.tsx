import UpVoteArrowBlue from "@/assets/shared/icon-arrow-up-blue.svg"
import UpVoteArrowWhite from "@/assets/shared/icon-arrow-up-white.svg"
import Image from "next/image"
import React from "react"
import { useUpvote } from "@/hooks/voting/useUpvote"

interface UpVoteProps {
  feedbackId: string
  upvotes: number
  upvotedByUser: boolean
  isVertical: boolean
}

const UpVote: React.FC<UpVoteProps> = ({
  feedbackId,
  upvotes,
  upvotedByUser,
  isVertical,
}) => {
  const { handleUpvote, isUpdating } = useUpvote()

  const onToggleUserUpvote = async (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    event.stopPropagation()
    await handleUpvote(feedbackId, upvotes, upvotedByUser)
  }

  return (
    <div
      className={`${
        isVertical
          ? "h-8 w-[70px] space-x-2 md:h-[52px] md:w-[40px] md:flex-col md:space-x-0 md:space-y-1 md:pb-2 md:pt-3.5"
          : "h-8 w-[70px] flex-row space-x-2 md:h-[32px] md:w-[70px]"
      } flex cursor-pointer items-center justify-center rounded-btn transition-colors ${
        upvotedByUser
          ? "bg-[#4661E6] text-white"
          : "bg-btn-upvote-background text-txt-primary hover:bg-btn-upvote-background-hover"
      } ${isUpdating ? "opacity-50" : ""}`}
      onPointerDown={onToggleUserUpvote}
    >
      <Image
        src={upvotedByUser ? UpVoteArrowWhite : UpVoteArrowBlue}
        width={8}
        height={4}
        alt='Up Vote Arrow'
      />
      <span className='text-body3 font-semibold'>{upvotes}</span>
    </div>
  )
}

export default UpVote
