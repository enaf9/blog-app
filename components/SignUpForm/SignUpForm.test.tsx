import "@testing-library/jest-dom"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SignUpForm } from "@/components/SignUpForm"

const signUpMock = jest.fn()

jest.mock("next/navigation")

jest.mock("../../hooks/tenants/useCreateTenant", () => ({
  useCreateTenant: () => ({
    createTenant: signUpMock
  })
}))

describe("SignUpForm", () => {
  it("renders SignUpForm", () => {
    render(<SignUpForm />)
  })

  it("renders the form elements", () => {
    render(<SignUpForm />)

    expect(screen.getByLabelText("Username")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument()
  })

  it("calls login function on submit with valid data", async () => {
    jest.mock("@hookform/resolvers/zod")
    jest.mock("react-hook-form", () => ({
      useForm: ({}) => ({
        register: jest.fn(),
        handleSubmit: jest.fn(),
        formState: { errors: [] }
      })
    }))

    render(<SignUpForm />)

    await userEvent.type(screen.getByLabelText("Username"), "testuser")
    await userEvent.type(screen.getByLabelText("Password"), "password123")

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }))

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalledTimes(1)
      expect(signUpMock).toHaveBeenCalledWith(
        {
          name: "testuser",
          password: "password123"
        },
        { onSuccess: expect.any(Function) }
      )
    })
  })

  it("shows error messages when form is submitted with empty values", async () => {
    render(<SignUpForm />)

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }))

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument()
      expect(screen.getByText("Password is required")).toBeInTheDocument()
    })
  })
})
