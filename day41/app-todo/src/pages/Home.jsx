import { useEffect, useState } from "react";
import { client } from "../utils/client";
import FormTodo from "../components/FormTodo";
import TodoItem from "../components/TodoItem";
import { toast, ToastContainer } from 'react-toastify';
import Loading from "../components/Loading";

function Home() {
  const [todos,setTodos] = useState([])
  const [loading,setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [valueSearch,setValueSearch] = useState({
    q:""
  })

  const getTodos = async (apiKey) => {
    setLoading(true)
    const { data, response } = await client.get('/todos',valueSearch, apiKey);
    setLoading(false)
    if(response.ok) {
      setTodos(data.data.listTodo)
    }
  };
  const getApiKey = async (userEmail) => {
    setLoading(true)
    const {data,response} = await client.get(`/api-key?email=${userEmail}`,{},apiKey)
    setLoading(false)
    return {data,response}
  }

  useEffect(() => {
    if (apiKey) {
      getTodos(apiKey);
    }
  },[valueSearch])

  useEffect(() => {
    if (!apiKey) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      const userEmail =
        localStorage.getItem("userEmail") ||
        window.prompt("Please enter your email:", "example@example.com");
      if(emailRegex.test(userEmail)) {
        if (userEmail) {
          getApiKey(userEmail).then((res) => {
            const {data,response} = res
            if(response.ok) {
              let apiKey = data.data.apiKey
              localStorage.setItem("apiKey", apiKey);
              localStorage.setItem("userEmail", userEmail);
              setApiKey(apiKey)
              getTodos(apiKey)
              toast.success(`Chào bạn ${userEmail.slice(0, userEmail.indexOf("@"))}!`)
            } else {
              toast.error(`${data.message}`)
              return setTimeout(() => window.location.reload(), 3000);
            }
          })
        }else {
          const userEmail = localStorage.getItem("userEmail");
          if (userEmail) {
            toast.success(`Chào mừng ${userEmail.slice(0, userEmail.indexOf("@"))} quay trở lại!`)
          } else {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("apiKey");
            window.location.reload();
          }
        }
      } else {
        toast.warn("Email không hợp lệ!!!")
        return setTimeout(() => window.location.reload(), 3000);
      }
    } 
  }, []);
 
  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Welcome to Todo App!</h1>
        <FormTodo apiKey={apiKey} setLoading={setLoading} getTodos={getTodos} onSearch={setValueSearch}/>
        <ul className="list-todo">
          {todos.length>0 ? (
            todos.map((todo,index) => (
              <li key={index*Math.random()}>
                <TodoItem 
                  apiKey={apiKey}
                  todo={todo}
                  setLoading={setLoading}
                  getTodos={getTodos}
                />
              </li>
            ))
          ) : (
            <li>Không có todo</li>
          )}
        </ul>
        <ToastContainer autoClose={3000}/>
      </div>
      {loading && <Loading/>}
    </div>
  )
}
export default Home