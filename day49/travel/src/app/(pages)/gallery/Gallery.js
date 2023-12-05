import Image from "next/image"
import { API, URL_IMG } from "~/utils/config"

const getData = async () => {
  const res = await fetch(`${API}/pages`)
  return res.json()
}
async function Gallery() {
  const data = await getData()
  return (
    <div className="wide my-[7rem]">
      {data.map((destination,index) => {
        const gallery = destination.galleryBox
        const title = destination.gallery.content
       return <div className="mt-[2rem]">
        <h3 className="capitalize text-[1.8rem] font-bold text-yellow-500 text-center">{title}</h3>
        <div className="grid grid-cols-3 gap-[1rem]">
          {gallery.map((img,index) => (
            <Image key={index} src={`${URL_IMG}${img.src}`} width={200} height={200} alt="img" className="object-cover w-full h-[18rem]"/>
          ))}
        </div>
       </div>
      })}
    </div>
  )
}

export default Gallery