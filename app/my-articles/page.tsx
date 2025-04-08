import Link from "next/link"

import { ArticleTable } from "@/components/ArticleTable"
import { PageTitle } from "@/components/PageTitle"

export default function MyArticlesPage() {
  return (
    <div>
      <PageTitle>
        <div className="flex justify-between">
          <div>My articles</div>
          <Link href="/new-article" className="btn text-base">
            Create new article
          </Link>
        </div>
      </PageTitle>

      <ArticleTable />
    </div>
  )
}
