import { ArticleDetail } from "@/components/ArticleDetail"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: Props) {
  const id = (await params).id

  return (
    <div>
      <ArticleDetail id={id} />
    </div>
  )
}
