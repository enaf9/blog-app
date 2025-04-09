import { getArticle } from "@/api/articles"
import { useQuery } from "@tanstack/react-query"

import { useImage } from "../images/useGetImage"

export const useArticle = (id: string) => {
  const query = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle(id),
    enabled: !!id
  })

  const { image, isFetching: imageIsFetching } = useImage(
    query.data?.imageId || ""
  )

  return {
    ...query,
    isFetching: query.isFetching || imageIsFetching,
    article: query.data,
    articleImage: image
  }
}
