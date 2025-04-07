import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import { Article } from "@/types/Article"

import { ArticleItem } from "@/components/ArticleItem"

const mockArticle: Article = {
  articleId: "1",
  title: "Test Article",
  perex: "This is a preview of the article.",
  createdAt: "2025-04-07T00:00:00Z",
  lastUpdatedAt: "2025-04-07T00:00:00Z",
  imageId: "image123"
}

jest.mock("../../hooks/images/useGetImage", () => ({
  useImage: (imageId: string) => ({
    imageUrl: imageId !== "no-image" ? "imageUrl" : null
  })
}))

describe("ArticleItem", () => {
  it("renders ArticleItem", () => {
    render(<ArticleItem data={mockArticle} />)
  })

  it("should render article data correctly", async () => {
    render(<ArticleItem data={mockArticle} />)

    expect(screen.getByText("Test Article")).toBeInTheDocument()
    expect(
      screen.getByText("This is a preview of the article.")
    ).toBeInTheDocument()
    expect(screen.getByText("4/7/2025")).toBeInTheDocument()
  })

  it("should render image if imageUrl is available", async () => {
    render(<ArticleItem data={mockArticle} />)

    const image = screen.getByAltText("Article image")
    expect(image).toHaveAttribute("src", "imageUrl")
  })

  it("should render fallback if imageUrl is not available", async () => {
    render(<ArticleItem data={{ ...mockArticle, imageId: "no-image" }} />)

    const image = screen.queryByRole("img")
    expect(image).not.toBeInTheDocument()

    const fallback = screen.getAllByRole("link")[0].children[0]
    expect(fallback).toHaveClass("bg-slate-200")
  })
})
