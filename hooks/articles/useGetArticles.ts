import { getArticles } from "@/api/articles"
import { useInfiniteQuery } from "@tanstack/react-query"

type ArticlesParams = {
  limit?: number
}

export const useArticles = (params?: ArticlesParams) => {
  const query = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: ({ pageParam = null }) =>
      getArticles({ offset: pageParam || 0, limit: params?.limit || 10 }),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.pagination.offset + lastPage.pagination.limit <
      lastPage.pagination.total
        ? lastPage.pagination.offset + lastPage.pagination.limit
        : undefined
  })

  return {
    ...query,
    articles: query.data?.pages.map(data => data.items).flat()
  }
}
