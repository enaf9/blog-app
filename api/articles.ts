import { ArticleDetail, NewArticlePayload } from "@/types/Article"

import client from "./client"

export const postArticle = async (body: NewArticlePayload) => {
  const response = await client.post("/articles", body)

  return response.data as ArticleDetail
}
