import { API } from "~/utils/config";
import Form from "../Form";
import { MdTour } from "react-icons/md";
import Link from "next/link";

export async function generateMetadata({ params: {id} }) {
  const tour = await getData(id)
  return {
    title: tour.home.name + ' | Checkout',
  }
}

const getData = async (id) => {
  const res = await fetch(`${API}/pages/${id}`)
  const data = await res.json()
  return data
}
async function Checkout({params: {id}}) {
  const tour = await getData(id)
  if(Object.keys(tour).length === 0) {
    return <div className="flex flex-col items-center justify-center h-[100vh]">
      <p className="mt-[5rem] text-[2rem] font-semibold">Page not found !!</p>
      <Link href={'/'} className="px-4 py-2 bg-yellow-500 rounded-md">Go back</Link>
    </div>
  }
  return (
    <div>
      <h2 className="text-center mt-[5rem] text-[2rem] font-semibold gap-2 flex items-center justify-center">Book Tour to {tour.home.name} <MdTour color="green"/></h2>
       <Form name={tour.home.name}/>
    </div>
  )
}

export default Checkout