import UpVoteArrowBlue from "@/assets/shared/icon-arrow-up-blue.svg"
import UpVoteArrowWhite from "@/assets/shared/icon-arrow-up-white.svg"
import useVoting from "@/hooks/voting/useVoting"
import Image from "next/image"
import React from "react"

interface UpVoteAuthProps {
  feedbackId: string
  upvotes: number
  upvotedByUser: boolean
  isVertical: boolean
}

const UpVoteAuth: React.FC<UpVoteAuthProps> = ({
  feedbackId,
  upvotes,
  upvotedByUser,
  isVertical,
}) => {
  const { toggleUserUpvote } = useVoting()

  const onToggleUserUpvote = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation()
    toggleUserUpvote(feedbackId)
  }

  return (
    <div
      className={`${
        isVertical
          ? "md:flex-col md:w-[40px] md:h-[52px] space-x-2 md:space-x-0 w-[70px] md:space-y-1 md:pt-3.5 md:pb-2 h-8"
          : "flex-row md:w-[70px] space-x-2 w-[70px] h-8 md:h-[32px]"
      } flex items-center justify-center cursor-pointer transition-colors rounded-btn ${
        upvotedByUser
          ? "bg-[#4661E6] text-white"
          : "bg-btn-upvote-background hover:bg-btn-upvote-background-hover text-txt-primary"
      }`}
      onPointerDown={onToggleUserUpvote}
    >
      <Image
        src={upvotedByUser ? UpVoteArrowWhite : UpVoteArrowBlue}
        width={8}
        height={4}
        alt='Up Vote Arrow'
      />
      <span className='font-semibold text-body3'>{upvotes}</span>
    </div>
  )
}

export default UpVoteAuth
