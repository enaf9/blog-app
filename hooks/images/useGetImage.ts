import { getImage } from "@/api/images"
import { useQuery } from "@tanstack/react-query"

export const useImage = (id: string) => {
  const query = useQuery({
    queryKey: ["image", id],
    queryFn: () => getImage(id),
    enabled: !!id
  })

  return {
    ...query,
    image: query.data,
    imageUrl: query.data && URL.createObjectURL(query.data)
  }
}
