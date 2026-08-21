import React from 'react'
import { Upload } from 'lucide-react'
const UploadButton = () => {
    return (
        <div>
            <div className='flex p-2 gap-1 border rounded-2xl cursor-pointer bg-popover shadow'>
                <Upload /> Upload
            </div>
        </div>
    )
}

export default UploadButton