import Link from "next/link"

import { Article } from "@/types/Article"

import { Loading } from "../Loading"

type RelatedArticlesProps = {
  articles: Article[]
  isLoading?: boolean
}

export const RelatedArticles = ({
  articles,
  isLoading
}: RelatedArticlesProps) => {
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="border-l border-slate-200 pl-12">
      <h3 className="text-2xl font-semibold mb-6">Related Articles</h3>

      <div className="flex flex-col">
        {articles?.slice(0, 5).map((article, index) => (
          <div key={article.articleId}>
            <Link href={`/articles/${article.articleId}`}>
              <h4 className="text-lg font-semibold mb-1 text-emerald-800 hover:text-emerald-600">
                {article.title}
              </h4>
            </Link>
            <p className="line-clamp-3 text-sm">{article.perex}</p>

            {index !== articles.length - 1 && index !== 4 && (
              <div className="border-b border-slate-200 my-6 " />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
