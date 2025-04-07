import { InputHTMLAttributes } from "react"

type TextAreaProps = {
  id: string
  label: string
  error?: string
  rows?: number
  cols?: number
} & InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = ({
  id,
  label,
  placeholder,
  error,
  rows,
  cols,
  ...rest
}: TextAreaProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-emerald-700 mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-slate-400 outline-none"
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        {...rest}
      />
      <div className="mt-1 text-rose-700 text-sm">{error}</div>
    </div>
  )
}
