function Project({data}) {
  return (
    <div className="border mt-4 mb-8 border-solid border-[#ccc] p-4 rounded-lg shadow-medium">
      <h3 className="heading">{data.title}</h3>
      <ul>
        <li>
          <h4 className="heading-2">Trello web</h4>
          <p>{data.desc1}</p>
          <div className="flex gap-4 mt-2">
            <a href="" class="text-danger">Link git</a>
            <a href="" class="text-danger">Link demo</a>
          </div>
          <hr className="mt-2 mb-4"/>
        </li>
        <li>
          <h4 className="heading-2">Shop mini</h4>
          <p>
            {data.desc2}
          </p>
          <div className="flex gap-4 mt-2">
            <a href="" class="text-danger">Link git</a>
            <a href="" class="text-danger">Link demo</a>
          </div>
          <hr className="mt-2 mb-4"/>
        </li>
      </ul>
    </div>
  )
}

export default Project