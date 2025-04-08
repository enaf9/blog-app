import "@testing-library/jest-dom"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { ArticleForm } from "@/components/ArticleForm"

global.URL.createObjectURL = () => "imagePath"

const submitActionMock = jest.fn()

describe("ArticleForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders ArticleForm", () => {
    render(<ArticleForm submitAction={submitActionMock} />)
  })

  it("renders the form correctly", () => {
    render(<ArticleForm submitAction={submitActionMock} />)

    expect(screen.getByLabelText("Article title")).toBeInTheDocument()
    expect(screen.getByLabelText("Perex")).toBeInTheDocument()
    expect(screen.getByLabelText("Featured image")).toBeInTheDocument()
    expect(screen.getByLabelText("Content")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Publish Article" })
    ).toBeInTheDocument()
  })

  it("validates required fields", async () => {
    render(<ArticleForm submitAction={submitActionMock} />)

    fireEvent.click(screen.getByRole("button", { name: "Publish Article" }))

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument()
      expect(screen.getByText("Perex is required")).toBeInTheDocument()
      expect(screen.getByText("Content is required")).toBeInTheDocument()
      expect(screen.getByText("Image is required")).toBeInTheDocument()
    })
  })

  it("submits the form with valid data", async () => {
    jest.mock("@hookform/resolvers/zod")
    jest.mock("react-hook-form", () => ({
      useForm: ({}) => {
        return {
          register: jest.fn(),
          handleSubmit: jest.fn(fn => fn()),
          formState: { errors: [] }
        }
      }
    }))
    render(<ArticleForm submitAction={submitActionMock} />)

    await userEvent.type(screen.getByLabelText("Article title"), "Test Article")
    await userEvent.type(screen.getByLabelText("Perex"), "Test Perex")
    await userEvent.type(screen.getByLabelText("Content"), "Test content")

    const fileInput = screen.getByLabelText("Featured image")
    const file = new File(["image content"], "image.jpg", {
      type: "image/jpeg"
    })
    await userEvent.upload(fileInput, file)

    await userEvent.click(screen.getByText("Publish Article"))

    fireEvent.change(fileInput, { target: { files: [file] } })

    fireEvent.click(screen.getByRole("button", { name: "Publish Article" }))

    await waitFor(() => {
      expect(submitActionMock).toHaveBeenCalledWith(
        {
          image: file,
          title: "Test Article",
          perex: "Test Perex",
          content: "Test content"
        },
        expect.any(Object)
      )
    })
  })

  it("calls uploadImage and createArticle on form submission with valid data", async () => {
    render(<ArticleForm submitAction={submitActionMock} />)

    const file = new File(["dummy content"], "image.jpg", {
      type: "image/jpeg"
    })

    await userEvent.type(screen.getByLabelText("Article title"), "Test Article")
    await userEvent.type(screen.getByLabelText("Perex"), "Test Perex")
    await userEvent.type(screen.getByLabelText("Content"), "Test content")
    fireEvent.change(screen.getByLabelText("Featured image"), {
      target: { files: [file] }
    })

    fireEvent.click(screen.getByRole("button", { name: "Publish Article" }))

    await waitFor(() => {
      expect(submitActionMock).toHaveBeenCalledWith(
        {
          image: file,
          title: "Test Article",
          perex: "Test Perex",
          content: "Test content"
        },
        expect.any(Object)
      )
    })
  })
})
