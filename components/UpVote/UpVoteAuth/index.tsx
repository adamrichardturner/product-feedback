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
      className='flex flex-col items-center space-y-1 pt-3.5 pb-2 w-[40px] h-[52px] cursor-pointer transition-colors rounded-btn bg-btn-upvote-background hover:bg-btn-upvote-background-hover'
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
