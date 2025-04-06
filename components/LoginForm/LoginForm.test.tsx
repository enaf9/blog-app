import "@testing-library/jest-dom"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { LoginForm } from "@/components/LoginForm"

const loginMock = jest.fn()

jest.mock("../../hooks/useLogin", () => ({
  useLogin: () => ({
    login: loginMock,
  }),
}))

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders LoginForm", () => {
    render(<LoginForm />)
  })

  it("renders the form elements", () => {
    render(<LoginForm />)

    expect(screen.getByLabelText("Username")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument()
  })

  it("calls login function on submit with valid data", async () => {
    jest.mock("@hookform/resolvers/zod")
    jest.mock("react-hook-form", () => ({
      useForm: ({}) => ({
        register: jest.fn(),
        handleSubmit: jest.fn(),
        formState: { errors: [] },
      }),
    }))

    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText("Username"), "testuser")
    await userEvent.type(screen.getByLabelText("Password"), "password123")

    fireEvent.click(screen.getByRole("button", { name: "Log in" }))

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledTimes(1)
      expect(loginMock).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      })
    })
  })

  it("shows error messages when form is submitted with empty values", async () => {
    render(<LoginForm />)

    fireEvent.click(screen.getByRole("button", { name: "Log in" }))

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument()
      expect(screen.getByText("Password is required")).toBeInTheDocument()
    })
  })
})
