"use client"
import { Input } from "@nextui-org/react"
import { useEffect, useRef, useState } from "react"
import { API } from "~/utils/config"
import _ from "lodash"
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link"
import { usePathname } from "next/navigation"

function Search() {
  const paramsRef = useRef({ q: '' });
  const [value, setValue] = useState('');
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    setValue('')
  },[pathname])
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSearch = _.debounce(async () => {
    setLoading(true);
    if (paramsRef.current.q !== '') {
      const url = new URLSearchParams(paramsRef.current).toString();
      try {
        const res = await fetch(`${API}/pages?${url}`);
        const data = await res.json();
        setData(data);
      } finally {
        setLoading(false);
      }
    } else {
      setData([]);
      setLoading(false); 
    }
  }, 500);
  useEffect(() => {
    paramsRef.current.q = value;
    handleSearch()
  },[value])
  return (
    <div className="relative flex flex-col ml-auto mr-8 w-[300px]">
      <div className="relative flex">
        <Input variant={"bordered"} size="sm" placeholder="Search..." value={value} onChange={handleChange}
        startContent={
          <IoSearchOutline fontSize={'1.6rem'}/>
        }
        />
      
      </div>
      <div className="absolute w-full top-[3.5rem] bg-primary" style={{boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px;'}}>
      {loading && <p className="w-full p-3">Loading...</p>}
      {!loading && <ul>
        {!!data?.length && data?.map((item,index) => (
          <li key={index} className="px-3 mb-1 cursor-pointer hover:text-success">
            <Link href={`/tour/${item.id}`}>{item.home.name + ' - ' + item.home.content}</Link>
          </li>
        ))}
      </ul>}
      </div>
    </div>
  )
}

export default Search