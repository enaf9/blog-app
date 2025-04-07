import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import { PageTitle } from "@/components/PageTitle"

describe("PageTitle", () => {
  it("renders PageTitle", () => {
    render(<PageTitle />)
  })

  it("renders children text correctly", () => {
    render(<PageTitle>This is Title</PageTitle>)

    const pageTitleElement = screen.getByText("This is Title")

    expect(pageTitleElement.tagName).toBe("H2")
    expect(pageTitleElement).toBeInTheDocument()
  })
})
