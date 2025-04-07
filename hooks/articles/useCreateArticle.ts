import { postArticle } from "@/api/articles"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { NewArticlePayload } from "@/types/Article"
import { ResponseError } from "@/types/Errors"

export const useCreateArticle = () => {
  const mutation = useMutation({
    mutationFn: async (data: NewArticlePayload) => postArticle(data),
    onError: (error: AxiosError<ResponseError>) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try it later"
      )
    }
  })

  return {
    ...mutation,
    createArticle: mutation.mutate
  }
}
