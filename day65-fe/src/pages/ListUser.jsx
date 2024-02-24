import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function ListUser() {
  const [users, setUsers] = useState([])
  const getAllUsers = async () => {
    const response = await fetch(`https://day65.vercel.app/v1/users`)
    const data = await response.json()
    setUsers(data.data)
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  if (!users.length) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <h2>Danh sách user</h2>
      {users?.map((user) => (
        <div key={user?.id}>
          <Link to={`/user/${user.id}`}>{user?.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default ListUser
