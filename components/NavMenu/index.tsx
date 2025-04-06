import Link from "next/link"
import { usePathname } from "next/navigation"

import { twMerge } from "tailwind-merge"

const MENU_ITEMS = [
  { label: "Recent articles", href: "/" },
  { label: "About", href: "/about" },
]

type MenuItem = {
  label: string
  href: string
}

type NavMenuProps = {
  menuItems?: MenuItem[]
  className?: string
  close?: () => void
}

export const NavMenu = ({
  menuItems = MENU_ITEMS,
  className,
  close,
}: NavMenuProps) => {
  const pathname = usePathname()

  return (
    <nav
      className={twMerge(
        "grid h-full w-full content-between items-center",
        className,
      )}
    >
      <ul className="flex w-full flex-col  gap-5 font-medium sm:flex-row sm:gap-10">
        {menuItems.map(menuItem => {
          const { label, href } = menuItem

          const isActive = pathname === href
          return (
            <li
              key={`${label}_${href}`}
              className={twMerge("", isActive && "text-teal-600")}
            >
              <Link href={href} onClick={() => close?.()}>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link
        href="/login"
        className="rounded-lg border border-slate-200 px-5 py-2 text-center font-medium whitespace-nowrap text-emerald-700 hover:text-emerald-800"
      >
        Log in
      </Link>
    </nav>
  )
}
