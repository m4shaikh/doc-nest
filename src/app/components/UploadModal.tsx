'use client'

import React, { useCallback, useState } from 'react'
import type { Dispatch, SetStateAction } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloudIcon, X } from 'lucide-react'
import UploadingModal from './UploadingModal'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/app/components/ui/alert-dialog"

interface UploadModalProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const UploadModal = ({ isOpen, setIsOpen }: UploadModalProps) => {

    const[ acceptedFiles, setAcceptedFiles] = useState<File[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("Files dropped:", acceptedFiles)
        setAcceptedFiles(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                {/* Added max-h-[90vh] and overflow-y-auto to prevent it from ever clipping off screen */}
                <AlertDialogContent className='p-6 sm:p-8 max-w-2xl max-h-[90vh] overflow-y-auto'>

                    <button
                        className='absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring'
                        onClick={() => setIsOpen(false)}
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <AlertDialogHeader className='flex w-full flex-col gap-4 items-center justify-center'>
                        <AlertDialogTitle className='text-center w-full text-xl mb-2'>
                            Upload your file
                        </AlertDialogTitle>

                        {/* Replaced h-[50vh] with h-72 (18rem) to ensure it fits safely inside the screen */}
                        <div
                            {...getRootProps()}
                            className={`w-full h-72 flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed transition-all cursor-pointer
                            ${isDragActive
                                    ? 'border-primary bg-primary/5'
                                    : 'border-muted-foreground/25 hover:bg-accent/50'
                                }`}
                        >
                            <input {...getInputProps()} />

                            <div className='flex items-center justify-center bg-muted p-4 rounded-full'>
                                <UploadCloudIcon className={`h-10 w-10 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>

                            <div className="text-center space-y-1">
                                <span className='text-base font-medium block'>
                                    {isDragActive ? "Drop files here..." : "Drag & drop files here"}
                                </span>
                                <span className='text-sm text-muted-foreground block'>
                                    or click to browse your computer
                                </span>
                            </div>

                            <div className='px-2 py-1 bg-muted-foreground text-primary-foreground rounded-lg text-xs font-medium hover:bg-muted-foreground/90 transition-colors mt-2'>
                                Browse storage
                            </div>
                        </div>
                    </AlertDialogHeader>


                    <AlertDialogAction className={`p-4`} onClick={() => setIsOpen(false)}>
                        Done
                    </AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>
            {acceptedFiles?.length > 0 && (
                <UploadingModal />
            )}
        </div>
    )
}

export default UploadModal
