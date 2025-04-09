import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Comment } from "@/types/Comment"

import { CommentItem } from "@/components/CommentItem"

const commentMock: Comment = {
  articleId: "1",
  commentId: "1",
  author: "Jan Novak",
  content: "This is a sample comment.",
  postedAt: "2025-04-01T10:00:00Z",
  score: 3
}

const likeCommentMock = jest.fn()
const dislikeCommentMock = jest.fn()

jest.mock("../../hooks/comments/useLikeComment", () => ({
  useLikeComment: () => ({
    likeComment: likeCommentMock
  })
}))

jest.mock("../../hooks/comments/useDislikeComment", () => ({
  useDislikeComment: () => ({
    dislikeComment: dislikeCommentMock
  })
}))

describe("CommentItem", () => {
  it("renders CommentItem", () => {
    render(<CommentItem data={commentMock} />)
  })

  it("renders author and content correctly", () => {
    render(<CommentItem data={commentMock} />)

    expect(screen.getByText("Jan Novak")).toBeInTheDocument()
    expect(screen.getByText("This is a sample comment.")).toBeInTheDocument()
    expect(screen.getByText("+3")).toBeInTheDocument()
  })

  it("displays the time ago or full date correctly", () => {
    const recentComment = {
      ...commentMock,
      postedAt: new Date().toISOString()
    }
    render(<CommentItem data={recentComment} />)

    expect(screen.getByText(/ago/)).toBeInTheDocument()

    const oldComment = { ...commentMock, postedAt: "2025-03-01T10:00:00Z" }
    render(<CommentItem data={oldComment} />)

    expect(screen.getByText("3/1/2025")).toBeInTheDocument()
  })

  it("calls likeComment when like button is clicked", async () => {
    render(<CommentItem data={commentMock} />)

    const likeButton = screen.getAllByRole("button")[0]
    await userEvent.click(likeButton)

    expect(likeCommentMock).toHaveBeenCalledTimes(1)
    expect(likeCommentMock).toHaveBeenCalledWith("1")
  })

  it("calls dislikeComment when dislike button is clicked", async () => {
    render(<CommentItem data={commentMock} />)

    const dislikeButton = screen.getAllByRole("button")[1]
    await userEvent.click(dislikeButton)

    expect(dislikeCommentMock).toHaveBeenCalledTimes(1)
    expect(dislikeCommentMock).toHaveBeenCalledWith("1")
  })
})
