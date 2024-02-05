import Sidebar from "./Sidebar"

export default function RootLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  )
}
