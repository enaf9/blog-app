import { Comment } from "./Comment"
import { Pagination } from "./Pagination"

export type Article = {
  articleId: string
  title: string
  perex: string
  imageId: string
  createdAt: string
  lastUpdatedAt: string
}

export type Articles = {
  items: Article[]
  pagination: Pagination
}

export type NewArticle = {
  title: string
  perex: string
  content: string
}

export type NewArticleFormType = NewArticle & { image: File | null }

export type NewArticlePayload = NewArticle & { imageId: string }

export type ArticleDetail = Article & {
  content: string
  comments: Comment[]
}
