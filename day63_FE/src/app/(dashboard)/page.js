import { checkUser } from "@/utils/checkUser"

export default async function Home() {
  const infoUser = await checkUser()
  return (
    <main className="p-4">
      <h2 className="text-2xl font-semibold">
        Welcome {infoUser?.fullname} to dashboard
      </h2>
    </main>
  )
}
