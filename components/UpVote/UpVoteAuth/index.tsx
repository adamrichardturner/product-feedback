import UpVoteArrow from "@/assets/shared/icon-arrow-up-blue.svg"
import useVoting from "@/hooks/voting/useVoting"
import Image from "next/image"

interface UpVoteAuthProps {
  feedbackId: string
  upvotes: number
}

const UpVoteAuth = ({ feedbackId, upvotes }: UpVoteAuthProps) => {
  const { toggleUserUpvote } = useVoting()
  return (
    <div
      className='flex md:flex-col items-center justify-center space-x-2 md:space-x-0 w-[70px] md:space-y-1 md:pt-3.5 md:pb-2 h-8 md:w-[40px] md:h-[52px] cursor-pointer transition-colors rounded-btn bg-btn-upvote-background hover:bg-btn-upvote-background-hover'
      onClick={() => toggleUserUpvote(feedbackId)}
    >
      <Image src={UpVoteArrow} width={8} height={4} alt='Up Vote Arrow' />
      <span className='font-semibold text-txt-primary text-body3'>
        {upvotes}
      </span>
    </div>
  )
}

export default UpVoteAuth
