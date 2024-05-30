"use client"

import React from "react"
import { CommentType } from "@/services/commentService"
import Image from "next/image"

interface CommentCardProps {
  comment: CommentType
  onReply: (parentCommentId: string) => void
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onReply }) => {
  const handleReplyClick = () => {
    onReply(comment.id)
  }

  // Flatten the replies
  const renderReplies = (replies: CommentType[]) => {
    const flatReplies: CommentType[] = []

    const flatten = (replyList: CommentType[]) => {
      replyList.forEach((reply) => {
        flatReplies.push(reply)
        if (reply.replies && reply.replies.length > 0) {
          flatten(reply.replies)
        }
      })
    }

    flatten(replies)
    return flatReplies
  }

  const flattenedReplies = comment.replies ? renderReplies(comment.replies) : []

  return (
    <div className='bg-white mb-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-start mb-2'>
          {comment?.profiles?.avatar_url ? (
            <Image
              src={comment?.profiles?.avatar_url}
              alt={`${comment?.profiles?.username}'s avatar`}
              width={40}
              height={40}
              className='rounded-full'
            />
          ) : (
            <div className='avatar-placeholder rounded-full w-10 h-10 bg-gray-300' />
          )}
          <div className='ml-8'>
            <p className='font-semibold'>{comment?.profiles?.full_name}</p>
            <p className='text-sm text-txt-secondary'>
              @{comment?.profiles?.username}
            </p>
          </div>
        </div>
        <button
          onClick={handleReplyClick}
          className='text-[#4661E6] text-xs font-semibold hover:underline'
        >
          Reply
        </button>
      </div>

      <p className='ml-[72px] mb-2 text-txt-secondary text-[15px]'>
        {comment?.content}
      </p>

      {flattenedReplies.length > 0 && (
        <div className='ml-[24px] mt-4'>
          {flattenedReplies.map((reply) => (
            <div key={reply.id} className='bg-white mb-4'>
              <div className='flex justify-between items-center'>
                <div className='flex items-start mb-2'>
                  {reply?.profiles?.avatar_url ? (
                    <Image
                      src={reply?.profiles?.avatar_url}
                      alt={`${reply?.profiles?.username}'s avatar`}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                  ) : (
                    <div className='avatar-placeholder rounded-full w-10 h-10 bg-gray-300' />
                  )}
                  <div className='ml-8'>
                    <p className='font-semibold'>
                      {reply?.profiles?.full_name}
                    </p>
                    <p className='text-sm text-txt-secondary'>
                      @{reply?.profiles?.username}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onReply(reply.id)}
                  className='text-[#4661E6] text-xs font-semibold hover:underline'
                >
                  Reply
                </button>
              </div>

              <p className='ml-[72px] mb-2 text-txt-secondary text-[15px]'>
                {reply?.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentCard
