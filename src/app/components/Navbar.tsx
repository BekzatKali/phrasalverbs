"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { usePhrasalVerbsInfoContext } from '../context/PhrasalVerbsProvider'

const Navbar = () => {
  const [show, setShow] = useState(false);
  const {data: session} = useSession();

  const { favoritePhrasalVerbs, favorites } = usePhrasalVerbsInfoContext();

  return (
    <div className='bg-slate-500 mb-4'>
        <div className='flex justify-between gap-1 items-center max-w-[1420px] mx-auto px-4 py-4'>
            <Link className='hover:text-yellow-200 text-white duration-300 font-bold text-xl max-sm:text-sm w-fit flex-1' href='/'>
                Phrasal Verbs
            </Link>
            <div className='flex gap-1 min-[375px]:gap-2 items-center'>
                <div className='text-white bg-black px-6 py-2 rounded-md max-sm:px-1 max-sm:py-1 max-[500px]:max-w-[180px] overflow-hidden break-words'>
                    <p className='max-sm:text-xs max-[500px]:flex flex-col'>
                        <span className='text-white'>Name: </span> <span className='text-yellow-200 font-bold'>{session?.user?.name}</span>
                    </p>
                    <p className='max-sm:text-xs max-[500px]:flex flex-col'>
                        <span className='text-yellow-200'>Email:</span> <span className='text-white font-bold'>{session?.user?.email}</span>
                    </p>
                </div>
                <div className='text-white flex-shrink-0'>
                    <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })} className='hover:text-yellow-200 max-sm:text-xs text-white duration-300'>
                        Log Out
                    </button>
                </div>
                {favoritePhrasalVerbs.length ? (
                    <div className='relative cursor-pointer' onClick={() => setShow(true)}>
                        <FaHeart className='w-7 h-7' />
                        <span className='bg-red-700 text-white p-1 rounded-full absolute w-[22px] h-[22px] right-[-6px] bottom-[-10px] flex justify-center items-center'>{favoritePhrasalVerbs.length}</span>
                    </div>
                ) : null}

                {favoritePhrasalVerbs.length && show ? (
                    <div className='fixed h-screen max-w-[300px] bg-gray-200 top-0 right-0 duration-500 p-2 z-20'>
                        {favoritePhrasalVerbs.map((item) => (
                            <div key={item._id}>
                                <h2>{item.verb}</h2>
                                <p>{item.example}</p>
                                <FaHeart onClick={() => {
                                    favorites(item)
                                    if (favoritePhrasalVerbs.length === 1) {
                                        setShow(false); // Close the sidebar when the last favorite item is removed
                                      }
                                }}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='fixed h-screen max-w-[300px] bg-gray-200 top-0 right-[-110%] duration-500'>
                        {favoritePhrasalVerbs.map((item) => (
                            <div key={item._id}>
                                <div>
                                    <h2>{item.verb}</h2>
                                    <p>{item.example}</p>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {favoritePhrasalVerbs.length && show ? 
                (<div onClick={() => setShow(false)} className='h-screen w-screen fixed top-0 left-0 bg-black/50'></div>) 
                : null}
            </div>
        </div>
    </div>
  )
}

export default Navbar