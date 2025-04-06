import "@testing-library/jest-dom"

import { fireEvent, render, screen } from "@testing-library/react"

import { InputField } from "@/components/InputField"

describe("InputField", () => {
  it("renders InputField", () => {
    render(<InputField id="username" label="Username" />)
  })

  it("renders label and input correctly", () => {
    render(
      <InputField
        id="username"
        label="Username"
        placeholder="Enter your username"
      />,
    )

    const label = screen.getByLabelText("Username")
    expect(label).toBeInTheDocument()

    const input = screen.getByPlaceholderText("Enter your username")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("placeholder", "Enter your username")
  })

  it("displays error message", () => {
    render(
      <InputField
        id="username"
        label="Username"
        error="Username is required"
      />,
    )

    const errorMessage = screen.getByText("Username is required")
    expect(errorMessage).toBeInTheDocument()

    expect(errorMessage).toHaveClass("text-rose-700")
  })

  it("displays correct value", async () => {
    const handleChangeMock = jest.fn()
    render(
      <InputField
        id="username"
        label="Username"
        placeholder="Enter your username"
        value="Daniel"
        onChange={handleChangeMock}
      />,
    )

    const input = screen.getByPlaceholderText("Enter your username")

    expect(input).toHaveValue("Daniel")

    fireEvent.change(input, { target: { value: "" } })
    expect(handleChangeMock).toHaveBeenCalledTimes(1)
  })
})
