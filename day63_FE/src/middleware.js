import { NextResponse } from "next/server"
import { checkUser } from "./utils/checkUser"

export async function middleware(request) {
  const infoUser = await checkUser()
  if (!infoUser?.id) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
}
export const config = {
  matcher: ["/", "/users/:path*"],
}
