"use client"

import Image from "next/image"

import { useArticle } from "@/hooks/articles/useGetArticle"
import { useArticles } from "@/hooks/articles/useGetArticles"

import { CommentSection } from "../CommentSection"
import { Loading } from "../Loading"
import { MarkdownContent } from "../MarkdownContent"
import { PageTitle } from "../PageTitle"
import { RelatedArticles } from "../RelatedArticles"

type ArticleDetailProps = {
  id: string
}

export const ArticleDetail = ({ id }: ArticleDetailProps) => {
  const { article, articleImageUrl, isFetching } = useArticle(id)
  const { articles, isFetching: isFetchingArticles } = useArticles()
  const date = new Date(article?.createdAt || "")

  if (isFetching) {
    return <Loading />
  }

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-12 items-start mb-8">
      <div>
        <PageTitle>{article?.title}</PageTitle>
        <div className="flex gap-4 my-6 text-sm text-slate-400 items-center ">
          <div>{article?.author || "Author"}</div>
          <div className="size-1.5 rounded-full bg-slate-400" />
          <div>{date.toLocaleDateString()}</div>
        </div>
        <div className="h-96 relative">
          <Image
            src={articleImageUrl}
            alt="Article image"
            fill={true}
            priority={true}
            className="object-cover object-center rounded-lg cursor-pointer"
          />
        </div>

        <div className="prose max-w-full mt-8">
          <MarkdownContent>{article?.content}</MarkdownContent>
        </div>

        <CommentSection articleId={id} />
      </div>
      <RelatedArticles
        articles={articles || []}
        isLoading={isFetchingArticles}
      />
    </div>
  )
}
