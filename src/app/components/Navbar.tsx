"use client"

import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Navbar = () => {

  const {data: session} = useSession();

  return (
    <div className='bg-slate-500 mb-4'>
        <div className='flex justify-between items-center max-w-[1280px] mx-auto px-4 py-4'>
            <Link className='hover:text-yellow-200 text-white duration-300 font-bold text-xl' href='/'>
                Phrasal Verbs
            </Link>
            {/* <nav className='max-md:hidden'>
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
            </nav> */}
            <div className='flex gap-4 items-center'>
                <div className='text-white bg-blue-900 px-6 py-2 rounded-md'>
                    <p>
                    <span className='text-orange-400'>Name: </span> <span className='text-yellow-300'>{session?.user?.name}</span>
                    </p>
                    <p>
                    <span className='text-yellow-300'>Email:</span> <span className='text-orange-400'>{session?.user?.email}</span>
                    </p>
                </div>
                {/* <Link href='/login' className='hover:text-yellow-200 text-white  duration-300'>Login</Link> */}
                <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })} className='hover:text-yellow-200  text-white duration-300'>Log Out</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar