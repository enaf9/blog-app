import Image from "next/image"

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { differenceInDays, formatDistanceToNow, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"

import { Comment } from "@/types/Comment"

import { useDislikeComment } from "@/hooks/comments/useDislikeComment"
import { useLikeComment } from "@/hooks/comments/useLikeComment"

type CommentItemProps = {
  data: Comment
}

export const CommentItem = ({ data }: CommentItemProps) => {
  const { likeComment } = useLikeComment()
  const { dislikeComment } = useDislikeComment()
  const postedAt = new Date(data.postedAt || "")
  const daysAgo = differenceInDays(new Date(), parseISO(data.postedAt || ""))
  const timeAgo = formatDistanceToNow(postedAt, {
    addSuffix: true
  })

  return (
    <div>
      <div className="grid gap-6 grid-cols-[auto_1fr] items-start">
        <div className="relative size-10.5">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=5184&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile Photo"
            fill={true}
            priority={true}
            className="rounded-full object-cover object-center"
          />
        </div>
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="font-semibold">{data.author}</div>
            <div className="text-slate-400 text-xs">
              {daysAgo > 10 ? postedAt.toLocaleDateString() : timeAgo}
            </div>
          </div>
          <div className="text-sm">{data.content}</div>
          <div className="flex items-center space-x-2 mt-4 text-sm">
            <div
              className={twMerge(
                "ml-2 px-1 bg-green-400 text-white font-bold rounded-sm min-w-8 text-center",
                !data.score && "bg-slate-300",
                data.score && data.score < 0 && "bg-red-400"
              )}
            >
              {`${data.score && data.score > 0 ? "+" : ""}${data.score}`}
            </div>
            <button
              onClick={() => likeComment(data.commentId)}
              className="flex items-center text-gray-500 hover:text-green-500 cursor-pointer"
            >
              <ChevronUpIcon className="size-5" />
            </button>
            <button
              onClick={() => dislikeComment(data.commentId)}
              className="flex items-center text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <ChevronDownIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
