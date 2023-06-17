import React from 'react'

export default function Link(props) {
  return (
    <span className='text-secondary-3 hover:cursor-pointer underline hover:no-underline' onClick={props.onClick}>
        {props.text}
    </span>
  )
}
