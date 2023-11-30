import { Button } from "@nextui-org/react"
import Link from "next/link"

function NotFound() {
  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center">
      <div className="text-[4rem] font-semibold">Page Not Found !!!</div>
      <Button radius="sm" color="danger">
        <Link href={'/'} className="text-[1rem] font-medium">Go back</Link>
      </Button>
    </div>
  )
}

export default NotFound