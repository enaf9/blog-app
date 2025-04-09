import { Comment, CommentPayload } from "@/types/Comment"

import client from "./client"

export const postComment = async (body: CommentPayload) => {
  const response = await client.post("/comments", body)

  return response.data as Comment
}
export const postCommentVoteUp = async (id: string) => {
  const response = await client.post(`/comments/${id}/vote/up`)

  return response.data as Comment
}

export const postCommentVoteDown = async (id: string) => {
  const response = await client.post(`/comments/${id}/vote/down`)

  return response.data as Comment
}
