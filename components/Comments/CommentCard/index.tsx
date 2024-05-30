import React from "react"
import { CommentType } from "@/services/commentService"
import Image from "next/image"

interface CommentCardProps {
  comment: CommentType
  onReply: (parentCommentId: string) => void
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onReply }) => {
  console.log("COMMENT IS: ", comment)
  const handleReplyClick = () => {
    onReply(comment.id)
  }

  return (
    <div className='bg-white mb-4'>
      <div className='flex items-start mb-2'>
        {comment?.user?.avatar_url ? (
          <Image
            src={comment?.user?.avatar_url}
            alt={`${comment?.user?.username}'s avatar`}
            width={40}
            height={40}
            className='rounded-full'
          />
        ) : (
          <div className='avatar-placeholder rounded-full w-10 h-10 bg-gray-300' />
        )}
        <div className='ml-3'>
          <p className='font-semibold'>{comment?.user?.full_name}</p>
          <p className='text-sm text-gray-500'>@{comment?.user?.username}</p>
        </div>
      </div>
      <p className='mb-2'>{comment?.content}</p>
      <button
        onClick={handleReplyClick}
        className='text-blue-500 text-sm font-semibold hover:underline'
      >
        Reply
      </button>
      {comment?.replies && comment?.replies.length > 0 && (
        <div className='ml-6 mt-4'>
          {comment?.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentCard
