"use client"

import React from "react"
import { CommentType } from "@/services/commentService"
import Image from "next/image"

interface CommentCardProps {
  comment: CommentType
  onReply: (parentCommentId: string) => void
  isAuth: boolean
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onReply,
  isAuth,
}) => {
  const handleReplyClick = () => {
    onReply(comment.id)
  }

  return (
    <div className='bg-white mb-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-start mb-2'>
          {comment.profiles?.avatar_url ? (
            <Image
              src={comment.profiles.avatar_url}
              alt={`${comment.profiles.username}'s avatar`}
              width={40}
              height={40}
              className='rounded-full'
            />
          ) : (
            <div className='avatar-placeholder rounded-full w-10 h-10 bg-gray-300' />
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
        {isAuth && (
          <button
            onClick={handleReplyClick}
            className='text-[#4661E6] text-xs font-semibold hover:underline'
          >
            Reply
          </button>
        )}
      </div>

      <p className='ml-[72px] mb-2 text-txt-secondary text-[15px]'>
        {comment.content}
      </p>
    </div>
  )
}

export default CommentCard
