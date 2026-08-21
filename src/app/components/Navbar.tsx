import React from 'react'
import Searchbar from './Searchbar'
import UploadButton from './UploadButton'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='w-full h-full flex items-center justify-between px-6 '>
      <div className=' text-2xl font-bold px-6 py-4'>
        <span className='cursor-pointer '>
          DocNest
        </span>

      </div>
      <Searchbar />
      <div className='flex items-center gap-4'>

        <UploadButton />
        <LogOut className='cursor-pointer' />
      </div>

    </div>
  )
}

export default Navbar