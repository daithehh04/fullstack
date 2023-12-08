import { getDictionary } from "./dictionaries"
import Header from "~/components/Header";
import Information from "~/components/Information";
import Contact from "~/components/Contact";
import Project from "~/components/Project";
import Hobbies from "~/components/Hobbies";

export default async function Home({params: {lang}}) {
  const dict = await getDictionary(lang)
  return (
    <main className="mb-8">
      <Header lang={lang}/>
      <div className="flex gap-6 wide pt-[6rem]">
        <Information skills={dict.skills} history={dict.history}/>
        <div>
          <Contact data={dict.contact}/>
          <Project data={dict.project}/>
          <Hobbies data={dict.hobby}/>
        </div>
      </div>
    </main>
  )
}
