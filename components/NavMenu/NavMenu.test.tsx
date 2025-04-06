import "@testing-library/jest-dom"

import { usePathname } from "next/navigation"

import { fireEvent, render, screen } from "@testing-library/react"

import { NavMenu } from "@/components/NavMenu"

jest.mock("next/navigation")

const TEST_MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Comments", href: "/comments" },
]

;(usePathname as jest.Mock).mockReturnValue("/")

describe("NavMenu", () => {
  it("renders NavMenu component", () => {
    render(<NavMenu isAuthenticated={false} />)
  })

  it("renders default menu items", () => {
    render(<NavMenu isAuthenticated={false} />)

    expect(screen.getByText("Recent articles")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeInTheDocument()
  })

  it("renders passed menu items as prop", () => {
    render(<NavMenu isAuthenticated={false} menuItems={TEST_MENU_ITEMS} />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Articles")).toBeInTheDocument()
    expect(screen.getByText("Comments")).toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeInTheDocument()
  })

  it("highlights the active link based on the pathname", () => {
    render(<NavMenu isAuthenticated={false} />)

    expect(screen.getByText("Recent articles").closest("li")).toHaveClass(
      "text-teal-600",
    )

    expect(screen.getByText("About").closest("li")).not.toHaveClass(
      "text-teal-600",
    )
  })

  it("calls the close function when a link is clicked", () => {
    const closeMock = jest.fn()

    render(<NavMenu isAuthenticated={false} close={closeMock} />)

    const link = screen.getByText("Recent articles")
    fireEvent.click(link)

    expect(closeMock).toHaveBeenCalledTimes(1)
  })

  it("display correct menu items if user is logged in", () => {
    const closeMock = jest.fn()

    render(<NavMenu isAuthenticated={true} close={closeMock} />)

    expect(screen.getByText("My articles")).toBeInTheDocument()
    expect(screen.getByText("Create article")).toBeInTheDocument()
    expect(screen.queryByText("Log in")).not.toBeInTheDocument()
  })
})
