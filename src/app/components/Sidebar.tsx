import { File, LayoutDashboardIcon, ImageIcon, VideoIcon, PieChart, PieChartIcon } from 'lucide-react'
import React from 'react'
import SidebarItem from './SidebarItem'
import Image from 'next/image'

const Items = [
    {
        url: '/',
        name: 'Dashboard',
        icon: <LayoutDashboardIcon />
    }, {
        url: '/',
        name: 'Documents',
        icon: <File />
    }, {
        url: '/',
        name: 'Images',
        icon: <ImageIcon />
    }, {
        url: '/',
        name: 'Media',
        icon: <VideoIcon />
    }, {
        url: '/',
        name: 'Others',
        icon: <PieChartIcon />
    }

]

const Sidebar = () => {
    return (
        <aside className='sidebar h-full px-4 flex flex-col justify-between mt-4 border-r'>

            <div className='flex flex-col gap-4 '>

                {Items.map((item) => <SidebarItem key={item.name} url={item.url} name={item.name} icon={item.icon} />)}

            </div>
            <div className='py-8'>
                <div className='h-[48px] w-[48px] rounded-full overflow-hidden'>
                    <Image src='/placeHolder.jpg' width={48} height={48} alt="avatar" className='object-contain' />

                </div>
                <p>Name</p>
            </div>

        </aside>
    )
}

export default Sidebar