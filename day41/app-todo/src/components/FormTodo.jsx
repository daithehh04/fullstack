import { useState } from "react"
import Button from "./Button"
import { client } from "../utils/client";
import { toast, ToastContainer } from 'react-toastify';

function FormTodo({apiKey,setLoading,getTodos}) {
  const [value,setValue] = useState()
  function addTodo() {
    return client.post('/todos', {value}, apiKey);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!value || value.trim().length < 2) {
      toast.warn('Todo cần có ít nhất 2 kí tự!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    } else {
      setLoading(true)
      const {data,response} = await addTodo()
      setLoading(false)
      if(response.ok) {
        setValue("")
        toast.success('Thêm thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
          getTodos(apiKey)
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