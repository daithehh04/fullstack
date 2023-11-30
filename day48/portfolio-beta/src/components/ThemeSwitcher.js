"use client";
import { MoonIcon } from "@/icons/MoonIcon";
import { SunIcon } from "@/icons/SunIcon";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme('light')

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <>
      {theme === 'light' && <button onClick={() => setTheme('dark')}><MoonIcon className='w-[1.75rem] h-[1.75rem]'/></button>}
      {theme === 'dark' && <button onClick={() => setTheme('light')}><SunIcon className='w-[1.75rem] h-[1.75rem]'/></button>}
    </>
  )
};