import Image from 'next/image';
import React from 'react'

const Navbar = () => {
  return (
    <div className='max-w-screen-2xl px-20 py-15 mx-auto flex items-center justify-between'>
        <Image 
            src={'/icons/header-logo.svg'}
            alt='Ampersand Logo'
            width={100}
            height={100}
            className='w-10 h-10'        
        />
        <div className='bg-[#F8F8F8]/5 rounded-[12px] flex items-center justify-center p-4'>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar;