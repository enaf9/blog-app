import { EditArticleForm } from "@/components/EditArticleForm"
import { PageTitle } from "@/components/PageTitle"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPage({ params }: Props) {
  const id = (await params).id

  return (
    <div>
      <PageTitle>Edit article</PageTitle>

      <EditArticleForm id={id} />
    </div>
  )
}
