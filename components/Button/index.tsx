import { HTMLAttributes, PropsWithChildren } from "react"

import { twMerge } from "tailwind-merge"

type ButtonProps = {
  disabled?: boolean
  type?: "primary" | "secondary" | "danger"
} & HTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  disabled,
  type = "primary",
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={twMerge(
        "btn",
        disabled && "bg-slate-300 pointer-events-none",
        type === "secondary" &&
          "bg-slate-200 text-slate-900 hover:bg-slate-100",
        type === "danger" && "bg-red-600 hover:bg-red-500"
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
