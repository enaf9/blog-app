import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import { MarkdownPreview } from "@/components/MarkdownPreview"

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

describe("MarkdownPreview", () => {
  it("renders MarkdownPreview", () => {
    render(<MarkdownPreview content="" />)
  })

  it("renders empty content correctly", () => {
    render(<MarkdownPreview content="" />)

    const previewContainer = screen.getByTestId("react-markdown")
    expect(previewContainer).toBeEmptyDOMElement()
  })

  it("renders Markdown content", () => {
    render(<MarkdownPreview content={markdownExample} />)

    const previewContainer = screen.getByTestId("react-markdown")
    expect(previewContainer.innerHTML).toContain(markdownExample)
  })
})
