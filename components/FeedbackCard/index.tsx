import SpeechBubble from "@/assets/shared/icon-comments.svg"
import Image from "next/image"
import useCategories from "@/hooks/categories/useCategories"
import { formatCategory } from "@/utils/feedback/formatCategory"
import { FeedbackCardProps } from "@/types/feedback"
import { motion } from "framer-motion"
import Link from "next/link"
import useVoting from "@/hooks/voting/useVoting"
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
  const { toggleUserUpvote } = useVoting()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex min-h-[200px] items-center justify-between space-y-4 overflow-hidden rounded-btn bg-white p-6 md:min-h-[152px] md:flex-row md:space-y-0 md:pl-8 md:pt-7'
    >
      <div className='flex flex-1 flex-col-reverse items-stretch justify-between bg-white md:flex-none md:flex-row md:space-x-10'>
        <div className='mt-4 flex flex-1 items-center justify-between md:mt-0 md:flex-none md:items-start'>
          <UpVote
            upvotedByUser={upvotedByUser}
            feedbackId={id}
            upvotes={upvotes}
            isVertical={true}
          />
          <div className='flex items-center space-x-2 md:hidden'>
            <Link
              href={`/feedback/${id}`}
              className='flex items-center space-x-2 md:hidden'
            >
              <Image
                src={SpeechBubble}
                width={18}
                height={16}
                alt='Speech Bubble'
              />
              <span className='flex font-semibold text-txt-primary'>
                {comments}
              </span>
            </Link>
          </div>
        </div>

        <article className='max-w-full overflow-hidden'>
          <Link href={`/feedback/${id}`}>
            <h3 className='cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-md font-semibold leading-md tracking-md text-txt-primary transition-colors hover:text-[#4661E6]'>
              {title}
            </h3>
          </Link>

          <p className='w-full overflow-hidden text-ellipsis pt-1 text-body1 leading-body1 text-txt-secondary'>
            {detail}
          </p>
          <div
            className='mt-2.5 inline-block rounded-btn bg-btn-upvote-background px-4 py-1.5 text-body3 font-semibold text-btn-upvote-active transition-colors hover:cursor-pointer hover:bg-btn-upvote-background-hover'
            onClick={() => setCategory(category)}
          >
            {formatCategory(category)}
          </div>
        </article>
      </div>

      <div className='-mt-7 hidden items-center space-x-2 md:flex'>
        <Link
          href={`/feedback/${id}`}
          className='items-center space-x-2 md:flex'
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
    </motion.div>
  )
}

export default FeedbackCard
