import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import { Comments } from "@/types/Comment"

import { CommentList } from "@/components/CommentList"

const commentsMock: Comments = [
  {
    articleId: "1",
    commentId: "1",
    author: "Jan Novak",
    content: "This is a sample comment.",
    postedAt: "2025-04-01T10:00:00Z",
    score: 3
  },
  {
    articleId: "1",
    commentId: "2",
    author: "Jan Novak",
    content: "This is a sample comment.",
    postedAt: "2025-04-01T10:00:00Z",
    score: 3
  }
]

jest.mock("../CommentItem", () => ({
  CommentItem: jest.fn(() => <div>Mocked CommentItem</div>)
}))

describe("CommentList", () => {
  it("renders CommentList", () => {
    render(<CommentList comments={commentsMock} />)
  })

  it("renders a list of comments", () => {
    render(<CommentList comments={commentsMock} />)

    expect(screen.getAllByText("Mocked CommentItem").length).toBe(
      commentsMock.length
    )
  })

  it('shows "No comments yet" when there are no comments', () => {
    render(<CommentList comments={[]} />)

    expect(screen.getByText("No comments yet")).toBeInTheDocument()
  })
})
