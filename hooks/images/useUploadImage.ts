import { postImage } from "@/api/images"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUploadImage = () => {
  const mutation = useMutation({
    mutationFn: (image: File) => {
      const form = new FormData()

      form.append("image", image)

      return postImage(form)
    },
    onError: () => {
      toast.error(
        "Something went wrong with uploading the image! Please try it later"
      )
    }
  })

  return {
    ...mutation,
    uploadImage: mutation.mutate
  }
}
