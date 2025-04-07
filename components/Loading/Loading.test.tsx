import "@testing-library/jest-dom"

import { render } from "@testing-library/react"

import { Loading } from "@/components/Loading"

describe("Loading", () => {
  it("renders Loading", () => {
    render(<Loading />)
  })
})
