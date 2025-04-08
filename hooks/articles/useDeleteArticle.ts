import { deleteArticle } from "@/api/articles"
import { getQueryClient } from "@/app/providers"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { ResponseError } from "@/types/Errors"

const queryClient = getQueryClient()

export const useDeleteArticle = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
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
    deleteArticle: mutation.mutate
  }
}
