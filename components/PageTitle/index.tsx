import { PropsWithChildren } from "react"

export const PageTitle = ({ children }: PropsWithChildren) => {
  return <h2 className="text-4xl font-semibold mb-6">{children}</h2>
}
