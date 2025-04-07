import "@testing-library/jest-dom"

import { PropsWithChildren } from "react"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"

import { MarkdownEditor } from "@/components/MarkdownEditor"

// Test wrapper component that uses useForm context for the test
const TestWrapper = ({
  children,
  initialValues,
}: PropsWithChildren<{ initialValues: { content: string } }>) => {
  const methods = useForm({ defaultValues: initialValues })

  return <FormProvider {...methods}>{children}</FormProvider>
}

jest.mock("../MarkdownPreview", () => ({
  MarkdownPreview: ({ content }: { content: string }) => (
    <div>
      <div>Preview</div>
      <div data-testid="preview">{content}</div>
    </div>
  ),
}))

describe("MarkdownEditor", () => {
  const renderMarkdownEditor = (initialValues = { content: "" }) => {
    return render(
      <TestWrapper initialValues={initialValues}>
        <MarkdownEditor />
      </TestWrapper>,
    )
  }

  it("renders MarkdownEditor", () => {
    renderMarkdownEditor()
  })

  it("render content correctly", () => {
    renderMarkdownEditor()

    const textArea = screen.getByLabelText("Content")
    expect(textArea).toBeInTheDocument()

    const markdownPreview = screen.getByText("Preview")
    expect(markdownPreview).toBeInTheDocument()
  })

  it("should update MarkdownPreview when TextArea content changes", async () => {
    renderMarkdownEditor()

    const textArea = screen.getByLabelText("Content") as HTMLTextAreaElement

    const markdownPreview = screen.getByTestId("preview")
    expect(markdownPreview?.textContent).toBe("")

    fireEvent.change(textArea, { target: { value: "This is Markdown!" } })

    await waitFor(() => {
      expect(markdownPreview.textContent).toBe("This is Markdown!")
    })
  })
})
