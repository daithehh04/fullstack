import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function UserDetail() {
  const params = useParams()
  const [user, setUser] = useState(null)
  const getDetailUser = async () => {
    const response = await fetch(`http://localhost:3000/v1/users/${params.id}`)
    const data = await response.json()
    setUser(data.data)
  }
  useEffect(() => {
    getDetailUser()
  }, [])
  if (!user) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <h2>Thông tin chi tiết</h2>
      <p>name: {user?.name}</p>
      <p>email: {user?.email}</p>
      <p>phone: {user?.phone}</p>
      <p>address: {user?.address?.street}</p>
      <p>company: {user?.company?.name}</p>
      <p>website: {user?.website}</p>
      <p>
        <Link to={"/"}>Go back</Link>
      </p>
    </div>
  )
}

export default UserDetail
