import "@testing-library/jest-dom"

import { fireEvent, render, screen } from "@testing-library/react"

import { Button } from "@/components/Button"

describe("Button", () => {
  it("renders Button", () => {
    render(<Button />)
  })

  it("renders with children", () => {
    render(<Button>Confirm</Button>)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent("Confirm")
  })

  it("handles passed onClick events", () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>Confirm</Button>)

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
