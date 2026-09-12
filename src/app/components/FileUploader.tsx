'use client'
import { constructFileUrl, convertFileToUrl, getFileIcon } from "@/lib/utils";
import { cn, getFileType } from "@/lib/utils";
import { Button } from "./ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "lucide-react";
import Thumbnail from "./Thumbnail";
import Image from "next/image";
import { uploadFile } from "@/lib/actions/files.action";
import { usePathname } from "next/navigation";

interface Props {
    ownerId: string;
    accountId: string;
    className?: string;
}
const MAX_FILE_SIZE = 10 * 1024 * 1024
const FileUploader = ({ ownerId, accountId, className }: Props) => {
    
    const path = usePathname()
    const [files, setFiles] = useState<File[]>([])

    const handleRemove = (e: React.MouseEvent, fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name != fileName))
    }

    const onDrop = useCallback(async(acceptedFiles: File[]) => {
        // handle accepted files
        setFiles(acceptedFiles)

        const uploadPromises = acceptedFiles.map(async (file) => {
            if (file.size > MAX_FILE_SIZE) {
                setFiles((prevFiles) => prevFiles.filter( (f)=> f.name != file.name) )
                console.log('Too big File')
                return 'error'
            }
            return uploadFile({file, ownerId, accountId, path}).then((uploadedFile)=>{
                if(uploadedFile){
                    setFiles((prevFiles)=>prevFiles.filter((f)=>file.name != f.name))
                }
            })
        })
        await Promise.all(uploadPromises)
    }, [ownerId, accountId, path])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    return (
        <>
            {/* Upload button / dropzone */}
            <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />

                <button
                    type="button"
                    className="fixed bottom-10 right-10 p-2 bg-secondary shadow-md border cursor-pointer rounded-full"
                >
                    <Image
                        src="/assets/icons/upload.svg"
                        height={24}
                        width={24}
                        alt="upload"
                        className=""
                    />
                </button>
            </div>

            {/* Uploading files */}
            {files.length > 0 && (
                <ul className="fixed top-[60px] right-4 w-[30%] max-h-[45%] overflow-y-scroll scrollbar-width-0 scrollbar-none bg-accent/20 p-4 rounded-xl">
                    <h4 className="text-xl text-primary-foreground mb-2">
                        Uploading ...
                    </h4>

                    {files.map((file, index) => {
                        const { extension, type } = getFileType(file.name);

                        return (
                            <li
                                key={index}
                                className="w-full flex items-center gap-2 overflow-hidden bg-accent/10 p-2"
                            >
                                <Thumbnail
                                    height={24}
                                    width={24}
                                    url={getFileIcon(extension, type)}
                                />
                                <div className="w-[90%] flex items-center justify-between ">
                                    <div className="w-[80%]">
                                        <p className="max-w-[90%] line-clamp-1">
                                            {file.name}
                                        </p>
                                        <Image src='/assets/icons/file-loader.gif' className='w-[90%] h-[4px]' height={0} width={0} alt="" />
                                    </div>

                                    <Image className='' src='/assets/icons/remove.svg' onClick={(e) => handleRemove(e, file.name)} height={16} width={16} alt="" />
                                </div>

                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}

export default FileUploader