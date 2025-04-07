import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import { ArticleList } from "@/components/ArticleList"

const mockArticles = [
  {
    articleId: "1",
    title: "Article 1",
    perex: "Article 1 preview",
    createdAt: "2025-04-07T00:00:00Z",
    imageId: "image123"
  },
  {
    articleId: "2",
    title: "Article 2",
    perex: "Article 2 preview",
    createdAt: "2025-04-08T00:00:00Z",
    imageId: "image124"
  }
]
const articleMock = jest.fn()

jest.mock("../../hooks/articles/useGetArticles", () => ({
  useArticles: () => ({
    articles: articleMock()
  })
}))

jest.mock("../../hooks/images/useGetImage", () => ({
  useImage: () => ({
    imageUrl: "imageUrl"
  })
}))

describe("ArticleList", () => {
  it("renders ArticleList", () => {
    render(<ArticleList />)
  })

  it("should render articles when articles are available", async () => {
    articleMock.mockReturnValue(mockArticles)

    render(<ArticleList />)

    expect(screen.getByText("Article 1")).toBeInTheDocument()
    expect(screen.getByText("Article 2")).toBeInTheDocument()

    mockArticles.forEach(article => {
      expect(screen.getByText(article.title)).toBeInTheDocument()
    })
  })

  it("should display message when there are no articles", () => {
    articleMock.mockReturnValue([])
    render(<ArticleList />)

    expect(screen.getByText("No articles yet")).toBeInTheDocument()
  })
})
