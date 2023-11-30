"use client"
import Link from "next/link"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { useEffect } from "react";
function Header({lang}) {
  useEffect(() => {
    localStorage.setItem('lang',lang)
  },[lang])
  return (
    <header className="fixed top-0 z-10 w-full shadow-lg bg-primary">
      <div className="flex items-center py-[1rem] wide">
        {/* logo */}
        <h1>
          <Link href={`/`} className="w-[3rem] h-[3rem] text-[1.2rem] grid place-items-center rounded-[8px] bg-danger text-white">T</Link>
        </h1>
        {/* dark mode */}
        <div className="ml-auto">
          <ThemeSwitcher/>
        </div>
        {/* lang */}
        <div className="flex gap-1 ml-[1rem]">
          <Link href={'/vi'} className={`lang ${lang === 'vi' && 'active'}`}>VI</Link>
          <span>|</span>
          <Link href={'/en'} className={`lang ${lang === 'en' && 'active'}`}>EN</Link>
        </div>
      </div>
    </header>
    
  )
}

export default Header