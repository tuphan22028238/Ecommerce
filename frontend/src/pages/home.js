import { useEffect, useState } from "react"

const Home = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const data2 = await fetch('/show')
      const data1 = await data2.json()
      if (data2) {
        setData(data1)
      }
    }
    getData()} , [])


  return (
    <div className="container">
      <div className="data">
        {data && data.map((user) => {
          return (
            <div>
              <h1> {user.name} </h1>
              <h2> {user.price} </h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;