import { useRef, useState } from "react"
import Button from "./Button"
import { client } from "../utils/client";
import { toast } from 'react-toastify';

function FormTodo({apiKey,setLoading,getTodos}) {
  const [value,setValue] = useState()
  const refInput = useRef()
  async function addTodo() {
    setLoading(true)
    const {data,response} = await client.post('/todos', { todo:value }, apiKey);
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
        toast.success('Thêm thành công!')
        getTodos(apiKey)
        refInput.current.value = ""
        refInput.current.focus()
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
        <input type="text" name="todo" placeholder="Thêm một việc làm mới" autoFocus="" onChange={handleChange} ref={refInput}/>
        <Button className="green">Thêm mới</Button>
      </form>
    </>
  )
}

export default FormTodo