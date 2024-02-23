"use client"
import { useSession } from "next-auth/react"

export default function Home() {
  // const infoUser = await checkUser()
  const { data: session, status } = useSession()
  console.log("status::", status)
  return (
    <main className="p-4">
      <h2 className="text-2xl font-semibold">Welcome to dashboard</h2>
    </main>
  )
}
