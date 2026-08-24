import React from 'react'
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet"
import SidebarItem from './SidebarItem'
import Link from 'next/link'
import Image from 'next/image'
import { Items } from './Sidebar'
import { MenuIcon } from 'lucide-react'
import MobileMenuItems from './MobileMenuItems'

const MobileMenu = ({userName,email}:{userName:string,email:string}) => {
    return (
        <div><Sheet>
            <SheetTrigger render={<button><MenuIcon /></button>} />
            <SheetContent>
                

                <div className="flex flex-col gap-2 px-4">
                    <div className='flex items-center gap-2 py-4 text-sm' >
                        <div className='h-[44px] w-[44px] rounded-full overflow-hidden'>
                            <Image src='/placeHolder.jpg' width={44} height={44} alt="avatar" className='object-contain' />

                        </div>
                        <div className=''>

                            <p>{userName}</p>
                            <p className=''>{email}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 '>

                        {Items.map((item) => <MobileMenuItems key={item.name} url={item.url} name={item.name} icon={item.icon} />)}

                    </div>
                </div>
                <SheetFooter>
                </SheetFooter>
            </SheetContent>
        </Sheet></div>
    )
}

export default MobileMenu