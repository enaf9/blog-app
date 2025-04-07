import { ArticleDetail, NewArticlePayload } from "@/types/Article"

import client from "./client"

export const postArticle = async (
  body: NewArticlePayload & { imageId: string },
) => {
  const response = await client.post("/articles", body)

  return response.data as ArticleDetail
}
