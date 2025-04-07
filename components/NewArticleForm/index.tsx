"use client"

import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { NewArticleFormType } from "@/types/Article"
import { ImageInfo } from "@/types/Image"

import { useCreateArticle } from "@/hooks/articles/useCreateArticle"
import { useUploadImage } from "@/hooks/images/useUploadImage"

import { Button } from "../Button"
import { FileInput } from "../FileInput"
import { InputField } from "../InputField"
import { MarkdownEditor } from "../MarkdownEditor"
import { TextArea } from "../TextArea"

const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  perex: z.string().min(1, "Perex is required"),
  content: z.string().min(1, "Content is required"),
  image: z.instanceof(File, { message: "Image is required" }).nullable()
})

export const NewArticleForm = () => {
  const methods = useForm<NewArticleFormType>({
    resolver: zodResolver(articleSchema)
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset
  } = methods
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
                reset()
                router.push("/")
                toast.success("Yor article was successfully added!")
              }
            }
          )
        }
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-3">
        <InputField
          id="title"
          label="Article title"
          {...register("title")}
          error={errors.title?.message}
        />
        <div className="grid grid-cols-2 gap-6">
          <TextArea
            id="perex"
            label="Perex"
            {...register("perex")}
            rows={11}
            error={errors.perex?.message}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileInput
                label="Featured image"
                accept="image/jpeg,image/jpg,image/png,image/heic"
                onFileChange={file => field.onChange(file)}
                onFileDelete={() => setValue("image", null)}
                error={errors.image?.message}
              />
            )}
          />
        </div>
        <MarkdownEditor />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isUploadingImage || isPending}
          >
            Publish Article
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
