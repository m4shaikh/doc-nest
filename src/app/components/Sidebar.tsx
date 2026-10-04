import { File, LayoutDashboardIcon, ImageIcon, VideoIcon, PieChart, PieChartIcon } from 'lucide-react'
import React from 'react'
import SidebarItem from './SidebarItem'
import Image from 'next/image'

export const Items = [
    {
        url: '/',
        name: 'Dashboard',
        icon: <LayoutDashboardIcon />
    }, {
        url: '/document',
        name: 'Documents',
        icon: <File />
    }, {
        url: '/image',
        name: 'Images',
        icon: <ImageIcon />
    }, {
        url: '/media',
        name: 'Media',
        icon: <VideoIcon />
    }, {
        url: '/other',
        name: 'Others',
        icon: <PieChartIcon />
    }

]

const Sidebar = ({userName,email}:{userName:string, email:string}) => {
    return (
        <aside className='sidebar h-full px-2 flex flex-col justify-between mt-4 '>

            <div className='flex flex-col gap-4 '>

                {Items.map((item) => <SidebarItem key={item.name} url={item.url} name={item.name} icon={item.icon} />)}

            </div>
            <div className='flex items-center gap-2 py-8 px-2 text-sm' >
                <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
                    <Image src='/placeHolder.jpg' width={44} height={44} alt="avatar" className='object-contain' />

                </div>
                <div className=' w-[calc(100%-48px)] hidden lg:block'>

                    <p className='truncate'>{userName}</p>
                    <p className='truncate'>{email}</p>
                </div>
            </div>

        </aside>
    )
}

export default Sidebar