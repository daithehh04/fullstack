import { Avatar } from "@nextui-org/react"

function Information({skills, history}) {
  return (
    <div className="w-[25rem] flex flex-col items-center border border-solid border-[#ccc] p-4 rounded-lg shadow-medium">
       <Avatar src="https://portfolio-sage-delta.vercel.app/assets/images/avatar.jpg" className="w-[15rem] h-[15rem] text-large" />
       {/* Skills */}
       <div className="mt-4 skills">
        <h3 className="heading">{skills.title}</h3>
        <p>
          <h4 className="inline font-bold whitespace-nowrap">{skills.heading1}</h4>:
          REST API, React.js, Next.js, Redux, Context, CSS3, HTML5, UI/UX, Figma, Photoshop...
        </p>
        <p>
          <h4 className="inline font-bold whitespace-nowrap">{skills.heading2}</h4>:
          {skills.text2}
        </p>
       </div>
       <div className="mt-4 history">
        <h3 className="heading">{history.title}</h3>
        <ul>
          <li>
            <h4 className="inline">2017-2020</h4>:
            THPT Hiệp Hòa Số 3
          </li>
          <li>
            <h4 className="inline">2020-2025</h4>:
            Học viện kỹ thuật mật mã
          </li>
        </ul>
       </div>
    </div>
  )
}

export default Information