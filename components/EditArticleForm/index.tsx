"use client"

import { NewArticleFormType } from "@/types/Article"
import { ImageInfo } from "@/types/Image"

import { useArticle } from "@/hooks/articles/useGetArticle"
import { useUpdateArticle } from "@/hooks/articles/useUpdateArticle"
import { useUploadImage } from "@/hooks/images/useUploadImage"

import { ArticleForm } from "../ArticleForm"

type EditArticleFormProps = {
  id: string
}

export const EditArticleForm = ({ id }: EditArticleFormProps) => {
  const { uploadImage, isPending: isUploadingImage } = useUploadImage()
  const { updateArticle, isPending } = useUpdateArticle()

  const { article, articleImage, isFetching } = useArticle(id)

  const onSubmit = (data: NewArticleFormType) => {
    if (data.image?.lastModified !== articleImage?.lastModified) {
      uploadImage(data.image, {
        onSuccess: (responseData: ImageInfo) => {
          updateArticle({
            id,
            data: {
              imageId: responseData[0].imageId,
              title: data.title,
              perex: data.perex,
              content: data.content
            }
          })
        }
      })
      return
    }

    updateArticle({
      id,
      data: {
        imageId: article?.imageId,
        title: data.title,
        perex: data.perex,
        content: data.content
      }
    })
  }

  return (
    <ArticleForm
      defaultData={
        article
          ? {
              title: article?.title,
              perex: article?.perex,
              image: articleImage,
              content: article?.content
            }
          : undefined
      }
      submitAction={onSubmit}
      isLoading={isFetching || isPending || isUploadingImage}
    />
  )
}
