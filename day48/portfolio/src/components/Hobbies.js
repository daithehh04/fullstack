function Hobbies({data}) {
  return (
    <div className="border mt-4 border-solid border-[#ccc] p-4 rounded-lg shadow-medium">
      <h3 className="heading">{data.title}</h3>
      <ul className="ml-4 list-disc">
        {data.hobbies.map(h => (
          <li>{h}</li>
        ))}
      </ul>
    </div>
  )
}

export default Hobbies