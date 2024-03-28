'use client'

import React, { useState } from 'react';
import Button from './Button';
import { useSession } from 'next-auth/react';

type FormProps = {
  updatePhrasalVerbs: (email: string) => void;
};

const Form = ({ updatePhrasalVerbs }: FormProps) => {
  const [verb, setVerbValue] = useState('');
  const [example, setExampleValue] = useState('');

  const {data: session} = useSession();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userEmail = session?.user?.email
    
    if (!verb || !example) {
      alert('Verb and example are required');
      return;
    }
    
    try {
      const res = await fetch("/api/phrasalVerbs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ verb, example, userEmail }),
      });
      
      if (res.ok) {
        updatePhrasalVerbs(userEmail as string);
        setVerbValue('');
        setExampleValue('');
      } else {
        throw new Error('Failed to add phrasal verb');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  

  return (
    <form onSubmit={handleSubmit} className='ring-2 ring-green-600 flex flex-col p-4 mb-4 rounded-md'>
      <input
        value={verb}
        onChange={(e) => setVerbValue(e.target.value)}
        className='outline-none capitalize mb-3 font-bold placeholder:font-bold'
        type="text"
        placeholder='Write a Phrasal Verb'
      />
      <input
        value={example}
        onChange={(e) => setExampleValue(capitalizeFirstLetter(e.target.value))}
        className='outline-none font-bold placeholder:font-bold'
        type="text"
        placeholder='Write An Example'
      />
      <div className='flex justify-end mt-2'>
        <Button buttonAction="Add" />
      </div>
    </form>
  );
};

export default Form;
