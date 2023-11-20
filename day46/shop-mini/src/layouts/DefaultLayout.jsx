import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import './DefaultLayout.scss'

function DefaultLayout() {
  return (
    <>
      <Header/>
      <main className="main">
        <Outlet/>
      </main>
    </>
  )
}

export default DefaultLayout