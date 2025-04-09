import { postComment } from "@/api/comments"
import { getQueryClient } from "@/app/providers"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { ResponseError } from "@/types/Errors"

const queryClient = getQueryClient()

export const useAddComment = () => {
  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["article", data.articleId] })
    },
    onError: (error: AxiosError<ResponseError>) => {
      console.log("Er", error)
      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try it later"
      )
    }
  })

  return {
    ...mutation,
    addComment: mutation.mutate
  }
}
