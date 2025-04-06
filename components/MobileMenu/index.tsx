import Image from "next/image"
import Link from "next/link"

import { XMarkIcon } from "@heroicons/react/24/outline"

import { NavMenu } from "../NavMenu"

type MobileMenuProps = {
  close: () => void
}

export const MobileMenu = ({ close }: MobileMenuProps) => {
  return (
    <div className="fixed top-0 left-0 flex h-full w-full flex-col bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/cat-icon.svg"
            alt="Cat blog logo"
            className="fill-emerald-600"
            width={28}
            height={28}
          />
        </Link>
        <button onClick={close} className="cursor-pointer">
          <XMarkIcon className="size-10.5" />
        </button>
      </div>

      <NavMenu className="mt-6" close={close} />
    </div>
  )
}
