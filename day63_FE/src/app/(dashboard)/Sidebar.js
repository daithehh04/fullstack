"use client"
import Cookies from "js-cookie"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaHome, FaUser } from "react-icons/fa"
import { AiFillProfile } from "react-icons/ai"
import { MdLogout } from "react-icons/md"

function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const handleLogout = () => {
    Cookies.remove("access_token", { path: "" })
    router.push("/signin")
  }
  return (
    <div className="flex flex-col w-[200px] bg-slate-800 text-white min-h-[100vh]">
      <Link
        href={"/"}
        className={`flex items-center gap-1 p-3 hover:bg-slate-900 ${
          pathname === "/" && "bg-slate-900"
        }`}
      >
        <FaHome />
        <span>Home</span>
      </Link>
      <Link
        href={"/profile"}
        className={`flex items-center gap-1 p-3 hover:bg-slate-900 ${
          pathname === "/profile" && "bg-slate-900"
        }`}
      >
        <AiFillProfile />
        <span>Profile</span>
      </Link>
      <Link
        href={"/users"}
        className={`flex items-center gap-1 p-3 hover:bg-slate-900 ${
          pathname === "/users" && "bg-slate-900"
        }`}
      >
        <FaUser />
        <span>Users</span>
      </Link>
      <button
        onClick={handleLogout}
        className={`flex items-center gap-1 p-3 hover:bg-slate-900`}
      >
        <MdLogout />
        <span>Logout</span>
      </button>
    </div>
  )
}

export default Sidebar
