'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/app/components/ui/alert-dialog"
import { UploadCloudIcon } from 'lucide-react'
import { useState } from 'react'
import type { Dispatch, SetStateAction } from "react";
import Link from 'next/link'

const UploadModal = ({isOpen,setIsOpen}:{isOpen:boolean, setIsOpen:Dispatch<SetStateAction<boolean>>}) => {

    return (

        <div> 
            <AlertDialog open={isOpen}>
                <AlertDialogContent className='p-8 '>
                    <button className='fixed top-4 cursor-pointer right-6' onClick={() => setIsOpen(false)}>&#x2715;</button>
                    <AlertDialogHeader className='flex w-full flex-col gap-4 items-center justify-center'>
                        <AlertDialogTitle className='text-center w-full '>Upload your file</AlertDialogTitle>
                        <div className='p-24 flex flex-col gap-2 border border-dashed items-center justify-center '>
                            <div className='p-2 h-12 w-12 flex items-center justify-center border border-solid border-4 rounded-full'>
                                <UploadCloudIcon />
                            </div>
                            <span className='text-sm block text-center'>Drag or upload your files here</span>
                        </div>

                    </AlertDialogHeader>
                    <div className='text-xs text-center'>
                        Browse storage
                    </div>

                    <AlertDialogAction>
                        Upload
                    </AlertDialogAction>

                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default UploadModal