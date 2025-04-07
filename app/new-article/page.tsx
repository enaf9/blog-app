import { NewArticleForm } from "@/components/NewArticleForm"
import { PageTitle } from "@/components/PageTitle"

export default function CreateArticlePage() {
  return (
    <div>
      <PageTitle>Create new article</PageTitle>

      <NewArticleForm />
    </div>
  )
}
