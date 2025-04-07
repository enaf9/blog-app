import { useRouter } from "next/navigation"

import { setCookie } from "@/actions/actions"
import { login } from "@/api/authentication"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { ResponseError } from "@/types/Errors"

export const useLogin = () => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
      await setCookie("token", data.access_token, { maxAge: data.expires_in })
      router.push("/")
      toast.success("You have been successfully logged in.")
    },
    onError: (error: AxiosError<ResponseError>) => {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try it later",
      )
    },
  })

  return {
    ...mutation,
    login: mutation.mutate,
  }
}
