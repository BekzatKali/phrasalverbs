import React from 'react'

type Props = {
    action: string
}

const Button = ({action}: Props) => {
  return (
    <button className='bg-green-600 text-white py-2 rounded-md duration-300 w-full hover:bg-green-700'>
        {action}
    </button>
  )
}

export default Button