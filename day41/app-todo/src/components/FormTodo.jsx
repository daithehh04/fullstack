import { useRef, useState } from "react"
import Button from "./Button"
import { client } from "../utils/client";
import { toast } from 'react-toastify';

function FormTodo({apiKey,setLoading,getTodos, onSearch}) {
  const [value,setValue] = useState()
  const [isSearch,setIsSearch] = useState(false)
  const refInput = useRef()
  const refSearch = useRef(null);

  async function addTodo() {
    setLoading(true)
    const {data,response} = await client.post('/todos', { todo:value, isCompleted:false }, apiKey);
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
    if (isSearch) {
      const value = e.target.value;
      if (refSearch.current) {
          clearTimeout(refSearch.current);
      }
      refSearch.current = setTimeout(() => {
        onSearch({q:value})
      }, 500)
    }
  }
  const handleClickSearch = () => {
    if(isSearch === false) {
      setLoading(true)
    }
    setTimeout(() => {
      toast.success(`Bạn đã chuyển sang chế độ tìm kiếm!`)
      setIsSearch(true)
      if(value) {
        onSearch({q:value})
      }
      setLoading(false)
    },1000)
  }
  return (
    <div className="flex">
      <form method="post" onSubmit={handleSubmit}>
        <input type="text" name="todo" placeholder="Thêm một việc làm mới" autoFocus="" onChange={handleChange} ref={refInput}/>
        <Button className="green">Thêm mới</Button>
      </form>
      <Button className="orange" onClick={handleClickSearch}>Tìm kiếm</Button>
    </div>
  )
}

export default FormTodo