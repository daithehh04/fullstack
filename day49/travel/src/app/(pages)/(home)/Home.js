import Image from "next/image"
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import Search from "~/components/Search";
import { API, URL_IMG } from "~/utils/config"

const getData = async () => {
  const res = await fetch(`${API}/pages`)
  return res.json()
}
async function Home() {
  const data = await getData()
  return (
    <>
      <div className="relative banner">
        <div className="absolute bottom-[-4rem] left-[50%] -translate-x-1/2 p-[2rem] bg-primary shadow-xl rounded-md">
          <Search/>
        </div>
      </div>
      <h2 className="text-center text-[3rem] font-semibold mt-[8rem]">Popular Destinations</h2>
      <div className="wide mb-[5rem] mt-[2rem] grid grid-cols-3 gap-[2rem]">
      {data?.map((tour,index) => {
        const {name,content,textcontent} = tour.home
        return (
          <div key={index} className="w-full h-full shadow-lg">
            <div className="overflow-hidden rounded-tl-[0.6rem] rounded-tr-[0.6rem]">
            <Image src={`${URL_IMG}${tour.destinationBox[0].src}`} width={200} height={200} alt="img" className="object-cover w-full h-[18rem] rounded-tl-[0.6rem] rounded-tr-[0.6rem] hover:scale-110 transition-all"/>
            </div>
            <div className="p-[1.4rem]">
              <div className="flex items-center">
                <MdLocationOn color="#FFD220" fontSize={'1.4rem'}/>
                <h2 className="font-semibold text-[1.2rem]">{name}</h2>
              </div>
              <strong className="capitalize">{content}</strong>
              <p className="line-clamp-3">{textcontent}</p>
              <div className="flex items-center justify-between mt-4">
                <Link href={`/tour/${tour.id}`} className="btn text-yellow-500 font-semibold py-[0.5rem]">View more</Link>
                <Link href={`/checkout/${tour.id}`} className="btn text-yellow-500 font-semibold py-[0.5rem]">Book now</Link>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </>
    
  )
}

export default Home