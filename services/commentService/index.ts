import axios from "axios"

export interface CommentType {
  profiles: any
  replies: CommentType[]
  id: string
  feedback_id: string
  user_id: string
  parent_comment_id?: string | null
  content: string
  inserted_at: string
  user: {
    username: string
    full_name: string
    avatar_url: string
  }
}

export interface NewCommentType {
  feedback_id?: string
  content: string
  parent_comment_id?: string | null
}

export const getAllComments = async (
  feedback_id?: string
): Promise<CommentType[]> => {
  try {
    const response = await axios.get(`/api/feedback/comments`, {
      params: { feedback_id },
    })
    console.log("Response from API:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching all comments:", error)
    throw error
  }
}

export const postComment = async (commentData: NewCommentType) => {
  try {
    await axios.post("/api/feedback/comments", commentData)
  } catch (error) {
    console.error("Error posting comment:", error)
    throw error
  }
}

export const postReply = async (commentData: NewCommentType) => {
  try {
    await axios.post("/api/feedback/comments", commentData)
  } catch (error) {
    console.error("Error posting reply:", error)
    throw error
  }
}
