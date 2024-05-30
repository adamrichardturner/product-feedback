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

interface CommentGridProps {
  feedbackId: string
}

const CommentGrid: React.FC<CommentGridProps> = ({ feedbackId }) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [newCommentContent, setNewCommentContent] = useState("")
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null)

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

  const handlePostComment = async () => {
    if (newCommentContent.trim() === "") return

    const newComment: NewCommentType = {
      feedback_id: feedbackId,
      content: newCommentContent,
      parent_comment_id: replyToCommentId,
    }

    try {
      if (replyToCommentId) {
        await postReply(newComment)
      } else {
        await postComment(newComment)
      }

      // Refresh comments
      const data = await getAllComments(feedbackId)
      setComments(data)
      setNewCommentContent("")
      setReplyToCommentId(null)
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  const handleReply = (parentCommentId: string) => {
    setReplyToCommentId(parentCommentId)
    setNewCommentContent(
      `@${comments.find((c) => c.id === parentCommentId)?.user?.username} `
    )
  }

  console.log("Comments to be rendered:", comments)

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
        <textarea
          className='w-full p-2 border border-gray-300 rounded mb-2'
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder='Type your comment here'
          rows={4}
          maxLength={250}
        />
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>
            {250 - newCommentContent.length} Characters left
          </p>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            onClick={handlePostComment}
          >
            {replyToCommentId ? "Post Reply" : "Post Comment"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentGrid
