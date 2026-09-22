import React from 'react'
import Image from 'next/image'
import { getFileIcon, getFileSize, parseDateTime } from '@/lib/utils'
import { Models } from 'node-appwrite'

const FileCard = ({ file }: {file:any}) => {
    const DateTime = parseDateTime(file.$createdAt)
    const ownerName = file.ownerName

    return (

        <div className='flex flex-col gap-1 bg-card relative shadow-xl h-auto w-35 rounded-xl p-3 cursor-pointer'>
            <Image src='./assets/icons/dots.svg' height={0} width={0} alt='' className='w-4 h-4 absolute right-2 top-3'/>
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