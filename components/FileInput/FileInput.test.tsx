import "@testing-library/jest-dom"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import { FileInput } from "@/components/FileInput"

global.URL.createObjectURL = () => "imagePath"

describe("FileInput", () => {
  const mockOnFileChange = jest.fn()
  const mockOnFileDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders FileInput", () => {
    render(
      <FileInput
        onFileChange={mockOnFileChange}
        onFileDelete={mockOnFileDelete}
      />
    )
  })

  it("renders the file input with label", () => {
    render(
      <FileInput
        label="Upload Image"
        onFileChange={mockOnFileChange}
        onFileDelete={mockOnFileDelete}
      />
    )

    const label = screen.getByText("Upload Image")
    expect(label).toBeInTheDocument()

    const fileInput = screen.getByLabelText("Upload Image").closest("input")
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute("type", "file")
    expect(fileInput).toHaveAttribute("hidden")
  })

  it("should handle file selection and show preview", async () => {
    render(
      <FileInput
        label="Upload Image"
        onFileChange={mockOnFileChange}
        onFileDelete={mockOnFileDelete}
      />
    )

    const fileInput = screen
      .getByLabelText("Upload Image")
      .closest("input") as HTMLInputElement

    const file = new File(["dummy content"], "image.jpg", {
      type: "image/jpeg"
    })
    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => {
      expect(screen.getByAltText("Article image")).toBeInTheDocument()
    })

    expect(mockOnFileChange).toHaveBeenCalledWith(file)
  })

  it("should show error when file exceeds size limit", async () => {
    render(
      <FileInput
        label="Upload Image"
        onFileChange={mockOnFileChange}
        onFileDelete={mockOnFileDelete}
      />
    )

    const fileInput = screen
      .getByLabelText("Upload Image")
      .closest("input") as HTMLInputElement

    const largeFile = new File(
      [new ArrayBuffer(6 * 1024 * 1024)],
      "large-image.jpg",
      { type: "image/jpeg" }
    )
    fireEvent.change(fileInput, { target: { files: [largeFile] } })

    await waitFor(() => {
      expect(
        screen.getByText("File size exceeds the maximum limit of 5MB")
      ).toBeInTheDocument()
    })
  })

  it("should show error when invalid file type is selected", async () => {
    render(
      <FileInput
        label="Upload Image"
        onFileChange={mockOnFileChange}
        onFileDelete={mockOnFileDelete}
        accept="image/png"
      />
    )

    const fileInput = screen
      .getByLabelText("Upload Image")
      .closest("input") as HTMLInputElement

    const invalidFile = new File(["dummy content"], "invalid-image.jpg", {
      type: "image/jpeg"
    })
    fireEvent.change(fileInput, { target: { files: [invalidFile] } })

    await waitFor(() => {
      expect(
        screen.getByText("Invalid file type. Only image/png files are allowed.")
      ).toBeInTheDocument()
    })
  })

  it("should show file preview and allow to delete selection", async () => {
    render(
      <FileInput
        label="Upload Image"
        onFileChange={mockOnFileChange}
        onFileDelete={mockOnFileDelete}
      />
    )

    const fileInput = screen
      .getByLabelText("Upload Image")
      .closest("input") as HTMLInputElement

    const file = new File(["dummy content"], "image.jpg", {
      type: "image/jpeg"
    })
    fireEvent.change(fileInput, { target: { files: [file] } })

    await waitFor(() => {
      expect(screen.getByAltText("Article image")).toBeInTheDocument()
    })

    const deleteButton = screen.getByRole("button")
    fireEvent.click(deleteButton)

    expect(mockOnFileDelete).toHaveBeenCalled()
  })

  it("should handle drag and drop file selection", async () => {
    render(
      <FileInput
        label="Upload Image"
        onFileChange={mockOnFileChange}
        onFileDelete={mockOnFileDelete}
      />
    )

    const dropArea = screen.getByText("Drag & drop file here").closest("div")!

    fireEvent.dragOver(dropArea)
    expect(dropArea).toHaveClass("border-2")
    expect(dropArea).toHaveTextContent("Drop the file")

    const droppedFile = new File(["dummy content"], "image.jpg", {
      type: "image/jpeg"
    })
    fireEvent.drop(dropArea, { dataTransfer: { files: [droppedFile] } })

    await waitFor(() => {
      expect(screen.getByAltText("Article image")).toBeInTheDocument()
    })

    expect(mockOnFileChange).toHaveBeenCalledWith(droppedFile)
  })
})
