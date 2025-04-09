import "@testing-library/jest-dom"

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { EditArticleForm } from "@/components/EditArticleForm"

const uploadImageMock = jest.fn()
const updateArticleMock = jest.fn()
const articleMock = jest.fn()

global.URL.createObjectURL = () => "https://domain/img.jpg"

jest.mock("../../hooks/images/useUploadImage", () => ({
  useUploadImage: () => ({
    uploadImage: uploadImageMock
  })
}))

jest.mock("../../hooks/articles/useUpdateArticle", () => ({
  useUpdateArticle: () => ({
    updateArticle: updateArticleMock
  })
}))

jest.mock("../../hooks/articles/useGetArticle", () => ({
  useArticle: () => ({
    article: articleMock(),
    articleImage: new File(["content"], "image.jpg", { type: "image/jpeg" })
  })
}))

describe("EditArticleForm", () => {
  it("renders EditArticleForm", () => {
    render(<EditArticleForm id="1" />)
  })

  it("displays article details", () => {
    articleMock.mockReturnValue({
      title: "Test Title",
      perex: "Test Perex",
      content: "Test Content",
      imageId: "123"
    })
    render(<EditArticleForm id="1" />)

    const titleInput = screen.getByLabelText(
      "Article title"
    ) as HTMLInputElement
    const perexInput = screen.getByLabelText("Perex") as HTMLInputElement
    const imagePreview = screen.getByAltText(
      "Article image"
    ) as HTMLImageElement
    const contentInput = screen.getByLabelText("Content") as HTMLInputElement

    expect(titleInput).toBeInTheDocument()
    expect(perexInput).toBeInTheDocument()
    expect(imagePreview).toBeInTheDocument()
    expect(contentInput).toBeInTheDocument()

    expect(titleInput.value).toBe("Test Title")
    expect(perexInput.value).toBe("Test Perex")
    expect(contentInput.value).toBe("Test Content")
    expect(imagePreview.src).toBe("https://domain/img.jpg")
  })

  it("should call the updateArticle function on submit", async () => {
    articleMock.mockReturnValue({
      title: "Test Title",
      perex: "Test Perex",
      content: "Test Content",
      imageId: "123"
    })
    render(<EditArticleForm id="1" />)

    await userEvent.type(
      screen.getByLabelText("Article title"),
      " - updated title"
    )
    await userEvent.type(screen.getByLabelText("Perex"), " - updated perex")
    await userEvent.type(screen.getByLabelText("Content"), " - updated content")

    const file = new File(["image content"], "image.jpg", {
      type: "image/jpeg"
    })
    await userEvent.upload(screen.getByLabelText("Featured image"), file)

    await userEvent.click(screen.getByText("Publish Article"))

    // Simulate successful image upload
    uploadImageMock.mock.calls[0][1].onSuccess([{ imageId: "123" }])

    await waitFor(() => {
      expect(updateArticleMock).toHaveBeenCalledWith({
        id: "1",
        data: {
          imageId: "123",
          title: "Test Title - updated title",
          perex: "Test Perex - updated perex",
          content: "Test Content - updated content"
        }
      })
    })
  })
})
