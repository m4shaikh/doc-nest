import React from 'react'
import { Search } from 'lucide-react'
const Searchbar = () => {
  return (
    <div className='flex border rounded-2xl items-center shadow bg-popover'>
        <div className='p-2'>
            <Search/>
        </div>
        <div>
            <input type="text" placeholder='Search Your Files' className='text focus:outline-none '/>
        </div>
    </div>
  )
}

export default Searchbar