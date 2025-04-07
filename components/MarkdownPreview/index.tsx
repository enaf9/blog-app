import ReactMarkdown from "react-markdown"
import remarkHtml from "remark-html"

type MarkdownPreviewProps = {
  content: string
}

export const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  return (
    <div className="flex flex-col ">
      <label className="block text-sm font-medium text-emerald-700 mb-2">
        Preview
      </label>
      <div className="prose p-6 border border-slate-200 rounded-lg max-h-[740px] h-full mb-6 overflow-scroll">
        <ReactMarkdown remarkPlugins={[remarkHtml]}>{content}</ReactMarkdown>
      </div>
    </div>
  )
}
