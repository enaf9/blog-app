import { HTMLAttributes, PropsWithChildren } from "react"

import { twMerge } from "tailwind-merge"

type ButtonProps = { disabled: boolean } & HTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={twMerge(
        "bg-emerald-700 rounded-lg py-2 px-5 text-white text-center font-semibold whitespace-nowrap hover:bg-emerald-600",
        disabled && "bg-slate-300 pointer-events-none"
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
