import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import Form from './Form';
import PhrasalVerb from './PhrasalVerb';

type PhrasalVerbType = {
    _id: string, 
    verb: string,
    example: string
}

type PhrasalVerbsWrapperProps = {
    userEmail: string,
    phrasalVerbs: PhrasalVerbType[],
    updatePhrasalVerbs: (email: string) => void
}

const PhrasalVerbsWrapper = ({userEmail, phrasalVerbs, updatePhrasalVerbs}: PhrasalVerbsWrapperProps) => {
  
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = phrasalVerbs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(phrasalVerbs.length / itemsPerPage);

  const handlePageClick = (event: {selected: number}) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div>
        <div className='min-h-[80vh] flex justify-center flex-col pb-2'>
          <div className='mb-4 flex-grow'>
          {userEmail && <Form updatePhrasalVerbs={updatePhrasalVerbs} />}
          <p className='mb-2'>The total number of the phrasal verbs: {phrasalVerbs.length}</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {phrasalVerbs && currentItems.map((item: PhrasalVerbType) => (
                <PhrasalVerb 
                  key={item._id}
                  _id={item._id}
                  verb={item.verb}
                  example={item.example}
                  updatePhrasalVerbs={updatePhrasalVerbs}
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
    </div>
  )
}

export default PhrasalVerbsWrapper