"use client"
import React, { useState } from 'react'
import emailjs from "@emailjs/browser";
import {Button, Input} from "@nextui-org/react";
import { MdTour } from "react-icons/md";
import toast from 'react-hot-toast';
import Loading from '~/components/Loading';
const serviceId = 'service_99is4ha'
const templateId = 'template_1d7wjns'
const apiKeys = 'IaWDIrvrUuKL9vdF2'
function Form({name}) {
  const [loading, setLoading] = useState(false);
  const [form,setForm] = useState({
    name:'',
    email:'',
    phone:'',
    date:''
  })
  const handleChange = (e) => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value
      
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs
      .sendForm(
        serviceId,
        templateId,
        e.target,
        apiKeys
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          toast.success('Send form success!')
          setForm({
            name:'',
            email:'',
            phone:'',
            date:''
          })
          setLoading(false)
        },
        (err) => {
          console.log('FAILED...', err);
          toast.error("This didn't work.")
          setLoading(false)
        }
      );
  }
  return (
    <div className='mx-auto bg-primary w-max p-[2rem]'>
      <h2 className="text-center text-[2rem] font-semibold gap-2 flex items-center justify-center text-yellow-500">Book Tour to {name} <MdTour color="green"/></h2>
       <form action="" onSubmit={handleSubmit} className='w-[400px] mx-auto pt-[2rem] flex flex-col gap-[1rem] relative z-[4]'>
      <Input
        isReadOnly
        type="text"
        label="Destination"
        variant="bordered"
        defaultValue={name}
        className="w-full"
      />
      <Input type="text" onChange={handleChange} value={form.name} variant={"bordered"} name='name' label="Name" placeholder="Enter your name" isRequired/>
      <Input type="email" onChange={handleChange} value={form.email} variant={"bordered"} name='email' label="Email" placeholder="Enter your email" isRequired/>
      <Input type="text" onChange={handleChange} value={form.phone} variant={"bordered"} name='phone' label="Phone" placeholder="Enter your phone" isRequired/>
      <Input type="date" onChange={handleChange} value={form.date} variant={"bordered"} name='date'/>
      <Button type='submit' radius='sm' size='lg'>Submit</Button>
       </form> 
       {loading && <Loading/>}
    </div>
    
  )
}

export default Form