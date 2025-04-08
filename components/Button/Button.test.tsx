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

  it("renders primary button with default styles", () => {
    render(<Button>Primary Button</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("Primary Button")

    expect(button).toHaveClass("btn")
    expect(button).not.toHaveClass("bg-slate-200")
    expect(button).not.toHaveClass("bg-red-600")
  })

  it("renders secondary button with correct styles", () => {
    render(<Button type="secondary">Secondary Button</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("Secondary Button")

    expect(button).toHaveClass("bg-slate-200")
    expect(button).toHaveClass("text-slate-900")
    expect(button).not.toHaveClass("bg-red-600")
  })

  it("renders danger button with correct styles", () => {
    render(<Button type="danger">Danger Button</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("Danger Button")

    expect(button).toHaveClass("bg-red-600")
    expect(button).not.toHaveClass("bg-slate-200")
  })

  it("renders disabled button with correct styles", () => {
    const handleClickMock = jest.fn()
    render(
      <Button disabled onClick={handleClickMock}>
        Disabled Button
      </Button>
    )

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("Disabled Button")

    expect(button).toHaveClass("bg-slate-300")
    expect(button).toHaveClass("pointer-events-none")

    fireEvent.click(button)
    expect(handleClickMock).not.toHaveBeenCalled()

    expect(button).toBeDisabled()
  })

  it("handles passed onClick events", () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>Confirm</Button>)

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
