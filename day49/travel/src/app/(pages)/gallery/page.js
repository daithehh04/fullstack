import Gallery from "./Gallery"

export const metadata = {
  title: 'Gallery | Travel',
  description: 'About Gallery Travel',
  openGraph: {
    title: 'Gallery | Travel',
    description: 'About Gallery Travel',
  },
}
function GalleryPage() {
  return (
    <div>
      <Gallery/>
    </div>
  )
}

export default GalleryPage