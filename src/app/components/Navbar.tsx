import React from 'react'
import Searchbar from './Searchbar'
import UploadButton from './UploadButton'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='w-full h-full flex items-center justify-between px-6 '>

      <Searchbar />
      <div className='flex items-center gap-4'>

        <UploadButton />
        <LogOut className='cursor-pointer' />
      </div>

    </div>
  )
}

export default Navbar