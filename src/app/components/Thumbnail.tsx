import React from 'react'
import Image from 'next/image';
interface Props {
    height:number;
    width:number;
    url?:string;
}

const Thumbnail = ({height, width, url=''}:Props) => {
  return (
    <figure>
        <Image height={height}  width={width} src={url} alt=''/>
    </figure>
  )
}

export default Thumbnail