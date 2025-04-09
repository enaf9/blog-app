import "@testing-library/jest-dom"

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { NewArticleForm } from "@/components/NewArticleForm"

const uploadImageMock = jest.fn()
const createArticleMock = jest.fn()
const isPendingMock = jest.fn()
const pushMock = jest.fn()
const toastSuccessMock = jest.fn()

global.URL.createObjectURL = () => "imagePath"

jest.mock("../../hooks/images/useUploadImage", () => ({
  useUploadImage: () => ({
    uploadImage: uploadImageMock,
    isPending: isPendingMock()
  })
}))

jest.mock("../../hooks/articles/useCreateArticle", () => ({
  useCreateArticle: () => ({
    createArticle: createArticleMock
  })
}))

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock
  })
}))

jest.mock("sonner", () => ({
  toast: {
    success: (message: string) => toastSuccessMock(message)
  }
}))

describe("NewArticleForm", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("renders NewArticleForm", () => {
    render(<NewArticleForm />)
  })

  it("shows loading state when image is being uploaded", async () => {
    isPendingMock.mockReturnValue(true)

    render(<NewArticleForm />)

    await userEvent.type(screen.getByLabelText("Article title"), "Test Article")
    await userEvent.type(screen.getByLabelText("Perex"), "Test perex content")

    const fileInput = screen.getByLabelText("Featured image")
    const file = new File(["image content"], "image.jpg", {
      type: "image/jpeg"
    })
    await userEvent.upload(fileInput, file)

    expect(screen.getByText("Publish Article")).toBeDisabled()
  })

  it("renders the form and submits with valid data", async () => {
    jest.mock("@hookform/resolvers/zod")
    jest.mock("react-hook-form", () => ({
      useForm: ({}) => {
        return {
          register: jest.fn(),
          handleSubmit: jest.fn(submit => submit()),
          formState: { errors: [] }
        }
      }
    }))

    render(<NewArticleForm />)

    await userEvent.type(screen.getByLabelText("Article title"), "Test Article")
    await userEvent.type(screen.getByLabelText("Perex"), "Test perex content")
    await userEvent.type(
      screen.getByLabelText("Content"),
      "Test article content"
    )

    const fileInput = screen.getByLabelText("Featured image")
    const file = new File(["image content"], "image.jpg", {
      type: "image/jpeg"
    })
    await userEvent.upload(fileInput, file)

    await userEvent.click(screen.getByText("Publish Article"))

    await waitFor(() => {
      expect(uploadImageMock).toHaveBeenCalledWith(file, {
        onSuccess: expect.any(Function)
      })
    })

    // Simulate successful image upload
    uploadImageMock.mock.calls[0][1].onSuccess([{ imageId: "123" }])

    await waitFor(() => {
      expect(createArticleMock).toHaveBeenCalledWith(
        {
          imageId: "123",
          title: "Test Article",
          perex: "Test perex content",
          content: expect.any(String)
        },
        {
          onSuccess: expect.any(Function)
        }
      )
    })

    // Simulate successful article creation
    createArticleMock.mock.calls[0][1].onSuccess()

    expect(pushMock).toHaveBeenCalledWith("/")
    expect(toastSuccessMock).toHaveBeenCalledWith(
      "Your article was successfully added!"
    )
  })
})
