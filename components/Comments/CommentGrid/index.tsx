"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  getAllComments,
  postComment,
  postReply,
  CommentType,
  NewCommentType,
} from "@/services/commentService"
import CommentCard from "../CommentCard"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface CommentGridProps {
  feedbackId: string
}

// Define the Zod schema
const commentSchema = z.object({
  content: z
    .string()
    .min(8, { message: "Comment must be at least 8 characters long" })
    .max(250, { message: "Comment must be at most 250 characters long" }),
})

type FormInputs = z.infer<typeof commentSchema>

const CommentGrid: React.FC<CommentGridProps> = ({ feedbackId }) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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
        console.log("Fetching comments for feedback ID:", feedbackId)
        const data = await getAllComments(feedbackId)
        console.log("Fetched comments data:", data)
        setComments(data)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }

    console.log("useEffect triggered for feedback ID:", feedbackId)

    fetchComments()
  }, [feedbackId])

  const onSubmit = async (data: FormInputs) => {
    const newComment: NewCommentType = {
      feedback_id: feedbackId,
      content: data.content,
      parent_comment_id: replyToCommentId,
    }

    try {
      if (replyToCommentId) {
        await postReply(newComment)
      } else {
        await postComment(newComment)
      }

      // Refresh comments
      const refreshedComments = await getAllComments(feedbackId)
      setComments(refreshedComments)
      reset()
      setReplyToCommentId(null)
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  const handleReply = (parentCommentId: string) => {
    setReplyToCommentId(parentCommentId)
    const username = comments.find((c) => c.id === parentCommentId)?.user
      ?.username
    if (username) {
      setValue("content", `@${username} `)
    }
  }

  return (
    <div className='comment-grid p-4'>
      <h3 className='font-bold text-lg mb-4'>{comments.length} Comments</h3>
      <div className='comments-list'>
        {comments.map((comment) => {
          console.log(comment)
          return (
            <CommentCard
              key={comment.id}
              comment={comment}
              onReply={handleReply}
            />
          )
        })}
      </div>
      <div className='add-comment mt-6'>
        <h4 className='font-bold text-md mb-2'>
          {replyToCommentId ? "Add Reply" : "Add Comment"}
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col w-full gap-2'>
            <Textarea
              {...register("content")}
              placeholder='Type your comment here'
              rows={4}
              maxLength={250}
            />
            {errors.content && (
              <p className='text-red-500 text-left text-sm'>
                {errors.content.message}
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
                {replyToCommentId ? "Post Reply" : "Post Comment"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentGrid
