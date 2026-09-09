'use client'
import { cn, getFileType } from "@/lib/utils";
import { Button } from "./ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "lucide-react";

interface Props {
    ownerId: string;
    accountId: string;
    className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {

    const [files, setFiles] = useState<File[]>([])

    const onDrop = useCallback((acceptedFiles:File[]) => {
        // handle accepted files
        setFiles(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <button className='fixed bottom-10 right-10 p-2 bg-secondary shadow-md border cursor-pointer rounded-full'> <p className=""><UploadIcon className=""/></p> </button>

            {files.length > 0 && <ul className="fixed top-[60px] right-4 w-[25%] max-h-[35%]">
                <h4 className="">Uploading</h4>
                {files.map((file, index) => {
                    
                    const {extension,type} = getFileType(file.name)
                    
                    return(<li key={index} className="bg-chart-5 overflow-hidden line-clamp-1">{file.name} {file.type}</li>)
                })
                }

            </ul>}

        </div>
    )

}

export default FileUploader