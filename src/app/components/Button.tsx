import React from 'react'

type Props = {
  buttonAction: string
}

const Button = ({buttonAction}: Props) => {
  return (
    <button className='bg-green-600 text-white py-2 rounded-md duration-300 w-full hover:bg-green-700'>
        {buttonAction}
    </button>
  )
}

export default Button