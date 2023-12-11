import Home from "./Home"

export const metadata = {
  title: 'Home | Travel',
  description: 'This is home page Travel',
  openGraph: {
    title: 'Home | Travel',
    description: 'This is home page Travel',
  },
}
function HomePage() {
  return (
    <main>
      <Home/>
    </main>
  )
}

export default HomePage