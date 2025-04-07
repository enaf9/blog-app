"use client"

import { Article } from "@/types/Article"

import { useArticles } from "@/hooks/articles/useGetArticles"

import { ArticleItem } from "../ArticleItem"
import { Loading } from "../Loading"

export const ArticleList = () => {
  const { articles, isFetching } = useArticles()

  return (
    <div className="mt-12 flex flex-col gap-8">
      {isFetching ? (
        <Loading />
      ) : articles?.length ? (
        articles.map((article: Article) => (
          <ArticleItem data={article} key={article.articleId} />
        ))
      ) : (
        <div className="font-medium text-center pt-24">No articles yet</div>
      )}
    </div>
  )
}
