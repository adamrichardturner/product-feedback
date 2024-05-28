import UpVoteArrowBlue from "@/assets/shared/icon-arrow-up-blue.svg"
import UpVoteArrowWhite from "@/assets/shared/icon-arrow-up-white.svg"
import useVoting from "@/hooks/voting/useVoting"
import Image from "next/image"

interface UpVoteAuthProps {
  feedbackId: string
  upvotes: number
  upvotedByUser: boolean
}

const UpVoteAuth = ({
  feedbackId,
  upvotes,
  upvotedByUser,
}: UpVoteAuthProps) => {
  const { toggleUserUpvote } = useVoting()
  return (
    <div
      className={`flex md:flex-col items-center justify-center space-x-2 md:space-x-0 w-[70px] md:space-y-1 md:pt-3.5 md:pb-2 h-8 md:w-[40px] md:h-[52px] cursor-pointer transition-colors rounded-btn ${
        upvotedByUser
          ? "bg-[#4661E6] text-white"
          : "bg-btn-upvote-background hover:bg-btn-upvote-background-hover text-txt-primary"
      }`}
      onClick={() => toggleUserUpvote(feedbackId)}
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
