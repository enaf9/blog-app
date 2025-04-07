import { useFormContext } from "react-hook-form"

import { MarkdownPreview } from "../MarkdownPreview"
import { TextArea } from "../TextArea"

export const MarkdownEditor = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()

  const { content } = watch()

  return (
    <div className="grid grid-cols-2 gap-8">
      <TextArea
        id="content"
        label="Content"
        {...register("content")}
        rows={30}
        error={errors.content?.message?.toString()}
      />
      <MarkdownPreview content={content} />
    </div>
  )
}
