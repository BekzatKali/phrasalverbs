"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { usePhrasalVerbsInfoContext } from '../context/PhrasalVerbsProvider'

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  const userEmail = session?.user?.email;

  const { favoritePhrasalVerbs, favorites } = usePhrasalVerbsInfoContext();

  const usersPhrasalVerbsDisplay = favoritePhrasalVerbs.filter((item) => item.userEmail === userEmail);

  return (
    <div className='bg-slate-500 mb-4'>
        <div className='flex justify-between gap-1 items-center max-w-[1420px] mx-auto px-4 py-4'>
            <Link className='hover:text-yellow-200 text-white duration-300 font-bold text-xl max-sm:text-sm w-fit flex-1' href='/dashboard'>
                Phrasal Verbs
            </Link>
            <div className='flex gap-1 min-[375px]:gap-2 items-center'>
                    <div className='text-white bg-black px-6 py-2 rounded-md max-sm:px-1 max-sm:py-1 max-[500px]:max-w-[180px] overflow-hidden break-words'>
                        <p className='max-sm:text-xs max-[500px]:flex flex-col'>
                            <span className='text-white'>Name: </span> <span className='text-yellow-200 font-bold'>{session?.user?.name}</span>
                        </p>
                        <p className='max-sm:text-xs max-[500px]:flex flex-col'>
                            <span className='text-yellow-200'>Email: </span> <span className='text-white font-bold'>{session?.user?.email}</span>
                        </p>
                    </div>

                    {userEmail && (
                        <div className='text-white flex-shrink-0'>
                            <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })} className='hover:text-yellow-200 max-sm:text-xs text-white duration-300'>
                                Log Out
                            </button>
                        </div>
                    )}

                    {(usersPhrasalVerbsDisplay.length && userEmail) ? (
                        <div className='relative cursor-pointer' onClick={() => setShow(true)}>
                            <FaHeart className='w-7 h-7' />
                            <span className='bg-red-700 text-white p-1 rounded-full absolute w-[22px] h-[22px] right-[-6px] bottom-[-10px] flex justify-center items-center'>{usersPhrasalVerbsDisplay.length}</span>
                        </div>
                    ) : null}

                    {usersPhrasalVerbsDisplay.length && show ? (
                        <div className='fixed h-screen min-w-[400px] max-[500px]:min-w-[200px] max-[500px]:max-w-[240px]  bg-gray-200 top-0 right-0 duration-500 p-4 z-20 flex flex-col gap-4'>
                            {usersPhrasalVerbsDisplay.map((item) => (
                                <div className='ring-1 flex justify-between items-center gap-4 p-2 ring-green-600 rounded-md' 
                                    key={item._id}>
                                    <div>
                                        <h2 className='font-bold'>{item.verb}</h2>
                                        <p>{item.example}</p>
                                    </div>
                                    <div onClick={() => {
                                            favorites(item);
                                            if (usersPhrasalVerbsDisplay.length === 1) {
                                                setShow(false); 
                                            }
                                        }}
                                    >
                                        <FaHeart className='cursor-pointer hover:text-red-700 duration-75 min-w-3 min-h-3' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='fixed h-screen max-w-[300px] bg-gray-200 top-0 right-[-110%] duration-500'>
                            {usersPhrasalVerbsDisplay.map((item) => (
                                <div key={item._id}>
                                    <div>
                                        <h2>{item.verb}</h2>
                                        <p>{item.example}</p>  
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {usersPhrasalVerbsDisplay.length && show ? 
                    (<div onClick={() => setShow(false)} className='h-screen w-screen fixed top-0 left-0 bg-black/50'></div>) 
                    : null}
            </div>
        </div>
    </div>
  )
}

export default Navbar