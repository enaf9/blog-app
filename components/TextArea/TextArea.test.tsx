import "@testing-library/jest-dom"

import { fireEvent, render, screen } from "@testing-library/react"

import { TextArea } from "@/components/TextArea"

describe("TextArea", () => {
  it("renders TextArea", () => {
    render(<TextArea id="content" label="Content" />)
  })

  it("renders the label correctly", () => {
    render(<TextArea id="content" label="Content" />)

    const labelElement = screen.getByLabelText("Content")
    expect(labelElement).toBeInTheDocument()
  })

  it("renders the placeholder correctly", () => {
    render(
      <TextArea
        id="content"
        label="Content"
        placeholder="Content goes here!"
      />,
    )

    const textareaElement = screen.getByPlaceholderText("Content goes here!")
    expect(textareaElement).toBeInTheDocument()
  })

  it("renders correctly rows and cols", () => {
    render(<TextArea id="content" label="Content" rows={15} cols={35} />)

    const textareaElement = screen.getByRole("textbox")
    expect(textareaElement).toHaveAttribute("rows", "15")
    expect(textareaElement).toHaveAttribute("cols", "35")
  })

  it("renders with passed error message", () => {
    render(
      <TextArea id="content" label="Content" error="This field is required" />,
    )

    const errorMessage = screen.getByText("This field is required")
    expect(errorMessage).toBeInTheDocument()
  })

  it("display correct input value", () => {
    render(
      <TextArea
        id="content"
        label="Content"
        placeholder="Content goes here!"
      />,
    )

    const textareaElement = screen.getByPlaceholderText("Content goes here!")

    fireEvent.change(textareaElement, { target: { value: "My content" } })
    expect(textareaElement).toHaveValue("My content")
  })
})
