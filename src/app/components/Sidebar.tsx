import { File, LayoutDashboardIcon , ImageIcon, VideoIcon, PieChart } from 'lucide-react'
import React from 'react'


const Sidebar = () => {
  return (
    <aside className='sidebar h-full flex flex-col'>
        <div className=' text-2xl font-bold px-6 py-4 mb-6'>
            <span className='cursor-pointer'>
                DocNest
            </span>

        </div>
        <div className='flex flex-col px-4 gap-4 '>
            <div className='px-4 py-2 hover:bg-popover rounded-2xl flex gap-2 cursor-pointer'>
                <LayoutDashboardIcon/>Dashboard
            </div>
            <div className='px-4 py-2 hover:bg-popover rounded-2xl flex gap-2 cursor-pointer'>
               <File/> Document
            </div>
            <div className='px-4 py-2 hover:bg-popover rounded-2xl flex gap-2 cursor-pointer'>
                <ImageIcon/>Images
            </div>
            <div className='px-4 py-2 hover:bg-popover rounded-2xl flex gap-2 cursor-pointer'>
                <VideoIcon/>Media
            </div>
            <div className='px-4 py-2 hover:bg-popover rounded-2xl flex gap-2 cursor-pointer'>
                <PieChart/> Others
            </div>
        </div>

    </aside>
  )
}

export default Sidebar