import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-green-700 mb-2'>
        <div className='flex justify-between items-center max-w-[1280px] mx-auto px-4 py-6'>
            <Link className='hover:text-yellow-200 text-white duration-300 font-bold text-xl' href='/'>
                Phrasal Verbs
            </Link>
            <nav className='max-md:hidden'>
                <ul className='flex items-center gap-8'>
                    <li>
                        <Link className='hover:text-yellow-200 text-white  duration-300' href='/'>Home</Link>
                    </li>
                    <li>
                        <Link className='hover:text-yellow-200 text-white  duration-300' href='/about'>About</Link>
                    </li>
                    <li>
                        <Link className='hover:text-yellow-200 text-white  duration-300' href='/benefits'>Benefits</Link>
                    </li>
                    <li>
                        <Link className='hover:text-yellow-200 text-white  duration-300' href='/contactus'>Contact Us</Link>
                    </li>
                </ul>
            </nav>
            <div className='flex gap-4 items-center'>
                <button className='hover:text-yellow-200 text-white  duration-300'>Sign In</button>
                <button className='hover:text-yellow-200  text-white duration-300'>Sign Out</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar