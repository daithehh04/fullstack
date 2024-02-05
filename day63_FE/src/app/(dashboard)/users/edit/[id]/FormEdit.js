"use client"
import { Button, Input } from "@nextui-org/react"
import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import { updateUser } from "@/services/user.service"
import Link from "next/link"

function FormEdit({ user }) {
  const [value, setValue] = useState(user.fullname)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await updateUser(user.id, { name: value })
    if (response.status === 200) {
      toast.success("Cập nhật tên thành công!")
    } else {
      toast.error("Đã có lỗi xảy ra!")
    }
  }
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-2/6"
      >
        <Input
          type="text"
          isRequired
          label="Name"
          variant="bordered"
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-start gap-2">
          <Button type="button" color="danger" className="mt-2" radius="sm">
            <Link href={"/users"}>Cancel</Link>
          </Button>
          <Button type="submit" color="primary" className="mt-2" radius="sm">
            Submit
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  )
}

export default FormEdit
