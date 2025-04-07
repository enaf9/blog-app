import "@testing-library/jest-dom"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { NewArticleForm } from "@/components/NewArticleForm"

const uploadImageMock = jest.fn()
const createArticleMock = jest.fn()

global.URL.createObjectURL = () => "imagePath"

/* eslint-disable @next/next/no-img-element */
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  )
}))

jest.mock("../../hooks/images/useUploadImage", () => ({
  useUploadImage: () => ({
    uploadImage: uploadImageMock
  })
}))

jest.mock("../../hooks/articles/useCreateArticle", () => ({
  useCreateArticle: () => ({
    createArticle: createArticleMock
  })
}))

describe("NewArticleForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders NewArticleForm", () => {
    render(<NewArticleForm />)
  })

  it("renders the form correctly", () => {
    render(<NewArticleForm />)

    expect(screen.getByLabelText("Article title")).toBeInTheDocument()
    expect(screen.getByLabelText("Perex")).toBeInTheDocument()
    expect(screen.getByLabelText("Featured image")).toBeInTheDocument()
    expect(screen.getByLabelText("Content")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Publish Article" })
    ).toBeInTheDocument()
  })

  it("validates required fields", async () => {
    render(<NewArticleForm />)

    fireEvent.click(screen.getByRole("button", { name: "Publish Article" }))

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument()
      expect(screen.getByText("Perex is required")).toBeInTheDocument()
      expect(screen.getByText("Content is required")).toBeInTheDocument()
      expect(screen.getByText("Image is required")).toBeInTheDocument()
    })
  })

  it("submits the form with valid data", async () => {
    const mockImageInfo = { imageId: "123" }
    uploadImageMock.mockImplementation((file, { onSuccess }) =>
      onSuccess(mockImageInfo)
    )
    render(<NewArticleForm />)

    const titleInput = screen.getByLabelText(
      "Article title"
    ) as HTMLInputElement
    const perexInput = screen.getByLabelText("Perex") as HTMLTextAreaElement
    const fileInput = screen.getByLabelText(
      "Featured image"
    ) as HTMLInputElement
    const contentEditor = screen.getByLabelText(
      "Content"
    ) as HTMLTextAreaElement

    const file = new File(["dummy content"], "image.jpg", {
      type: "image/jpeg"
    })

    fireEvent.change(titleInput, { target: { value: "Test Article" } })
    fireEvent.change(perexInput, {
      target: { value: "This is a test article." }
    })
    fireEvent.change(contentEditor, {
      target: { value: "This is the article content." }
    })

    fireEvent.change(fileInput, { target: { files: [file] } })

    fireEvent.click(screen.getByRole("button", { name: "Publish Article" }))

    await waitFor(() => {
      expect(createArticleMock).toHaveBeenCalledWith({
        title: "Test Article",
        perex: "This is a test article.",
        content: "This is the article content.",
        imageId: "123"
      })
    })
  })

  it("calls uploadImage and createArticle on form submission with valid data", async () => {
    render(<NewArticleForm />)

    const mockImage = new File(["dummy content"], "image.jpg", {
      type: "image/jpeg"
    })
    const mockImageInfo = { imageId: "123" }
    uploadImageMock.mockImplementation((file, { onSuccess }) =>
      onSuccess(mockImageInfo)
    )

    await userEvent.type(screen.getByLabelText("Article title"), "Test Article")
    await userEvent.type(screen.getByLabelText("Perex"), "Test Perex")
    await userEvent.type(screen.getByLabelText("Content"), "Test content")
    fireEvent.change(screen.getByLabelText("Featured image"), {
      target: { files: [mockImage] }
    })

    fireEvent.click(screen.getByRole("button", { name: "Publish Article" }))

    await waitFor(() => {
      expect(uploadImageMock).toHaveBeenCalledTimes(1)
      expect(createArticleMock).toHaveBeenCalledTimes(1)
      expect(createArticleMock).toHaveBeenCalledWith({
        imageId: "123",
        title: "Test Article",
        perex: "Test Perex",
        content: "Test content"
      })
    })
  })
})
