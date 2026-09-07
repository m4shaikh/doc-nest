'use client'
import { getFileType } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


interface Props {
    ownerId:string;
    accountId:string;
    className:string;
}
    
const FileUploader = ({ownerId,accountId,className}:Props) => {

    const onDrop = useCallback( async(acceptedFiles:File[] ) => {
        setFiles(acceptedFiles)
    }, []); 
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const [files, setFiles] = useState<File[]>([])

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button className="p-4 rounded-xl border ">
                Upload
            </button>
            {files.length > 0 && <ul>
                    <h4>Uploading</h4>
                    {files.map((file,index)=>{
                        const {type, extension} = getFileType(file.name)
                        return(
                            <li key={`${file.name}-${index}`}>
                                test
                                {extension}
                            </li>
                        )
                    })}
                </ul>}
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
    )
}

export default FileUploader