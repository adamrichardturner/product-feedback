import UpVoteAuth from "../UpVote/UpVoteAuth"
import { UpVoteUnauth } from "../UpVote/UpVoteUnauth"
import SpeechBubble from "@/assets/shared/icon-comments.svg"
import Image from "next/image"
import useCategories from "@/hooks/categories/useCategories"
import { formatCategory } from "@/utils/feedback/formatCategory"
import { FeedbackCardProps } from "@/types/feedback"
import { motion } from "framer-motion"
import Link from "next/link"
import useUser from "@/hooks/user/useUser"

function FeedbackCard({
  id,
  user_id,
  title,
  detail,
  category_id,
  comments,
  status,
  upvotes,
}: FeedbackCardProps) {
  const { setCategory } = useCategories()
  const { isAuth } = useUser()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='h-[200px] md:h-[152px] space-y-4 md:space-y-0 rounded-btn bg-white p-6 md:pl-8 md:pt-7 flex md:flex-row items-center justify-between'
    >
      <div className='bg-white flex flex-1 md:flex-none items-stretch justify-between flex-col-reverse md:flex-row md:space-x-10'>
        <div className='flex items-center md:items-start justify-between flex-1 mt-4 md:mt-0 md:flex-none'>
          {isAuth ? (
            <UpVoteAuth feedbackId={id} upvotes={upvotes} />
          ) : (
            <UpVoteUnauth upvotes={upvotes} />
          )}
          <div className='flex md:hidden items-center space-x-2'>
            <Image
              src={SpeechBubble}
              width={18}
              height={16}
              alt='Speech Bubble'
            />
            <span className='font-semibold flex text-txt-primary'>0</span>
          </div>
        </div>

        <article>
          <Link href={`/feedback/${id}`}>
            <h3 className='font-semibold text-txt-primary text-md leading-md tracking-md hover:text-[#4661E6] transition-colors cursor-pointer'>
              {title}
            </h3>
          </Link>

          <p className='pt-1 text-body1 leading-body1 text-txt-secondary'>
            {detail}
          </p>
          <div
            className='mt-2.5 inline-block text-body3 font-semibold transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover'
            onClick={() => setCategory(category_id)}
          >
            {formatCategory(category_id)}
          </div>
        </article>
      </div>
      <div className='hidden md:flex items-center space-x-2 -mt-7'>
        <Image src={SpeechBubble} width={18} height={16} alt='Speech Bubble' />
        <span className='font-semibold text-txt-primary'>0</span>
      </div>
    </motion.div>
  )
}

export default FeedbackCard
