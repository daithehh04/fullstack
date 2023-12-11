import Image from "next/image";
import Link from "next/link";
import { API, URL_IMG } from "~/utils/config";

export async function generateMetadata({ params }) {
  const id = params.id.split('~')[1]
  const data = await getDataDetail(id);
  if (Object.keys(data).length !== 0) {
    return {
      title: data.home.name + " | Travel",
      description: data.home.textcontent.slice(0, 150),
      openGraph: {
        title: data.home.name + " | Travel",
        description: data.home.textcontent.slice(0, 150),
      },
    };
  }
  return {
    title: "Error | Travel",
  };
}

const getDataDetail = async (id) => {
  const res = await fetch(`${API}/pages/${id}`);
  return res.json();
};
async function TourDetail({ params }) {
  const id = params.id.split('~')[1]
  const data = await getDataDetail(id);
  if (Object.keys(data).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <p className="mt-[5rem] text-[2rem] font-semibold">Page not found !!</p>
        <Link href={"/"} className="px-4 py-2 bg-yellow-500 rounded-md">
          Go back
        </Link>
      </div>
    );
  }
  const {
    home,
    destinationBox,
    destinations,
    services,
    servicesBox,
    galleryBox,
    gallery,
    blogBox,
    blog,
  } = data;
  return (
    <div className="mb-[5rem]">
      <div className="max-h-[40rem] h-[100vh] relative flex flex-col items-center justify-center text-white">
        <Image
          src={`${URL_IMG}${destinationBox[0].src}`}
          width={1600}
          height={900}
          alt="img"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.4" }}
        ></div>
        <div className="relative z-10">
          <h3 className="text-center text-[4rem] font-semibold">
            {home?.name}
          </h3>
          <span className="block mb-3 font-semibold text-center text-[1.2rem]">
            {home?.content}
          </span>
          <p className="px-[5%] text-center mb-4">{home?.textcontent}</p>
        </div>
      </div>

      <Link
        href={`/checkout/${params.id}`}
        className="bg-yellow-500 animate-bounce rounded-full mb-3 mr-3 fixed right-0 bottom-0 h-[4.5rem] w-[4.5rem] font-semibold grid place-items-center text-center shadow-xl"
      >
        Book now
      </Link>
      <div className="wide">
        <h4 className="text-center capitalize text-[2rem] font-semibold my-[1rem] mt-[3rem]">
          {destinations.content}
        </h4>
        <ul className="grid grid-cols-3 gap-[1.5rem]">
          {destinationBox?.map((des, index) => (
            <li key={index}>
              <Image
                src={`${URL_IMG}${des.src}`}
                width={200}
                height={200}
                alt="img"
                className="object-cover w-full h-[16rem]"
              />
              <h4 className="text-[1.2rem] font-semibold">{des.h3}</h4>
              <p>{des.p}</p>
            </li>
          ))}
        </ul>
        <h4 className="text-center capitalize text-[2rem] font-semibold my-[1rem] mt-[3rem]">
          {services.content}
        </h4>
        <ul className="grid grid-cols-3 wide gap-[2rem]">
          {servicesBox?.map((service, index) => (
            <li
              className="text-center p-[2.5rem] shadow-md border border-solid border-gray"
              key={index}
            >
              {service.h3}
            </li>
          ))}
        </ul>
        <h4 className="text-center capitalize text-[2rem] font-semibold my-[1rem] mt-[3rem]">
          {gallery.content}
        </h4>
        <ul className="grid grid-cols-3 gap-[1.5rem]">
          {galleryBox?.map((des, index) => (
            <li key={index}>
              <Image
                src={`${URL_IMG}${des.src}`}
                width={200}
                height={200}
                alt="img"
                className="object-cover w-full h-[16rem]"
              />
              <h4 className="text-[1.2rem] font-semibold">{des.h3}</h4>
              <p>{des.span}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TourDetail;
