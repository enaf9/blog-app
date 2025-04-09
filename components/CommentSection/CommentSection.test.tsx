import "@testing-library/jest-dom"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import { Comments } from "@/types/Comment"

import { CommentSection } from "@/components/CommentSection"

const articleMock = jest.fn()
const addCommentMock = jest.fn()
const isFetchingMock = jest.fn()
const isAuthenticatedMock = jest.fn(() => true)

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

const mockArticle = {
  articleId: "1",
  title: "Article 1",
  perex: "Article 1 preview",
  createdAt: "2025-04-07T00:00:00Z",
  imageId: "image123",
  comments: commentsMock
}

jest.mock("../../hooks/articles/useGetArticle", () => ({
  useArticle: () => ({
    article: articleMock(),
    isFetching: isFetchingMock()
  })
}))

jest.mock("../../hooks/comments/useAddComment", () => ({
  useAddComment: () => ({
    addComment: addCommentMock
  })
}))

jest.mock("../../hooks/authentication/useAuthentication", () => ({
  useAuthentication: () => ({
    isAuthenticated: isAuthenticatedMock
  })
}))

jest.mock("../CommentList", () => ({
  CommentList: jest.fn(() => <div>Mocked CommentList</div>)
}))

describe("CommentSection", () => {
  it("renders CommentSection", () => {
    render(<CommentSection articleId="1" />)
  })

  it("renders article comments list", () => {
    articleMock.mockReturnValue(mockArticle)
    render(<CommentSection articleId="1" />)

    expect(screen.getByText("Mocked CommentList")).toBeInTheDocument()
  })

  it("renders comment form", () => {
    render(<CommentSection articleId="1" />)

    expect(screen.getByAltText("Profile Photo")).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("Join the discussion")
    ).toBeInTheDocument()
  })

  it("submits comment and calls addComment", async () => {
    render(<CommentSection articleId="1" />)

    const input = screen.getByPlaceholderText("Join the discussion")
    fireEvent.change(input, { target: { value: "This is a new comment" } })

    fireEvent.submit(screen.getByLabelText("form"))

    await waitFor(() => {
      expect(addCommentMock).toHaveBeenCalledTimes(1)
      expect(addCommentMock).toHaveBeenCalledWith({
        content: "This is a new comment",
        articleId: "1",
        author: "Jan Novak" // Hardcoded value
      })
    })
  })

  it("handles loading state when article is not available", () => {
    isFetchingMock.mockReturnValue(true)

    render(<CommentSection articleId="1" />)

    expect(screen.getByTestId("loading")).toBeInTheDocument()
  })

  it("should not render comment form if not authenticated", () => {
    isAuthenticatedMock.mockReturnValue(false)
    render(<CommentSection articleId="1" />)

    expect(screen.queryByAltText("Profile Photo")).not.toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("Join the discussion")
    ).not.toBeInTheDocument()
  })
})
