import { useState } from "react"
import Button from "./Button"
import { client } from "../utils/client"
import { toast } from "react-toastify"

function TodoItem({apiKey, todo, setLoading, getTodos}) {
  let value = todo.todo
  const [isUpdate,setIsUpdate] = useState(false)
  const [valueUpdate,setValueUpdate] = useState()
  const [check,setCheck] = useState(false)
  const deleteTodos = async () => {
    setLoading(true)
    const { data, response } = await client.delete(`/todos/${todo._id}`, apiKey);
    setLoading(false)
    if(response.ok) {
      toast.success(`${data.message}`)
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("apiKey");
      window.location.reload();
    }
    setIsUpdate(false)
  }

  const updateTodos = async () => {
    setLoading(true)
    const { data, response } = await client.patch(`/todos/${todo._id}`,{todo:valueUpdate, isCompleted:check}, apiKey);
    console.log(data);
    console.log(response);
    setLoading(false)
    if(response.ok) {
      toast.success(`${data.message}`)
        getTodos(apiKey)
        value = valueUpdate
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("apiKey");
      window.location.reload();
    }
    setIsUpdate(false)
  }
  return (
    <>
      <input className={`${todo.isCompleted ? 'completed' : ""}`} type="text" defaultValue={value} readOnly={!isUpdate} onChange={(e) => setValueUpdate(e.target.value)}/>
      <div className="flex row">
       {isUpdate &&  <div className="flex complete">
          <label htmlFor="checkbox">Not Completed</label>
          <input type="checkbox" id="checkbox" defaultChecked={check} onClick={() => setCheck(!check)}/>
        </div>}
        <div className="flex">
          {isUpdate && <Button className="orange" onClick={() => setIsUpdate(false)}>Thoát</Button>}
          {!isUpdate && <Button className="green" onClick={() => setIsUpdate(true)}>Sửa</Button>}
          {isUpdate && <Button className="green" onClick={updateTodos}>Update</Button>}
          <Button className="red" onClick={deleteTodos}>Xóa</Button>
        </div>
      </div>
    </>
  )
}

export default TodoItem