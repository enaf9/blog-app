"use client"

import { useState } from "react"
import Image from "next/image"

import { Bars3Icon } from "@heroicons/react/24/outline"

import { MobileMenu } from "../MobileMenu"
import { NavMenu } from "../NavMenu"

type NavbarProps = {
  isAuthenticated: boolean
}

export const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const [isMobileMenuOpen, setIseMobileMenuOpen] = useState(false)

  return (
    <div className="flex gap-2 p-4 shadow-lg">
      <div className="m-auto flex w-full max-w-6xl items-center gap-16 px-2 md:px-6">
        <Image
          src="/cat-icon.svg"
          alt="Cat blog logo"
          className="fill-emerald-600"
          width={28}
          height={28}
          priority={true}
        />

        <NavMenu className="hidden sm:flex" isAuthenticated={isAuthenticated} />

        <button
          onClick={() => setIseMobileMenuOpen(true)}
          className="ml-auto cursor-pointer sm:hidden"
        >
          <Bars3Icon className=" size-10.5" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu close={() => setIseMobileMenuOpen(false)} />
      )}
    </div>
  )
}
