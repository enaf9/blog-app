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
    render(<NavMenu />)
  })

  it("renders default menu items", () => {
    render(<NavMenu />)

    expect(screen.getByText("Recent articles")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeInTheDocument()
  })

  it("renders passed menu items as prop", () => {
    render(<NavMenu menuItems={TEST_MENU_ITEMS} />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Articles")).toBeInTheDocument()
    expect(screen.getByText("Comments")).toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeInTheDocument()
  })

  it("highlights the active link based on the pathname", () => {
    render(<NavMenu />)

    expect(screen.getByText("Recent articles").closest("li")).toHaveClass(
      "text-teal-600",
    )

    expect(screen.getByText("About").closest("li")).not.toHaveClass(
      "text-teal-600",
    )
  })

  it("calls the close function when a link is clicked", () => {
    const closeMock = jest.fn()

    render(<NavMenu close={closeMock} />)

    const link = screen.getByText("Recent articles")
    fireEvent.click(link)

    expect(closeMock).toHaveBeenCalledTimes(1)
  })
})
