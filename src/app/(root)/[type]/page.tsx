import React from 'react'
import { SearchParamProps } from '@/app/types';
import { getFiles } from '@/lib/actions/files.action';
import FileCard from '@/app/components/FileCard';
import { Models } from 'node-appwrite';
const page = async ({ params }: SearchParamProps) => {

    const test = await params
    const type = ((await params)?.type as string) || '';
    console.log(test)

    const files = await getFiles(type)

    return (
        <div className='rounded-2xl border border-1 h-full bg-card flex flex-col overflow-hidden'>
            <h3 className='text-xl py-2 px-4 capitalize shrink-0'>
                {type}
            </h3>
            <div className='flex-1 min-h-0 grid grid-auto-fit gap-4 px-4 py-2 overflow-y-auto '>
                {files.documents.map((file: any) => <FileCard file={file} key={file.$id} />)}
            </div>
        </div>
    )
}

export default page