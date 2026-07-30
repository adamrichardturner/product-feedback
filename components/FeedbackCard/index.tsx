import SpeechBubble from "@/assets/shared/icon-comments.svg"
import Image from "next/image"
import useCategories from "@/hooks/categories/useCategories"
import { formatCategory } from "@/utils/feedback/formatCategory"
import { FeedbackCardProps } from "@/types/feedback"
import Link from "next/link"
import UpVote from "../UpVote"

function FeedbackCard({
  id,
  title,
  detail,
  category,
  comments,
  upvotedByUser,
  upvotes,
}: FeedbackCardProps) {
  const { setCategory } = useCategories()
  return (
    <div className='flex min-h-[200px] w-full flex-col gap-4 rounded-btn bg-white p-6 md:min-h-[152px] md:flex-row md:items-center md:justify-between md:gap-6 md:pl-8 md:pt-7'>
      <div className='flex min-w-0 flex-1 flex-col-reverse justify-between md:flex-row md:items-start md:gap-10'>
        <div className='mt-4 flex shrink-0 items-center justify-between md:mt-0 md:block'>
          <UpVote
            upvotedByUser={upvotedByUser}
            feedbackId={id}
            upvotes={upvotes}
            isVertical={true}
          />
          <Link
            href={`/feedback/${id}`}
            className='flex shrink-0 items-center gap-2 md:hidden'
          >
            <Image
              src={SpeechBubble}
              width={18}
              height={16}
              alt='Speech Bubble'
            />
            <span className='font-semibold text-txt-primary'>{comments}</span>
          </Link>
        </div>

        <article className='min-w-0 flex-1'>
          <Link href={`/feedback/${id}`}>
            <h3 className='cursor-pointer truncate text-md font-semibold leading-md tracking-md text-txt-primary transition-colors hover:text-[#4661E6]'>
              {title}
            </h3>
          </Link>

          <p className='line-clamp-2 w-full pt-1 text-body1 leading-body1 text-txt-secondary'>
            {detail}
          </p>
          <div
            className='pointer-events-none mt-2.5 inline-block rounded-btn bg-btn-upvote-background px-4 py-1.5 text-body3 font-semibold text-btn-upvote-active transition-colors hover:cursor-pointer hover:bg-btn-upvote-background-hover md:pointer-events-auto'
            onClick={() => setCategory(category)}
          >
            {formatCategory(category)}
          </div>
        </article>
      </div>

      <Link
        href={`/feedback/${id}`}
        className='hidden shrink-0 items-center gap-2 md:flex'
      >
        <Image src={SpeechBubble} width={18} height={16} alt='Speech Bubble' />
        <span className='font-semibold text-txt-primary'>{comments}</span>
      </Link>
    </div>
  )
}

export default FeedbackCard
