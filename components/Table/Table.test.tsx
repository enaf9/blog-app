import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import { Table } from "@/components/Table"

type Article = {
  articleId: string
  title: string
  author: string
  createdAt: string
}

const columns = [
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "author",
    header: "Author"
  }
]

const tableData: Article[] = [
  {
    articleId: "1",
    title: "First Article",
    author: "Author 1",
    createdAt: "2021-01-01"
  },
  {
    articleId: "2",
    title: "Second Article",
    author: "Author 2",
    createdAt: "2021-02-01"
  }
]

describe("Table", () => {
  it("renders Table", () => {
    render(<Table columns={columns} tableData={tableData} />)
  })

  it("renders table with data", () => {
    render(<Table columns={columns} tableData={tableData} />)

    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Author")).toBeInTheDocument()

    expect(screen.getByText("First Article")).toBeInTheDocument()
    expect(screen.getByText("Author 1")).toBeInTheDocument()
    expect(screen.getByText("Second Article")).toBeInTheDocument()
    expect(screen.getByText("Author 2")).toBeInTheDocument()
  })

  it("renders table with no data", () => {
    render(<Table columns={columns} tableData={[]} />)

    expect(screen.queryByText("First Article")).not.toBeInTheDocument()
    expect(screen.queryByText("Second Article")).not.toBeInTheDocument()
    expect(screen.queryByText("There was no data found")).toBeInTheDocument()
  })

  it("renders table headers correctly", () => {
    render(<Table columns={columns} tableData={tableData} />)

    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Author")).toBeInTheDocument()
  })
})
