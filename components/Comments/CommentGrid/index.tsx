"use client"

import React, { useState } from "react"
import useSWR from "swr"
import CommentCard from "../CommentCard"
import ReplyField from "../ReplyField"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CommentType } from "@/types/comments"

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

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CommentGrid: React.FC<CommentGridProps> = ({
  feedbackId,
  initialComments,
}) => {
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)

  const { data: comments = initialComments, mutate: mutateComments } = useSWR(
    `/api/feedback/comments?feedback_id=${feedbackId}`,
    fetcher,
    {
      fallbackData: initialComments,
      revalidateOnFocus: false,
    }
  )

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

  const postComment = async ({
    feedback_id,
    content,
    parent_comment_id = null,
  }: {
    feedback_id: string
    content: string
    parent_comment_id?: string | null
  }) => {
    const response = await fetch("/api/feedback/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback_id, content, parent_comment_id }),
    })
    if (!response.ok) {
      throw new Error("Failed to post comment")
    }
    return await response.json()
  }

  const handleCommentSubmit = async (data: FormInputs) => {
    try {
      await postComment({
        feedback_id: feedbackId,
        content: data.content,
      })
      await mutateComments()
      reset()
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  const handleReplySubmit = async (data: FormInputs) => {
    if (!replyToCommentId) return

    try {
      await postComment({
        feedback_id: feedbackId,
        content: data.content,
        parent_comment_id: replyToCommentId,
      })
      await mutateComments()
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
    comments: CommentType[] = [],
    parentId: string | null = null
  ) => {
    if (!comments) return null

    return comments.map((comment: CommentType) => {
      if (!comment || !comment.id) return null

      return (
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
          {comment.replies &&
            comment.replies.length > 0 &&
            renderComments(comment.replies, comment.id)}
        </React.Fragment>
      )
    })
  }

  return (
    <div className='rounded-btn'>
      <div className='mt-6 rounded-btn bg-white p-6'>
        <h3 className='mb-4 text-[18px] font-bold text-txt-primary'>
          {comments.length} Comments
        </h3>
        <div className='comments-list'>{renderComments(comments)}</div>
      </div>
      <div className='mb-[110px] mt-6 rounded-btn bg-white p-8'>
        <h4 className='mb-4 text-md font-bold text-txt-primary'>Add Comment</h4>
        <form onSubmit={handleSubmit(handleCommentSubmit)}>
          <div className='flex w-full flex-col gap-2'>
            <Textarea
              {...register("content")}
              placeholder='Type your comment here'
              rows={2}
              maxLength={250}
            />
            {errors.content && (
              <p className='text-left text-sm text-red-500'>
                {String(errors.content.message)}
              </p>
            )}
            <div className='flex w-full items-center justify-between pt-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                  {250 - content.length} Characters left
                </p>
              </div>
              <Button
                type='submit'
                className='w-[142px] bg-[#AD1FEA] text-white hover:bg-[#C75AF6]'
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
