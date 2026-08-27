import React, { useState } from 'react'
import Link from 'next/link'
import { Upload } from 'lucide-react'
import UploadModal from './UploadModal'
const UploadButton = () => {
    
    const [isOpen,setIsOpen] = useState(false)
    
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>
                <div className='flex p-2 gap-1 border rounded-2xl cursor-pointer bg-popover shadow'>
                    <Upload /> Upload
                </div>
            </button>
            <UploadModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>

    )
}

export default UploadButton