'use client'
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { getFiles } from '@/lib/actions/files.action'
import { File } from '../types'
const Searchbar = () => {

  const [query, setQuery] = useState('')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') || ''
  const [results, setResults] = useState<File[]>([])
  const [open, setOpen] = useState(false)

useEffect(() => {
  const fetchFiles = async () => {
    try {

      const files = await getFiles('',query)

      console.log('Full response:', files)
      console.log('Documents:', files?.documents)

      setResults(files?.documents ?? [])
      setOpen(true)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  } 

  fetchFiles()
}, [query])
  useEffect(() => {
    if (!searchQuery) {
      setQuery('')
    }
  }, [searchQuery])
  
  return (
    <div className='flex border rounded-2xl items-center shadow bg-popover relative'>
      <div className='p-2'>
        <Search />
      </div>
      <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Search Your Files' className='text focus:outline-none ' />
        {results.length && (<div className='absolute bg-input/90 rounded-xl p-4  z-20 top-12 left-2'>
          <ul className='flex flex-col gap-2'>
            {results.map((file) =>(<li className='bg-card line-clamp-1 p-1 rounded-xl text-md text-chart-4 cursor-pointer' key={file.$id}>{file.name}</li>))}
          
          </ul>
        </div>)}
      </div>
    </div>
  )
}

export default Searchbar