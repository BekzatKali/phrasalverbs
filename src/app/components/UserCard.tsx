'use client'

import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { useSession } from 'next-auth/react';

type UserCardProps = {
  id: string,
  name: string,
  email: string,
  createdAt: string,
  phrasalVerbs: [],
  updatePhrasalVerbs: (email: string) => void;
}

const UserCard = ({id, name, email, phrasalVerbs, createdAt, updatePhrasalVerbs}: UserCardProps) => {
  const {data: session} = useSession();
  const userEmail = session?.user?.email

  const deletingUser = async () => {
    try {
      const confirmed = confirm('Are you sure you want to delete this user?');
      if (confirmed) {
        const res = await fetch(`/api/admin/?id=${id}`, {
          method: "DELETE",
        })
        if (res.ok) {
          updatePhrasalVerbs(userEmail as string);
          console.log("User deleted")
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <div className='ring-2 p-4 rounded-md max-[500px]:p-2'>
        <div className='mb-2 flex flex-col gap-2 max-sm:text-[14px]'>
          <p className='flex items-center gap-2'>
            <FaUserAlt className='min-w-[20px] max-[500px]:min-w-[14px]'/> Name: <span className='font-bold'>{name}</span>
          </p>
          <p className='flex items-center gap-2'>
            <MdEmail className='min-w-[20px] max-[500px]:min-w-[14px]'/> Email: <span className='font-bold overflow-hidden break-words'>{email}</span>
          </p>
          <p className='flex items-center gap-2'>
            <FaBookmark className='min-w-[20px] max-[500px]:min-w-[14px]'/> Number of Phrasal Verbs: <span className='font-bold'>{phrasalVerbs.length}</span>
          </p>
          <p className='flex items-center gap-2'>
            <MdOutlineAccessTimeFilled className='min-w-[20px] max-[500px]:min-w-[14px]'/> Created at: <span className='font-bold'>{createdAt.slice(0, 10)}</span>
          </p>
        </div>
        <button 
          onClick={deletingUser} 
          className='py-2 px-6 bg-red-500 hover:bg-red-600 w-full text-white rounded-md max-sm:py-1 max-sm:px-4'>
            Delete
        </button>
      </div>
  )
}

export default UserCard