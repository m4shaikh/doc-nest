'use client'

import Searchbar from './Searchbar'
import { LogOut } from 'lucide-react'
import { logoutUser } from '@/lib/actions/user.actions'

const Navbar = () => {
  return (
    <div className='w-full h-full hidden lg:flex flex items-center  '>

      <div className='flex w-full items-center justify-between relative'>
        <Searchbar />
        <div className='flex items-center gap-4 pr-4'>
          <div onClick={async () => await logoutUser()}>

            <LogOut className='cursor-pointer' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar