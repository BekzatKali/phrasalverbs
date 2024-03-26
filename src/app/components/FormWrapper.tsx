'use client'

import React, { useEffect, useState } from 'react';
import Form from './Form';
import PhrasalVerb from './PhrasalVerb';
import ReactPaginate from 'react-paginate';
import { useSession } from 'next-auth/react';

type PhrasalVerbType = {
  _id: string, 
  verb: string,
  example: string
}

const FormWrapper = () => {
  const [phrasalVerbs, setPhrasalVerbs] = useState<PhrasalVerbType[]>([]);
  const [itemOffset, setItemOffset] = useState(0);

  const {data: session} = useSession();
  
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

      const { phrasalVerbs } = await res.json();

      if (phrasalVerbs) {
        setPhrasalVerbs(phrasalVerbs);
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userEmail) {
      fetchPhrasalVerbs(userEmail);
    }
  }, [userEmail]);

  return (
    <div className='min-h-[80vh] flex justify-center flex-col pb-2'>
      <div className='mb-4 flex-grow'>
        <Form updatePhrasalVerbs={fetchPhrasalVerbs} />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {phrasalVerbs && currentItems.map((item: PhrasalVerbType) => (
            <PhrasalVerb updatePhrasalVerbs={fetchPhrasalVerbs}
              key={item._id}
              id={item._id}
              verb={item.verb}
              example={item.example}
            />
          ))}
        </div>
      </div>
      <ReactPaginate
        className='flex gap-6 justify-center'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='next-btn'
        activeClassName='active'
      />
    </div>
  );
};

export default FormWrapper;
