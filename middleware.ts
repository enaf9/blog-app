import { NextRequest, NextResponse } from "next/server"

import { getCookie } from "./actions/actions"

export async function middleware(request: NextRequest) {
  const token = await getCookie("token")

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If token exists, continue processing the request
  return NextResponse.next()
}

export const config = {
  matcher: ["/new-article", "/my-articles", "/edit-article/:id*"] // Protect only these routes
}
