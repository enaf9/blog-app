import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import { MarkdownContent } from "@/components/MarkdownContent"

const markdownExample = `## Markdown Example
  This is a simple example of **Markdown** rendering.
  
  ## Features
  
  - Lists
  - Code blocks
  - [Links](https://www.example.com)
  
  \`\`\`javascript
  console.log('Hello, world!');
  \`\`\`
    `

describe("MarkdownContent", () => {
  it("renders MarkdownContent", () => {
    render(<MarkdownContent />)
  })

  it("renders empty content correctly", () => {
    render(<MarkdownContent />)

    const previewContainer = screen.getByTestId("react-markdown")
    expect(previewContainer).toBeEmptyDOMElement()
  })

  it("renders Markdown content", () => {
    render(<MarkdownContent>{markdownExample}</MarkdownContent>)

    const previewContainer = screen.getByTestId("react-markdown")
    expect(previewContainer.innerHTML).toContain(markdownExample)
  })
})
