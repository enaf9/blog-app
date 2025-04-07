import { getArticles } from "@/api/articles"
import { useQuery } from "@tanstack/react-query"

export const useArticles = () => {
  const query = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  })

  return {
    ...query,
    articles: query.data?.items,
  }
}
