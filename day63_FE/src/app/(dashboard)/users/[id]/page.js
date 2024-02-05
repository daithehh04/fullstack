import { getDetailUser } from "@/services/user.service"
import { Button, Input } from "@nextui-org/react"
import Link from "next/link"

async function UserDetail({ params }) {
  const { id } = params
  const userDetail = await getDetailUser(id)
  const user = userDetail.metadata
  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="w-1/2">
        <h2 className="mb-2 text-xl font-bold text-center">
          Thông tin chi tiết
        </h2>
        <Input
          isReadOnly
          type="text"
          label="Name"
          variant="bordered"
          defaultValue={user?.fullname}
        />
        <Input
          isReadOnly
          type="email"
          label="Email"
          variant="bordered"
          defaultValue={user?.email}
          className="w-full mt-2"
        />
        <Input
          isReadOnly
          type="text"
          label="Trạng thái"
          variant="bordered"
          defaultValue={user?.status ? "Kích hoạt" : "Chưa kích hoạt"}
          className="w-full mt-2"
        />
        <Input
          isReadOnly
          type="text"
          label="Đăng nhập bằng"
          variant="bordered"
          defaultValue={user?.provider || "Email"}
          className="w-full mt-2"
        />
        <Button color="danger" className="w-full mt-2" radius="sm" size="lg">
          <Link href={"/users"}>Quay lại</Link>
        </Button>
      </div>
    </div>
  )
}

export default UserDetail
