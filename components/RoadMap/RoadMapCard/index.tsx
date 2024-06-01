import useCategories from "@/hooks/categories/useCategories"
import { CategoriesType } from "@/types/categories"
import { formatCategory } from "@/utils/feedback/formatCategory"
import UpVoteAuth from "@/components/UpVote/UpVoteAuth"
import { UpVoteUnauth } from "@/components/UpVote/UpVoteUnauth"
import Link from "next/link"
import Image from "next/image"
import SpeechBubble from "@/assets/shared/icon-comments.svg"

interface RoadMapCardProps {
  feedback_id: string
  status: string
  title: string
  detail: string
  category_id: CategoriesType
  upvotes: number
  commentCount: number
  upvotedByUser: boolean
  isAuth: boolean
}

const statusClasses = (status: string) => {
  switch (status) {
    case "planned":
      return { border: "border-status-planned", bg: "bg-status-planned" }
    case "progress":
      return { border: "border-status-progress", bg: "bg-status-progress" }
    case "live":
      return { border: "border-status-live", bg: "bg-status-live" }
    default:
      return { border: "", bg: "" }
  }
}

const RoadMapCard = ({
  feedback_id,
  status,
  title,
  detail,
  category_id,
  upvotes,
  commentCount,
  upvotedByUser,
  isAuth,
}: RoadMapCardProps) => {
  const { border, bg } = statusClasses(status)
  const { setCategory } = useCategories()
  return (
    <article
      className={`${border} flex flex-col p-8 border-t-[6px] md:h-[260px] rounded-[5px] w-full bg-white`}
    >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <span className='text-[16px] text-txt-secondary flex items-center'>
            <span
              className={`inline-block w-[8px] h-[8px] rounded-full mr-4 ${bg}`}
            ></span>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <Link href={`/feedback/${feedback_id}`} className='pt-2'>
            <h3 className='text-txt-primary hover:text-[#4661E6] transition-colors font-bold text-[18px] tracking-[-0.25px]'>
              {title}
            </h3>
          </Link>
          <p className='text-txt-secondary text-[16px]'>{detail}</p>
        </div>

        <div className='flex flex-col items-start space-y-4 justify-between'>
          <div
            className='mt-[24px] md:mt-[16px] inline-block text-body3 font-semibold transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover'
            onClick={() => setCategory(category_id)}
          >
            {formatCategory(category_id)}
          </div>
          <div className='flex flex-row justify-between w-full'>
            {isAuth ? (
              <UpVoteAuth
                feedbackId={feedback_id}
                upvotes={upvotes}
                upvotedByUser={upvotedByUser}
                isVertical={false}
              />
            ) : (
              <UpVoteUnauth upvotes={upvotes} isVertical={false} />
            )}
            <Link
              href={`/feedback/${feedback_id}`}
              className='flex items-center space-x-2'
            >
              <Image
                src={SpeechBubble}
                width={18}
                height={16}
                alt='Speech Bubble'
              />
              <span className='font-semibold text-txt-primary'>
                {commentCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default RoadMapCard
