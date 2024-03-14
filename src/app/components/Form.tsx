'use client'
import React, { useState } from 'react';
import Button from './Button';

type FormProps = {
  updatePhrasalVerbs: () => void;
};

const Form: React.FC<FormProps> = ({ updatePhrasalVerbs }) => {
  const [verb, setVerbValue] = useState('');
  const [example, setExampleValue] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!verb || !example) {
      alert('Verb and example are required');
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/phrasalverbs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verb, example }),
      });
      
      if (res.ok) {
        updatePhrasalVerbs();
        setVerbValue('');
        setExampleValue('');
      } else {
        throw new Error('Failed to add phrasal verb');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='ring-2 ring-orange-600 flex flex-col p-4 mb-4 rounded-md'>
      <input
        value={verb}
        onChange={(e) => setVerbValue(e.target.value)}
        className='outline-none capitalize mb-3 font-bold placeholder:font-bold'
        type="text"
        placeholder='Write a Phrasal Verb'
      />
      <input
        value={example}
        onChange={(e) => setExampleValue(e.target.value)}
        className='outline-none font-bold placeholder:font-bold'
        type="text"
        placeholder='Write An Example'
      />
      <div className='flex justify-end mt-2'>
        <Button action="Add" />
      </div>
    </form>
  );
};

export default Form;
