"use client";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import LoginBtn from "./LoginBtn";

function Header() {
  const pathname = usePathname();
  return (
    <div className="flex h-[5rem] py-3 shadow-lg px-[5%] fixed w-full top-0 bg-primary items-center z-10">
      <ul className="flex gap-[2rem] items-center">
        <li className="nav-link">
          <Link href={"/"} className={`${pathname === "/" && "active"}`}>
            Trang chủ
          </Link>
        </li>
        <li className="nav-link">
          <Link
            href={"/gallery"}
            className={`${pathname === "/gallery" && "active"}`}
          >
            Thư viện
          </Link>
        </li>
      </ul>
      {/* <Search/> */}
      <LoginBtn />
      <ThemeSwitcher />
    </div>
  );
}

export default Header;
