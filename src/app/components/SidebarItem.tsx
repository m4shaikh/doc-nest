import React from 'react'
import { LayoutDashboardIcon } from 'lucide-react'
import Link from 'next/link'
const SidebarItem = ({ url, name, icon, isSelected, setIsSelected }: { url: string, name: string, icon: React.JSX.Element, isSelected:string, setIsSelected:React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <Link href={url} >
            <div onClick={()=>setIsSelected(`${name}`)} className={`px-4 py-2 hover:bg-popover ${(name == isSelected)?'bg-primary':''} rounded-2xl flex gap-2 cursor-pointer`}>
                {icon}
                <span className='hidden lg:block'> 
                    {name}
                </span>
            </div>
        </Link>
    )
}

export default SidebarItem