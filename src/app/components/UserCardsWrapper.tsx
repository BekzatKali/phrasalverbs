import React from 'react'
import UserCard from './UserCard'

type UserType = {
    _id: string,
    name: string,
    email: string,
    phrasalVerbs: [],
    isAdmin: boolean,
}

type UserCardsWrapperProps = {
    usersToDisplay: UserType[],
    updatePhrasalVerbs: (email: string) => void,
}

const UserCardsWrapper = ({usersToDisplay, updatePhrasalVerbs}: UserCardsWrapperProps) => {
  return (
    <div>
        <div>
            <p className='mb-2 max-sm:text-[14px]'>The total numbers of users: {usersToDisplay.length}</p>
            <div className='grid grid-cols-1  gap-4'>
                {usersToDisplay.map((user) => (
                    <UserCard 
                        key={user._id} 
                        id={user._id} 
                        name={user.name} 
                        email={user.email} 
                        phrasalVerbs={user.phrasalVerbs}
                        updatePhrasalVerbs={updatePhrasalVerbs}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default UserCardsWrapper