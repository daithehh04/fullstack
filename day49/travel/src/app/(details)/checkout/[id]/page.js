import { API } from "~/utils/config";
import Form from "../Form";
import { MdTour } from "react-icons/md";

const getData = async (id) => {
  const res = await fetch(`${API}/pages/${id}`)
  const data = await res.json()
  return data
}
async function Checkout({params: {id}}) {
  const tour = await getData(id)
  return (
    <div>
      <h2 className="text-center mt-[5rem] text-[2rem] font-semibold gap-2 flex items-center justify-center">Book Tour to {tour.home.name} <MdTour color="green"/></h2>
       <Form name={tour.home.name}/>
    </div>
  )
}

export default Checkout