import Image from "next/image"

import { useForm } from "react-hook-form"

import { Comment } from "@/types/Comment"

import { useArticle } from "@/hooks/articles/useGetArticle"
import { useAuthentication } from "@/hooks/authentication/useAuthentication"
import { useAddComment } from "@/hooks/comments/useAddComment"

import { CommentList } from "../CommentList"
import { InputField } from "../InputField"
import { Loading } from "../Loading"

type CommentSectionProps = {
  articleId: string
}

export const CommentSection = ({ articleId }: CommentSectionProps) => {
  const { register, handleSubmit } = useForm<Comment>()
  const { addComment } = useAddComment()
  const { isAuthenticated } = useAuthentication()

  const { article, isFetching } = useArticle(articleId)

  const onSubmit = (data: { content: string }) => {
    // Not working currently - Adding comment throws 500 error
    addComment({
      ...data,
      articleId,
      // Hardcoded value - There is no endpoint to receive users name
      author: "Jan Novak"
    })
  }

  if (isFetching) {
    return <Loading />
  }

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">
        Comments ({article?.comments.length})
      </h4>

      {isAuthenticated && (
        <div className="grid gap-6 grid-cols-[auto_1fr] items-center">
          <div className="relative size-10.5">
            <Image
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=5184&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile Photo"
              fill={true}
              sizes="100%"
              priority={true}
              className="rounded-full object-cover object-center"
            />
          </div>
          <form
            className="mt-2"
            onSubmit={handleSubmit(onSubmit)}
            aria-label="form"
          >
            <InputField
              id="content"
              placeholder="Join the discussion"
              {...register("content")}
            />
          </form>
        </div>
      )}
      <CommentList comments={article?.comments || []} />
    </div>
  )
}
