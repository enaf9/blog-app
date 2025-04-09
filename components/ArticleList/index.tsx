"use client"

import { Article } from "@/types/Article"

import { useArticles } from "@/hooks/articles/useGetArticles"

import { ArticleItem } from "../ArticleItem"
import { Button } from "../Button"
import { Loading } from "../Loading"

export const ArticleList = () => {
  const {
    articles,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useArticles()

  return (
    <div className="mt-12 flex flex-col gap-8">
      {isFetching && !articles ? (
        <Loading />
      ) : articles?.length ? (
        <>
          {articles.map((article: Article) => (
            <ArticleItem data={article} key={article.articleId} />
          ))}

          {isFetchingNextPage && <Loading />}

          {hasNextPage && !isFetchingNextPage && (
            <div className="flex justify-center mt-12">
              <Button
                type="secondary"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                Load next articles
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="font-medium text-center pt-24">No articles yet</div>
      )}
    </div>
  )
}
