import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import { Article } from "@/types/Article"

import { RelatedArticles } from "@/components/RelatedArticles"

const mockArticles = [
  { articleId: "1", title: "Article 1", perex: "Summary 1" },
  { articleId: "2", title: "Article 2", perex: "Summary 2" },
  { articleId: "3", title: "Article 3", perex: "Summary 3" },
  { articleId: "4", title: "Article 4", perex: "Summary 4" },
  { articleId: "5", title: "Article 5", perex: "Summary 5" },
  { articleId: "6", title: "Article 6", perex: "Summary 6" }
] as Article[]

describe("RelatedArticles", () => {
  it("renders RelatedArticles", () => {
    render(<RelatedArticles articles={[]} />)
  })

  it("render Loading component when isLoading is true", () => {
    render(<RelatedArticles articles={[]} isLoading={true} />)

    expect(screen.getByTestId("loading")).toBeInTheDocument()
  })

  it("render the related articles", () => {
    render(<RelatedArticles articles={mockArticles} />)

    expect(screen.getByText("Related Articles")).toBeInTheDocument()

    mockArticles.slice(0, 5).forEach(article => {
      expect(screen.getByText(article.title)).toBeInTheDocument()
    })

    mockArticles.slice(0, 5).forEach(article => {
      const link = screen.getByText(article.title).closest("a")
      expect(link).toHaveAttribute("href", `/articles/${article.articleId}`)
    })
  })

  it(" render a maximum of 5 related articles", () => {
    render(<RelatedArticles articles={mockArticles} isLoading={false} />)

    const articleTitles = screen.getAllByRole("link")
    expect(articleTitles).toHaveLength(5)
  })

  it("render no articles when the articles array is empty", () => {
    render(<RelatedArticles articles={[]} isLoading={false} />)

    expect(screen.queryByText("Related Articles")).toBeInTheDocument()
    expect(screen.queryByRole("link")).toBeNull()
  })
})
