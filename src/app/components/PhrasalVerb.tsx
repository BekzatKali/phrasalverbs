'use client'
import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditForm from './EditPhrasalVerbForm';

type FormProps = {
  id: string
  verb: string, 
  example: string
  updatePhrasalVerbs: () => void;
};

const PhrasalVerb = ({verb, example, id, updatePhrasalVerbs}: FormProps) => {
  const [edited, setEdited] = useState<boolean>(false);

  const removePhrasalVerb = async () => {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/phrasalverbs?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        updatePhrasalVerbs();
      }
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
            <FaEdit className='cursor-pointer' onClick={() => setEdited(true)} size={24} />
            <MdDelete className='cursor-pointer' onClick={removePhrasalVerb} size={24} />
          </div>
        </>
      )}
    </div>
  );
}

export default PhrasalVerb;


