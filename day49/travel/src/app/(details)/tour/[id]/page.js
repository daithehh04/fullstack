import Image from "next/image";
import Link from "next/link";
import { API, URL_IMG } from "~/utils/config";
const getDataDetail = async (id) => {
  const res = await fetch(`${API}/pages/${id}`)
  return res.json()
}
async function TourDetail({params}) {
  const data = await getDataDetail(params.id)
  const {home,destinationBox,destinations,services,servicesBox,galleryBox,gallery,blogBox,blog} = data
  return (
    <div className="mt-[3.6rem] mb-[5rem]">
      <h3 className="text-center text-[4rem] font-semibold">{home.name}</h3>
      <span className="block mb-3 font-semibold text-center text-[1.2rem]">{home.content}</span>
      <p className="px-[5%] text-center mb-4">{home.textcontent}</p>
      <Link href={`/checkout/${params.id}`} className="bg-[#FFD220] animate-bounce rounded-full mb-3 mr-3 fixed right-0 bottom-0 h-[4.5rem] w-[4.5rem] font-semibold grid place-items-center text-center shadow-xl">Book now</Link>
      <div className="grid grid-cols-4 gap-3">
        {destinationBox.map((img,index) => (
          <Image key={index} src={`${URL_IMG}${img.src}`} width={200} height={200} alt="img" className="object-cover w-full h-[10rem]"/>
        ))}
      </div>
      <h4 className="text-center text-[2rem] font-semibold my-[1rem] mt-[3rem]">{services.content}</h4>
      <ul className="grid grid-cols-3 wide gap-[2rem]">
        {servicesBox.map((service,index) => (
          <li className="text-center p-[2.5rem] shadow-md border border-solid border-gray">{service.h3}</li>
        ))}
      </ul>
    </div>
  )
}

export default TourDetail