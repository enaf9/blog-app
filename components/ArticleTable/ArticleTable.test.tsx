import "@testing-library/jest-dom"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import { ArticleTable } from "@/components/ArticleTable"

const mockArticles = [
  {
    articleId: "1",
    title: "Article 1",
    perex: "Article 1 preview",
    author: "Author 1"
  },
  {
    articleId: "2",
    title: "Article 2",
    perex: "Article 2 preview",
    author: "Author 2"
  }
]

const articleMock = jest.fn()
const deleteArticleMock = jest.fn()

jest.mock("../../hooks/articles/useGetArticles", () => ({
  useArticles: () => ({
    articles: articleMock()
  })
}))

jest.mock("../../hooks/articles/useDeleteArticle", () => ({
  useDeleteArticle: () => ({
    deleteArticle: deleteArticleMock
  })
}))

describe("ArticleTable", () => {
  it("renders ArticleTable", () => {
    render(<ArticleTable />)
  })

  it("renders table with articles", () => {
    articleMock.mockReturnValue(mockArticles)
    render(<ArticleTable />)

    expect(screen.getByText("Article Title")).toBeInTheDocument()
    expect(screen.getByText("Perex")).toBeInTheDocument()
    expect(screen.getByText("Author")).toBeInTheDocument()

    expect(screen.getByText("Article 1")).toBeInTheDocument()
    expect(screen.getByText("Article 2")).toBeInTheDocument()
    expect(screen.getByText("Article 1 preview")).toBeInTheDocument()
    expect(screen.getByText("Article 1 preview")).toBeInTheDocument()
    expect(screen.getByText("Article 2")).toBeInTheDocument()
    expect(screen.getByText("Author 1")).toBeInTheDocument()
    expect(screen.getByText("Author 2")).toBeInTheDocument()
  })

  it("opens delete modal when delete button is clicked", () => {
    render(<ArticleTable />)

    const deleteButton = screen.getAllByRole("button")[1]

    fireEvent.click(deleteButton)

    expect(
      screen.getByText("Do you really want to delete this article?")
    ).toBeInTheDocument()

    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()
  })

  it("closes delete modal when cancel button is clicked", () => {
    render(<ArticleTable />)

    const deleteButton = screen.getAllByRole("button")[1]
    fireEvent.click(deleteButton)

    const cancelButton = screen.getByText("Cancel")
    fireEvent.click(cancelButton)

    expect(
      screen.queryByText("Do you really want to delete this article?")
    ).not.toBeInTheDocument()
  })

  it("deletes article when delete button in modal is clicked", async () => {
    render(<ArticleTable />)

    const deleteButton = screen.getAllByRole("button")[0]
    fireEvent.click(deleteButton)

    const deleteModalButton = screen.getByText("Delete")
    fireEvent.click(deleteModalButton)

    await waitFor(() => expect(deleteArticleMock).toHaveBeenCalledWith("1"))
  })
})
