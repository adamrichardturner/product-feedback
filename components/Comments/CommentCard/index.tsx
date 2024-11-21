"use client"

import React from "react"
import Image from "next/image"
import { CommentType } from "@/types/comments"

interface CommentCardProps {
  comment: CommentType
  onReply: (parentCommentId: string) => void
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onReply }) => {
  const handleReplyClick = () => {
    onReply(comment.id)
  }

  return (
    <div className='mb-4 bg-white'>
      <div className='flex items-center justify-between'>
        <div className='mb-2 flex items-start'>
          {comment.profiles?.avatar_url ? (
            <Image
              src={comment.profiles.avatar_url}
              alt={`${comment.profiles.username}'s avatar`}
              width={40}
              height={40}
              className='rounded-full'
            />
          ) : (
            <div className='avatar-placeholder h-10 w-10 rounded-full bg-gray-300' />
          )}
          <div className='ml-8'>
            <p className='font-semibold text-txt-primary'>
              {comment.profiles?.full_name}
            </p>
            <p className='text-sm text-txt-secondary'>
              @{comment.profiles?.username}
            </p>
          </div>
        </div>
        <button
          onClick={handleReplyClick}
          className='text-xs font-semibold text-[#4661E6] hover:underline'
        >
          Reply
        </button>
      </div>

      <p className='mb-2 ml-[72px] text-[15px] text-txt-secondary'>
        {comment.content}
      </p>
    </div>
  )
}

export default CommentCard
