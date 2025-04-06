import { HTMLAttributes, PropsWithChildren } from "react"

type ButtonProps = HTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className="bg-emerald-700 rounded-lg py-2 px-5 text-white text-center font-semibold whitespace-nowrap hover:bg-emerald-600"
      {...rest}
    >
      {children}
    </button>
  )
}
