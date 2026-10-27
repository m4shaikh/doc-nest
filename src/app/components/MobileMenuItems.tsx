import Link from 'next/link'
import React from 'react'
import { SheetClose } from "@/app/components/ui/sheet"

const MobileMenuItems = ({
  url,
  name,
  icon,
}: {
  url: string
  name: string
  icon: React.JSX.Element
}) => {
  return (
    <SheetClose render={<Link href={url} />} nativeButton={false}>
      <div className="px-4 py-2 hover:bg-popover rounded-2xl flex gap-2 cursor-pointer">
        {icon}
        <span>{name}</span>
      </div>
    </SheetClose>
  )
}

export default MobileMenuItems