import { ArticleDetail, Articles, NewArticlePayload } from "@/types/Article"

import client from "./client"

export const getArticles = async ({
  limit = 10,
  offset = 0
}: {
  limit?: number
  offset?: number
}) => {
  const response = await client.get(`/articles?limit=${limit}&offset=${offset}`)

  return response.data as Articles
}

export const getArticle = async (id: string) => {
  const response = await client.get(`/articles/${id}`)

  return response.data as ArticleDetail
}

export const postArticle = async (body: NewArticlePayload) => {
  const response = await client.post("/articles", body)

  return response.data as ArticleDetail
}

export const patchArticle = async (id: string, body: NewArticlePayload) => {
  const response = await client.patch(`/articles/${id}`, body)

  return response.data as ArticleDetail
}

export const deleteArticle = async (id: string) => {
  const response = await client.delete(`/articles/${id}`)

  return response.data
}
