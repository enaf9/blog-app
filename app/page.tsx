import { ArticleList } from "@/components/ArticleList"
import { PageTitle } from "@/components/PageTitle"

export default function HomePage() {
  return (
    <div>
      <PageTitle>Recent articles</PageTitle>

      <ArticleList />
    </div>
  )
}
