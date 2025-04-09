import "@testing-library/jest-dom"

import { render, screen, waitFor } from "@testing-library/react"

import { ArticleDetail } from "@/components/ArticleDetail"

const articleMock = jest.fn()
const articlesMock = jest.fn()
const isFetchingMock = jest.fn()

const mockArticle = {
  title: "Test Article",
  author: "Author Name",
  createdAt: "2025-04-01T00:00:00Z",
  content: "This is a test article content."
}

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

jest.mock("../../hooks/articles/useGetArticle", () => ({
  useArticle: () => ({
    article: articleMock(),
    articleImageUrl: "https://domain/img.jpg",
    isFetching: isFetchingMock()
  })
}))

jest.mock("../../hooks/articles/useGetArticles", () => ({
  useArticles: () => ({
    articles: articlesMock()
  })
}))

describe("ArticleDetail", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("renders ArticleDetail", () => {
    render(<ArticleDetail id="1" />)
  })

  it("should render loading state when data is fetching", () => {
    isFetchingMock.mockReturnValue(true)
    render(<ArticleDetail id="1" />)

    expect(screen.getByTestId("loading")).toBeInTheDocument()
  })

  it("render article details", async () => {
    articleMock.mockReturnValue(mockArticle)

    render(<ArticleDetail id="1" />)

    const date = new Date(mockArticle.createdAt)

    await waitFor(() => {
      expect(screen.getByText("Test Article")).toBeInTheDocument()
      expect(screen.getByText("Author Name")).toBeInTheDocument()
      expect(screen.getByText(date.toLocaleDateString())).toBeInTheDocument()
      expect(
        screen.getByText("This is a test article content.")
      ).toBeInTheDocument()
    })

    const image = screen.getByAltText("Article image")
    expect(image).toHaveAttribute("src", "https://domain/img.jpg")

    expect(screen.getByText("Related Articles")).toBeInTheDocument()
  })

  it("render related articles list correctly", async () => {
    articlesMock.mockReturnValue(mockArticles)
    render(<ArticleDetail id="1" />)

    await waitFor(() => {
      mockArticles.forEach(article => {
        expect(screen.getByText(article.title)).toBeInTheDocument()
      })
    })
  })
})
