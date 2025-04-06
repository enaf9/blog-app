import "@testing-library/jest-dom"

import { fireEvent, render, screen } from "@testing-library/react"

import { Navbar } from "@/components/Navbar"

jest.mock("../NavMenu", () => ({
  NavMenu: jest.fn(() => <div>Mocked NavMenu</div>),
}))

jest.mock("../MobileMenu", () => ({
  MobileMenu: jest.fn(() => <div>Mocked MobileMenu</div>),
}))

describe("Navbar", () => {
  it("renders Navbar", () => {
    render(<Navbar />)
  })

  it("displays the logo image with correct src and alt text", () => {
    render(<Navbar />)

    const logo = screen.getByAltText("Cat blog logo")
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("src", "/cat-icon.svg")
  })

  it("open the mobile menu when the Hamburger icon is clicked", () => {
    render(<Navbar />)

    expect(screen.queryByText("Mocked MobileMenu")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByText("Mocked MobileMenu")).toBeInTheDocument()
  })
})
