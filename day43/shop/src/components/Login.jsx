import React, { useState } from 'react'
import { toast } from 'react-toastify'
import getApiKey from '../api/getApiKey'

function Login({setLoading,setApiKey}) {
  const [value,setValue] = useState("")
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (emailRegex.test(value)) {
      getApiKey(value).then((res) => {
        if (res.code === 200) {
          const apiKey = res.data.apiKey
          toast.success("Chào bạn " + value.slice(0, value.indexOf("@")));
          setApiKey(apiKey)
          localStorage.setItem("apiKey", apiKey);
          localStorage.setItem("email", value);
        } else {
          toast.error(`${res.message}`);
          localStorage.removeItem("apiKey");
          localStorage.removeItem("email");
        }
        setLoading(false)
      });
    } else {
      toast.warn("Vui lòng nhập đúng định dạng Email!");
    }
    
  }
  return (
    <div className='login'>
      <form method='post' className='form-login' onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" required id='email' placeholder='example@gmail.com' onChange={(e) => setValue(e.target.value)}/>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Login