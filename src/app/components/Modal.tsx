import { CrossIcon, XIcon } from 'lucide-react'

import React from 'react'

const Modal = ({ activeModal, setIsModalOpen, children }: any) => {
  return (
    <div className='w-screen h-screen left-0 top-0 z-100 fixed bg-black/60 flex items-center justify-center'>
      <div className='h-auto w-[40%] bg-popover rounded-xl p-4'>
        <div className=' border-b flex relative'>
          <div className='text-center text-xl pb-2 font-bold w-full'>
            {activeModal}
          </div>
           <button className='absolute right-0 bg-secondary/50 rounded-xl p-1 cursor-pointer hover:bg-secondary '  onClick={()=>setIsModalOpen(false)}><XIcon/></button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal