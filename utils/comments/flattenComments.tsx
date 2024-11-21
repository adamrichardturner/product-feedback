import { CommentType } from "@/types/comments"

export const flattenComments = (comments: CommentType[]): CommentType[] => {
  const flatComments: CommentType[] = []

  const flatten = (commentList: CommentType[]) => {
    commentList.forEach((comment) => {
      flatComments.push(comment)
      if (comment.replies && comment.replies.length > 0) {
        flatten(comment.replies)
      }
    })
  }

  flatten(comments)
  return flatComments
}
