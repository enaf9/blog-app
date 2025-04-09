import { useRouter } from "next/navigation"

import { patchArticle } from "@/api/articles"
import { getQueryClient } from "@/app/providers"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { NewArticlePayload } from "@/types/Article"
import { ResponseError } from "@/types/Errors"

const queryClient = getQueryClient()

export const useUpdateArticle = () => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: NewArticlePayload }) =>
      patchArticle(id, data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      queryClient.invalidateQueries({
        queryKey: ["article", data.articleId]
      })
      router.push(`/articles/${data.articleId}`)
      toast.success("Your article was successfully updated!")
    },
    onError: (error: AxiosError<ResponseError>) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try it later"
      )
    }
  })

  return {
    ...mutation,
    updateArticle: mutation.mutate
  }
}
