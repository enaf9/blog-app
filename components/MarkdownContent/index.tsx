import { PropsWithChildren } from "react"

import ReactMarkdown from "react-markdown"
import remarkHtml from "remark-html"

export const MarkdownContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-full">
      <ReactMarkdown remarkPlugins={[remarkHtml]}>
        {children as string}
      </ReactMarkdown>
    </div>
  )
}
