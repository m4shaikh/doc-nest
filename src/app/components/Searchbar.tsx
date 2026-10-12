'use client'
import React, { useEffect, useRef, useState } from 'react'
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

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = () => {
      if (modalRef.current && !modalRef.current.contains(event?.target as Node)) {
        setOpen(false)
      }

    }
    if (!open) return;
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [open])

  useEffect(() => {
    const fetchFiles = async () => {
      try {

        const files = await getFiles('', query)

        console.log('Full response:', files)
        console.log('Documents:', files?.documents)

        setResults(files?.documents ?? [])
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
    <div onClick={() => setOpen(true)} ref={modalRef} className='flex border rounded-2xl items-center shadow bg-popover relative'>
      <div className='p-2'>
        <Search />
      </div>
      <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Search Your Files' className='text focus:outline-none ' />
        {open && (<div className='absolute w-[250px] rounded-xl overflow-hidden  z-20 top-12 left-2'>
          <ul className=''>
            {results.map((file) => (<li className='bg-chart-2/90 line-clamp-1 p-1 text-md text-secondary cursor-pointer hover:bg-chart-2' key={file.$id}>{file.name}</li>))}
          </ul>
        </div>)}
      </div>
    </div>
  )
}

export default Searchbar