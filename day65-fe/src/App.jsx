import "./App.css"
import { Route, Routes } from "react-router-dom"
import ListUser from "./pages/ListUser"
import UserDetail from "./pages/UserDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListUser />} />
      <Route path="/user/:id" element={<UserDetail />} />
    </Routes>
  )
}

export default App
