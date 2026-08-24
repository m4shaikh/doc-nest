'use client'
import React from 'react'
import Searchbar from './Searchbar'
import UploadButton from './UploadButton'
import { LogOut } from 'lucide-react'
import { logoutUser } from '@/lib/actions/user.actions'
const Navbar = () => {
  return (
    <div className='w-full h-full hidden lg:flex flex items-center gap-20 px-6 '>
      <div className=' text-2xl font-bold px-6 py-4'>
        <span className='cursor-pointer '>
          DocNest
        </span>

      </div>
      <div className='flex w-full items-center justify-between'>
        <Searchbar />
        <div className='flex items-center gap-4'>
          <UploadButton />
          <div onClick={async() => await logoutUser()}>

           <LogOut className='cursor-pointer' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar