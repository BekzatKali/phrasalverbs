"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type PhrasalVerbType = {
  _id: string,
  verb: string,
  example: string,
  userEmail: string
}

type PhrasalVerbsInfoContext = {
  favoritePhrasalVerbs: PhrasalVerbType[],
  setFavoritePhrasalVerbs: React.Dispatch<React.SetStateAction<PhrasalVerbType[]>>,
  favorites: (phrasalVerb: PhrasalVerbType) => void;
}

const PhrasalVerbsInfoContext = createContext({} as PhrasalVerbsInfoContext);

export function usePhrasalVerbsInfoContext() {
  return useContext(PhrasalVerbsInfoContext);
}

const PhrasalVerbsProvider = ({children}: {children: React.ReactNode}) => {
  const [favoritePhrasalVerbs, setFavoritePhrasalVerbs] = useState<PhrasalVerbType[]>(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favoritePhrasalVerbs');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favoritePhrasalVerbs', JSON.stringify(favoritePhrasalVerbs));
  }, [favoritePhrasalVerbs]);

  const favorites = (phrasalVerb: PhrasalVerbType) => {
    const {_id, verb, example, userEmail} = phrasalVerb;

    const adding = {
      _id: _id,
      verb: verb,
      example: example,
      userEmail: userEmail as string
    }

    const isAlreadyFavorite = favoritePhrasalVerbs.some(item => item._id === _id);

    if (isAlreadyFavorite) {
      setFavoritePhrasalVerbs((prev) => prev.filter(item => item._id !== _id));
    } else {
      setFavoritePhrasalVerbs((prev) => [...prev, adding]);
    }
  }

  return (
    <PhrasalVerbsInfoContext.Provider
      value={{
        favoritePhrasalVerbs,
        setFavoritePhrasalVerbs,
        favorites
      }}
    >
      {children}
    </PhrasalVerbsInfoContext.Provider>
  )
}

export default PhrasalVerbsProvider
