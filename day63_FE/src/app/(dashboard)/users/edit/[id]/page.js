import { getDetailUser } from "@/services/user.service"
import FormEdit from "./FormEdit"

async function EditUser({ params }) {
  const { id } = params
  const userDetail = await getDetailUser(id)
  const user = userDetail.metadata
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4">
      <h2 className="text-xl font-bold">Cập nhật thông tin</h2>
      <FormEdit user={user} />
    </div>
  )
}

export default EditUser
