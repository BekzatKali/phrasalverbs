'use client'

import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { useSession } from 'next-auth/react';

type UserCardProps = {
  id: string,
  name: string,
  email: string,
  isAdmin: boolean,
  updatePhrasalVerbs: (email: string) => void;
}

const UserCard = ({id, name, email, isAdmin, updatePhrasalVerbs}: UserCardProps) => {
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
      <div className='ring-2 p-4 rounded-md'>
        <div className='mb-2 flex flex-col gap-2'>
          <p className='flex items-center gap-2'><FaUserAlt /> <span>Name: {name}</span></p>
          <p className='flex items-center gap-2'><MdEmail /> Email: {email}</p>
          <p className='flex items-center gap-2'><FaShieldAlt />isAdmin: {String(isAdmin)}</p>
        </div>
        <button 
          onClick={deletingUser} 
          className='py-2 px-6 bg-red-500 hover:bg-red-600 w-full text-white rounded-md'>
            Delete
        </button>
      </div>
  )
}

export default UserCard