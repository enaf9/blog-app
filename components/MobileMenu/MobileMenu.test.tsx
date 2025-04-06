import "@testing-library/jest-dom"

import { fireEvent, render, screen } from "@testing-library/react"

import { MobileMenu } from "@/components/MobileMenu"

const closeMock = jest.fn()

jest.mock("../NavMenu", () => ({
  NavMenu: jest.fn(() => <div>Mocked NavMenu</div>),
}))

describe("MobileMenu", () => {
  it("renders MobileMenu component", () => {
    render(<MobileMenu close={closeMock} />)
  })

  it("renders MobileMenu content", () => {
    render(<MobileMenu close={closeMock} />)

    expect(screen.getByAltText("Cat blog logo")).toBeInTheDocument()
    expect(screen.getByText("Mocked NavMenu")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("calls the close function when the close button is clicked", () => {
    const closeMock = jest.fn()

    render(<MobileMenu close={closeMock} />)

    const closeButton = screen.getByRole("button")
    fireEvent.click(closeButton)

    expect(closeMock).toHaveBeenCalledTimes(1)
  })

  it("displays the logo image with correct src and alt text", () => {
    const closeMock = jest.fn()

    render(<MobileMenu close={closeMock} />)

    const logo = screen.getByAltText("Cat blog logo")
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("src", "/cat-icon.svg")
  })
})
