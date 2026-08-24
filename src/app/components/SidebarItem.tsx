import React from 'react'
import { LayoutDashboardIcon } from 'lucide-react'
import Link from 'next/link'
const SidebarItem = ({ url, name, icon }: { url: string, name: string, icon: React.JSX.Element}) => {
    return (
        <Link href={url}>
            <div className={`px-4 py-2 hover:bg-popover rounded-2xl flex gap-2 cursor-pointer`}>
                {icon}
                <span className='hidden lg:block'> 
                    {name}
                </span>
            </div>
        </Link>
    )
}

export default SidebarItem