import Image from "next/image"
import Link from "next/link"

import { Article } from "@/types/Article"

import { useImage } from "@/hooks/images/useGetImage"

type ArticleItemProps = {
  data: Article
}

export const ArticleItem = ({ data }: ArticleItemProps) => {
  const date = new Date(data.createdAt)

  const { imageUrl } = useImage(data.imageId)

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-6">
      <Link className="relative w-96 h-64" href={`/articles/${data.articleId}`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Article image"
            fill={true}
            sizes="100%"
            priority={true}
            className="object-cover object-center rounded-lg cursor-pointer"
          />
        ) : (
          <div className="h-full w-full rounded-lg cursor-pointer bg-slate-200" />
        )}
      </Link>

      <div className="flex flex-col gap-4">
        <Link href={`/articles/${data.articleId}`}>
          <h4 className="font-bold text-2xl text-emerald-700 cursor-pointer hover:text-emerald-600">
            {data.title}
          </h4>
        </Link>
        <div className="text-sm text-slate-500">
          {date.toLocaleDateString()}
        </div>
        <p>{data.perex}</p>
      </div>
    </div>
  )
}
