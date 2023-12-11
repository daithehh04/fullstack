import { API } from "~/utils/config";
import Form from "../Form";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const id = params.id.split('~')[1]
  const session = await getServerSession();
  if (!session) {
    return redirect("/signin");
  }
  const tour = await getData(id);
  if (Object.keys(tour).length !== 0) {
    return {
      title: tour.home.name + " | Checkout",
      description: tour.home.content.slice(0, 150),
      openGraph: {
        title: tour.home.name + " | Checkout",
        description: tour.home.content.slice(0, 150),
      },
    };
  }
  return {
    title: "Error | Checkout",
  };
}

const getData = async (id) => {
  const res = await fetch(`${API}/pages/${id}`);
  const data = await res.json();
  return data;
};
async function Checkout({ params }) {
  const id = params.id.split('~')[1]
  const tour = await getData(id);
  if (Object.keys(tour).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <p className="mt-[5rem] text-[2rem] font-semibold">Page not found !!</p>
        <Link href={"/"} className="px-4 py-2 bg-yellow-500 rounded-md">
          Go back
        </Link>
      </div>
    );
  }
  return (
    <div className="checkout pt-[7rem] pb-[5rem]">
      <Form name={tour.home.name} />
    </div>
  );
}

export default Checkout;
