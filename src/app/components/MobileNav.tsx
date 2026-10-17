import React from 'react'
import Searchbar from './Searchbar'
import UploadButton from './UploadButton'
import { LogOut } from 'lucide-react'
import MobileMenu from './MobileMenu'
import { ContextMenuItemState } from '@base-ui/react'

const MobileNav = ({userName,email}:{userName:string, email:string}) => {
    return (
        <div className='flex lg:hidden h-full items-center pr-4 '>
            <div className='flex w-full items-center justify-between'>
                <Searchbar />
                <div className='flex items-center gap-4'>
                    <MobileMenu userName={userName} email={email}/>
                </div>
            </div>
        </div>
    )
}

export default MobileNav