"use client"

import { useRouter } from "next/navigation"

import { toast } from "sonner"

import { NewArticleFormType } from "@/types/Article"
import { ImageInfo } from "@/types/Image"

import { useCreateArticle } from "@/hooks/articles/useCreateArticle"
import { useUploadImage } from "@/hooks/images/useUploadImage"

import { ArticleForm } from "../ArticleForm"

export const NewArticleForm = () => {
  const router = useRouter()

  const { uploadImage, isPending: isUploadingImage } = useUploadImage()
  const { createArticle, isPending } = useCreateArticle()

  const onSubmit = (data: NewArticleFormType) => {
    if (data.image) {
      uploadImage(data.image, {
        onSuccess: (responseData: ImageInfo) => {
          createArticle(
            {
              imageId: responseData[0].imageId,
              title: data.title,
              perex: data.perex,
              content: data.content
            },
            {
              onSuccess: () => {
                router.push("/")
                toast.success("Your article was successfully added!")
              }
            }
          )
        }
      })
    }
  }

  return (
    <ArticleForm
      isLoading={isUploadingImage || isPending}
      submitAction={onSubmit}
    />
  )
}
