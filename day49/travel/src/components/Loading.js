import { CircularProgress } from '@nextui-org/react'
import React from 'react'

function Loading() {
  return (
    <div className='w-full h-[100vh] fixed inset-0 z-40 flex items-center justify-center' style={{background: 'rgba(255,255,255,0.6)'}}><CircularProgress color='success' aria-label="Loading..." /></div>
  )
}

export default Loading