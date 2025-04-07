import { PropsWithChildren } from "react"

function ReactMarkdownMock({ children }: PropsWithChildren) {
  return <div data-testid="react-markdown">{children}</div>
}

export default ReactMarkdownMock
