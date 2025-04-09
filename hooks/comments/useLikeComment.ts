import { postCommentVoteUp } from "@/api/comments"
import { getQueryClient } from "@/app/providers"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { ResponseError } from "@/types/Errors"

const queryClient = getQueryClient()

export const useLikeComment = () => {
  const mutation = useMutation({
    mutationFn: postCommentVoteUp,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["article", data.articleId] })
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
    likeComment: mutation.mutate
  }
}
