import useCategories from "@/hooks/categories/useCategories"
import { CategoriesType } from "@/types/categories"
import { formatCategory } from "@/utils/feedback/formatCategory"
import Link from "next/link"
import Image from "next/image"
import SpeechBubble from "@/assets/shared/icon-comments.svg"
import UpVote from "@/components/UpVote"

interface RoadMapCardProps {
  feedback_id: string
  status: string
  title: string
  detail: string
  category: CategoriesType
  upvotes: number
  commentCount: number
  upvotedByUser: boolean
}

const statusClasses = (status: string) => {
  switch (status) {
    case "planned":
      return { border: "border-status-planned", bg: "bg-status-planned" }
    case "progress":
      return {
        border: "border-status-progress",
        bg: "bg-status-progress",
      }
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
  category,
  upvotes,
  commentCount,
  upvotedByUser,
}: RoadMapCardProps) => {
  const { border, bg } = statusClasses(status)
  return (
    <article
      className={`${border} flex w-full flex-col rounded-[5px] border-t-[6px] bg-white p-8 md:h-[280px] lg:h-[260px]`}
    >
      <div className='flex h-full flex-col justify-between'>
        <div>
          <span className='flex items-center text-[16px] text-txt-secondary'>
            <span
              className={`mr-4 inline-block h-[8px] w-[8px] rounded-full ${bg}`}
            ></span>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <Link href={`/feedback/${feedback_id}`} className='pt-2'>
            <h3 className='text-[18px] font-bold tracking-[-0.25px] text-txt-primary transition-colors hover:text-[#4661E6]'>
              {title}
            </h3>
          </Link>
          <p className='text-[16px] text-txt-secondary'>{detail}</p>
        </div>

        <div className='flex flex-col items-start justify-between space-y-4'>
          <div className='mt-[24px] inline-block rounded-btn bg-btn-upvote-background px-4 py-1.5 text-body3 font-semibold text-btn-upvote-active transition-colors md:mt-[16px]'>
            {formatCategory(category)}
          </div>
          <div className='flex w-full flex-row justify-between'>
            <UpVote
              feedbackId={feedback_id}
              upvotes={upvotes}
              upvotedByUser={upvotedByUser}
              isVertical={false}
            />
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
