import { InputHTMLAttributes } from "react"

type InputProps = {
  id: string
  label: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-sm font-medium text-emerald-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-slate-400 outline-none"
        placeholder={placeholder}
        {...rest}
      />
      <div className="mt-1 text-rose-700 text-sm">{error}</div>
    </div>
  )
}
