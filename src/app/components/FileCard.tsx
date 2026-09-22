'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { getFileIcon, getFileSize, parseDateTime } from '@/lib/utils'
import { Models } from 'node-appwrite'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import Example from './DropDown'
import DropDown from './DropDown'
const FileCard = ({ file }: {file:any}) => {
    const DateTime = parseDateTime(file.$createdAt)
    const ownerName = file.ownerName
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    return (

        <div className='flex flex-col gap-1 bg-card relative shadow-xl h-auto w-35 rounded-xl p-3 cursor-pointer'>
            <DropDown/>
            <div className='flex justify-between'>
                <div className='flex bg-sidebar rounded-full p-2'>
                    <Image src={`${getFileIcon(file.extension,file.type)}`} height={0} width={0} className='h-12 w-12' alt=''/>
                </div>
                <div className='flex flex-col flex-right'>
                    <div className='text-[8px] text-primary/70 pt-10'>{getFileSize(file.size)}</div>
                </div>
            </div>
            <div className='line-clamp-1 text-sm'>
                {file.name}
            </div>
            <div className='text-xs text-primary/60' >
                {`${DateTime?.hour}:${DateTime?.minute} ${DateTime?.ampm}, ${DateTime?.day} ${DateTime?.monthNameShort}`}
            </div>
            <div className='text-xs'>
                By: {ownerName? ownerName : 'Moin' }
            </div>
        </div>
    )
}

export default FileCard