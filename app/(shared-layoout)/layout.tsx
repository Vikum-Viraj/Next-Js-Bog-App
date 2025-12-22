import { Navbar } from '@/components/web/Navbar'
import React from 'react'

const SharedLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}

export default SharedLayout
