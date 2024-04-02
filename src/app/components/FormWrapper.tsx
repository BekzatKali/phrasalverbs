'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import UserCardsWrapper from './UserCardsWrapper';
import PhrasalVerbsWrapper from './PhrasalVerbsWrapper';

type PhrasalVerbType = {
  _id: string, 
  verb: string,
  example: string
}

type UserType = {
  _id: string,
  name: string,
  email: string,
  createdAt: string,
  phrasalVerbs: [],
  isAdmin: boolean,
}

type UserCardsWrapper = {
  usersToDisplay: UserType[]
}

type PhrasalVerbsWrapper = {
  userEmail: string
  phrasalVerbs: PhrasalVerbType[]
}

const FormWrapper = () => {
  const [phrasalVerbs, setPhrasalVerbs] = useState<PhrasalVerbType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(users, 'users')

  const {data: session} = useSession();
  const userEmail = session?.user?.email;
  
  const fetchPhrasalVerbs = async (userEmail?: string) => {
    try {
      const res = await fetch(`/api/phrasalVerbs/?email=${userEmail}`, {
        cache: "no-store",
      });
  
      const data = await res.json();
  
      if ('users' in data) {
        setUsers(data.users);
      }
  
      if ('phrasalVerbs' in data) {
        setPhrasalVerbs(data.phrasalVerbs);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const isAdmin = users.some(user => user.isAdmin);
  const usersToDisplay = users.filter(user => !user.isAdmin);
  
  useEffect(() => {
    if (userEmail) {
      fetchPhrasalVerbs(userEmail);
    }
    console.log('success is coming for me')
  }, [userEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pb-4'>
      { isAdmin ? (
        <UserCardsWrapper 
          usersToDisplay={usersToDisplay}
          updatePhrasalVerbs={fetchPhrasalVerbs}
        />
      ) : (
        !isAdmin && (
          <PhrasalVerbsWrapper 
            userEmail={userEmail as string}
            phrasalVerbs={phrasalVerbs}
            updatePhrasalVerbs={fetchPhrasalVerbs}
          />
        )
      )}
    </div>
  );
};

export default FormWrapper;