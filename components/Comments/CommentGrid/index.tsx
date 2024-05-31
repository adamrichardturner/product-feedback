"use client"

import React, { useEffect, useState } from "react"
import {
  getAllComments,
  postComment,
  postReply,
  CommentType,
  NewCommentType,
} from "@/services/commentService"
import CommentCard from "../CommentCard"
import ReplyField from "../ReplyField"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface CommentGridProps {
  feedbackId: string
  initialComments: CommentType[]
}

const commentSchema = z.object({
  content: z
    .string()
    .min(4, { message: "Comment must be at least 4 characters long" })
    .max(250, { message: "Comment must be at most 250 characters long" }),
})

type FormInputs = z.infer<typeof commentSchema>

const CommentGrid: React.FC<CommentGridProps> = ({
  feedbackId,
  initialComments,
}) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments)
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  })

  const content = watch("content")

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getAllComments(feedbackId)
        setComments(data)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }

    fetchComments()
  }, [feedbackId])

  const handleCommentSubmit = async (data: FormInputs) => {
    const newComment: NewCommentType = {
      feedback_id: feedbackId,
      content: data.content,
    }

    try {
      await postComment(newComment)
      const refreshedComments = await getAllComments(feedbackId)
      setComments(refreshedComments)
      reset()
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  const handleReplySubmit = async (data: FormInputs) => {
    if (!replyToCommentId) return

    const newReply: NewCommentType = {
      feedback_id: feedbackId,
      content: data.content,
      parent_comment_id: replyToCommentId,
    }

    try {
      await postReply(newReply)
      const refreshedComments = await getAllComments(feedbackId)
      setComments(refreshedComments)
      setReplyToCommentId(null)
      setActiveReplyId(null)
      reset()
    } catch (error) {
      console.error("Error posting reply:", error)
    }
  }

  const handleReply = (parentCommentId: string) => {
    setReplyToCommentId(parentCommentId)
    setActiveReplyId(parentCommentId)
  }

  const renderComments = (
    comments: CommentType[],
    parentId: string | null = null
  ) => {
    return comments.map((comment) => (
      <React.Fragment key={comment.id}>
        <div className={`ml-${parentId ? "8" : "0"}`}>
          <CommentCard
            comment={comment}
            onReply={() => handleReply(comment.id)}
          />
        </div>
        {comment.id === activeReplyId && (
          <div className='ml-[72px]'>
            <ReplyField
              replyToCommentId={comment.id}
              onSubmit={handleReplySubmit}
            />
          </div>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div>{renderComments(comment.replies, comment.id)}</div>
        )}
      </React.Fragment>
    ))
  }

  return (
    <div className='rounded-btn'>
      <div className='bg-white mt-6 p-8 rounded-btn'>
        <h3 className='font-bold text-lg mb-4'>{comments.length} Comments</h3>
        <div className='comments-list'>{renderComments(comments)}</div>
      </div>
      <div className='bg-white p-8 mb-[110px] mt-6 rounded-btn'>
        <h4 className='font-bold text-md mb-2'>Add Comment</h4>
        <form onSubmit={handleSubmit(handleCommentSubmit)}>
          <div className='flex flex-col w-full gap-2'>
            <Textarea
              {...register("content")}
              placeholder='Type your comment here'
              rows={2}
              maxLength={250}
            />
            {errors.content && (
              <p className='text-red-500 text-left text-sm'>
                {String(errors.content.message)}
              </p>
            )}
            <div className='flex w-full pt-4 items-center justify-between'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                  {250 - content.length} Characters left
                </p>
              </div>
              <Button
                type='submit'
                className='bg-[#AD1FEA] hover:bg-[#C75AF6] text-white w-[142px]'
              >
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentGrid
