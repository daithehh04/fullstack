import { useState } from "react"
import Button from "./Button"
import { client } from "../utils/client";
import { toast, ToastContainer } from 'react-toastify';

function FormTodo({apiKey,setLoading,getTodos}) {
  const [value,setValue] = useState()
  async function addTodo() {
    setLoading(true)
    console.log(value);
    console.log(apiKey);
    const {data,response} = await client.post('/todos', {value}, apiKey);
    setLoading(false)
    return {data,response}
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!value || value.trim().length < 2) {
      toast.warn('Todo cần có ít nhất 2 kí tự!')
    } else {
      const {data,response} = await addTodo()
      if(response.ok) {
        setValue("")
        toast.success('Thêm thành công!')
        getTodos(apiKey)
      } else {
        toast.error(`${data.message}`)
      }
    }
  }
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input type="text" name="todo" placeholder="Thêm một việc làm mới" autoFocus="" onChange={handleChange}/>
        <Button className="green">Thêm mới</Button>
      </form>
      <ToastContainer />
    </>
  )
}

export default FormTodo