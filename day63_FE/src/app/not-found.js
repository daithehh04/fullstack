import Link from "next/link"

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-full">
      <p className="mt-[4rem] text-[2rem] font-semibold">Page not found !!</p>
      <Link
        href={"/"}
        className="px-4 py-2 font-semibold bg-yellow-500 rounded-md"
      >
        Go back
      </Link>
    </div>
  )
}

export default NotFound
