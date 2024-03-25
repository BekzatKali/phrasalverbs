'use client'

import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditForm from './EditPhrasalVerbForm';
import { useSession } from 'next-auth/react';

type FormProps = {
  id: string
  verb: string, 
  example: string
  updatePhrasalVerbs: (email: string) => void;
};

const PhrasalVerb = ({verb, example, id, updatePhrasalVerbs}: FormProps) => {
  const [edited, setEdited] = useState<boolean>(false);
  const {data: session} = useSession();
  const userEmail = session?.user?.email
  console.log('phrasalverb', id)

  const removePhrasalVerb = async () => {
    const res = await fetch(`/api/phrasalVerbs?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      updatePhrasalVerbs(userEmail as string);
    }
  }

  return (
    <div className='ring-2 shadow-lg ring-green-600 px-4 py-4 flex justify-between gap-1 rounded-md'>
      {edited ? (
        <EditForm
          id={id}
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
          <div className='flex items-center justify-center gap-1'>
            <FaEdit className='cursor-pointer hover:text-green-700 duration-75' onClick={() => setEdited(true)} size={24} />
            <MdDelete className='cursor-pointer hover:text-red-800 duration-75' onClick={removePhrasalVerb} size={24} />
          </div>
        </>
      )}
    </div>
  );
}

export default PhrasalVerb;


// from experiment branch 