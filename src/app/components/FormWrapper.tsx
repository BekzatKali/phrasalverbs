'use client'

import React, { useEffect, useState } from 'react';
import Form from './Form';
import PhrasalVerb from './PhrasalVerb';
import ReactPaginate from 'react-paginate';
import { useSession } from 'next-auth/react';
import UserCard from './UserCard';

type PhrasalVerbType = {
  _id: string, 
  verb: string,
  example: string
}

type UserType = {
  _id: string,
  name: string,
  email: string,
  isAdmin: boolean
}

const FormWrapper = () => {
  const [phrasalVerbs, setPhrasalVerbs] = useState<PhrasalVerbType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [itemOffset, setItemOffset] = useState(0);

  const {data: session} = useSession();
  console.log(session);
  
  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = phrasalVerbs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(phrasalVerbs.length / itemsPerPage);
  
  const handlePageClick = (event: {selected: number}) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };
  
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
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (userEmail) {
      fetchPhrasalVerbs(userEmail);
    }
  }, [userEmail]);

  const usersToDisplay = users.filter(user => !user.isAdmin);

  return (
    <div>
      {/* <h1>Greatness</h1> */}
      {usersToDisplay && usersToDisplay.length ? (
        <div>
        <p className='mb-2'>The total numbers of users: {usersToDisplay.length}</p>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>

          {usersToDisplay.map((user) => (
            <UserCard 
              key={user._id} 
              id={user._id} 
              name={user.name} 
              email={user.email} 
              isAdmin={user.isAdmin}
              updatePhrasalVerbs={fetchPhrasalVerbs}
            />
          ))}
        </div>

        </div>
        ) : (
        <div className='min-h-[80vh] flex justify-center flex-col pb-2'>
          <div className='mb-4 flex-grow'>
          {userEmail && <Form updatePhrasalVerbs={fetchPhrasalVerbs} />}
          <p className='mb-2'>The total number of the phrasal verbs: {phrasalVerbs.length}</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {phrasalVerbs && currentItems.map((item: PhrasalVerbType) => (
                <PhrasalVerb 
                  key={item._id}
                  id={item._id}
                  verb={item.verb}
                  example={item.example}
                  updatePhrasalVerbs={fetchPhrasalVerbs}
                />
              ))}
            </div>
          </div>
          {phrasalVerbs.length >= 10 && (
            <ReactPaginate
              className='flex gap-2 justify-center items-center'
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              pageLinkClassName='page-num'
              previousLinkClassName='prev-btn'
              nextLinkClassName='next-btn'
              activeClassName='active'
            />
          )}
        </div>
        
      )}
      {/* <h1>Zdarova</h1> */}
    </div>
  );
};

export default FormWrapper;
