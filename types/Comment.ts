export type Comment = {
  commentId?: string
  articleId: string
  author: string
  content: string
  postedAt?: string
  score?: number
}

export type Comments = Comment[]

export type CommentDetail = Comment & {
  content: string
  comments: []
}
