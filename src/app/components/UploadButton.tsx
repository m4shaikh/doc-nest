'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from "react-dropzone"
import { Upload } from 'lucide-react'
import UploadingModal from './UploadingModal' // Make sure this path is correct

const UploadButton = () => {
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])

    const onDrop = useCallback((droppedFiles: File[]) => {
        console.log("Files selected:", droppedFiles)
        setAcceptedFiles(droppedFiles)
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div>
            {/* The button now triggers the file browser directly using getRootProps */}
            <button 
                type="button"
                {...getRootProps()} 
                className='flex items-center p-2 gap-1 border rounded-2xl cursor-pointer bg-popover shadow hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring'
            >
                <input {...getInputProps()} />
                <Upload className="w-5 h-5" /> 
                <span>Upload</span>
            </button>

            {/* This will render once files are selected */}
            {acceptedFiles.length > 0 && (
                <UploadingModal files={acceptedFiles} />
            )}
        </div>
    )
}

export default UploadButton