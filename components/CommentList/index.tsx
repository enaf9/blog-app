import { Comments } from "@/types/Comment"

import { CommentItem } from "../CommentItem"

type CommentListProps = {
  comments: Comments
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="grid gap-8">
      {comments.length ? (
        comments.map(comment => (
          <CommentItem key={comment.commentId} data={comment} />
        ))
      ) : (
        <div className="text-center py-12">No comments yet</div>
      )}
    </div>
  )
}
