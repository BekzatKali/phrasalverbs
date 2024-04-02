"use client"

import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import EditForm from './EditPhrasalVerbForm';
import { useSession } from 'next-auth/react';
import { usePhrasalVerbsInfoContext } from '../context/PhrasalVerbsProvider';

type FormProps = {
  _id: string
  verb: string, 
  example: string
  updatePhrasalVerbs: (email: string) => void;
};

const PhrasalVerb = ({verb, example, _id, updatePhrasalVerbs}: FormProps) => {
  const [edited, setEdited] = useState<boolean>(false);
  const {data: session} = useSession();
  const userEmail = session?.user?.email

  const { favorites } = usePhrasalVerbsInfoContext();

  const removePhrasalVerb = async () => {
    const res = await fetch(`/api/phrasalVerbs?id=${_id}`, {
      method: "DELETE",
    });
    
    if (res.ok) {
      updatePhrasalVerbs(userEmail as string);
    }
  }

  const handleFavoriteClick = () => {
    const phrasalVerb = {
      _id: _id,
      verb: verb,
      example: example,
      userEmail: userEmail as string
    };

    favorites(phrasalVerb);
  }

  return (
    <div className='ring-2 shadow-lg ring-green-600 px-4 py-4 flex justify-between gap-1 rounded-md'>
      {edited ? (
        <EditForm
          id={_id}
          verb={verb}
          example={example}
          setEdited={setEdited}
          updatePhrasalVerbs={updatePhrasalVerbs}
        />
      ) : (
        <>
          <div className='flex flex-col gap-1'>
            <h1 className='text-xl break-words font-bold capitalize'>{verb}</h1>
            <p>{example}</p>
          </div>
          <div onClick={handleFavoriteClick} className='flex items-center justify-center gap-1'>
            <div className='min-w-6 min-h-6 flex justify-center items-center'>
              <FaHeart  className='cursor-pointer hover:text-red-700 duration-75 min-w-6 min-h-6'/>
            </div>
            <div onClick={() => setEdited(true)} className='min-w-6 min-h-6 flex justify-center items-center'>
              <FaEdit className='cursor-pointer hover:text-green-700 duration-75 min-w-6 min-h-6' 
                />
            </div>
            <div onClick={removePhrasalVerb}  className='min-w-6 min-h-6 flex justify-center items-center'>
              <MdDelete className='cursor-pointer hover:text-red-800 duration-75 min-w-6 min-h-6' 
               />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PhrasalVerb;