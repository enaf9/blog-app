import { getImage } from "@/api/images"
import { useQuery } from "@tanstack/react-query"

export const useImage = (id: string) => {
  const query = useQuery({
    queryKey: ["image", id],
    queryFn: () => getImage(id),
    enabled: !!id && id !== "",
    staleTime: Infinity
  })

  return {
    ...query,
    image: (query.data && new File([query.data], "ArticleImage")) as File,
    imageUrl: query.data && URL.createObjectURL(query.data)
  }
}
