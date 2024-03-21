'use client'

import React, { useState } from 'react';
import Button from './Button';

type Props = {
    id: string,
    verb: string,
    example: string,
    setEdited?: React.Dispatch<React.SetStateAction<boolean>>,
    updatePhrasalVerbs?: () => void;
}

const EditForm = ({ verb, example, id, setEdited, updatePhrasalVerbs }: Props) => {
    const [newVerb, setNewVerb] = useState(verb);
    const [newExample, setNewExample] = useState(example);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/phrasalverbs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newVerb, newExample })
            });

            if (!response.ok) {
                throw new Error("Failed to update phrasal verb");
            }
            setEdited?.(false);
            updatePhrasalVerbs?.();
        } catch (error) {
            console.log("Error updating phrasal verb", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-full'>
            <div className='mb-2'>
                <input
                    type="text"
                    onChange={(e) => setNewVerb(e.target.value)}
                    value={newVerb}
                    className='text-xl w-full outline-none font-bold capitalize'
                />
                <input
                    className='outline-none w-full'
                    type="text"
                    onChange={(e) => setNewExample(e.target.value)}
                    value={newExample}
                />
            </div>
            <Button buttonAction="Update" />
        </form>
    );
}

export default EditForm;
