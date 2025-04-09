import { postTenant } from "@/api/tenants"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { ResponseError } from "@/types/Errors"

export const useCreateTenant = () => {
  const mutation = useMutation({
    mutationFn: postTenant,
    onError: (error: AxiosError<ResponseError>) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try it later"
      )
    }
  })

  return {
    ...mutation,
    createTenant: mutation.mutate
  }
}
