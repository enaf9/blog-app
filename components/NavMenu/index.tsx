import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { twMerge } from "tailwind-merge"

const MENU_ITEMS = [
  { label: "Recent articles", href: "/" },
  { label: "About", href: "/about" },
]

const AUTHENTICATED_MENU_ITEMS = [
  { label: "My articles", href: "/my-articles" },
  { label: "Create article", href: "/new-article" },
]

type MenuItem = {
  label: string
  href: string
}

type NavMenuProps = {
  menuItems?: MenuItem[]
  className?: string
  close?: () => void
  isAuthenticated: boolean
}

export const NavMenu = ({
  menuItems = MENU_ITEMS,
  className,
  close,
  isAuthenticated,
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

      {isAuthenticated ? (
        <ul className="flex w-full flex-col  gap-5 font-medium sm:flex-row sm:gap-10 justify-end items-center">
          {AUTHENTICATED_MENU_ITEMS.map(menuItem => {
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
          <li>
            <div className="relative size-10.5">
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=5184&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile Photo"
                fill={true}
                priority={true}
                sizes="2.25rem"
                className="rounded-full object-cover object-center"
              />
            </div>
          </li>
        </ul>
      ) : (
        <Link
          href="/login"
          className="rounded-lg border border-slate-200 px-5 py-2 text-center font-medium whitespace-nowrap text-emerald-700 hover:text-emerald-800"
        >
          Log in
        </Link>
      )}
    </nav>
  )
}
