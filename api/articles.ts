import { ArticleDetail, Articles, NewArticlePayload } from "@/types/Article"

import client from "./client"

export const getArticles = async () => {
  const response = await client.get("/articles")

  return response.data as Articles
}

export const postArticle = async (body: NewArticlePayload) => {
  const response = await client.post("/articles", body)

  return response.data as ArticleDetail
}
