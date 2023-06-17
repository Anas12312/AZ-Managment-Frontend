import React from 'react'

export default function Link(props) {
  return (
    <span className='text-primary-1 hover:cursor-pointer hover:underline' onClick={props.onClick}>
        {props.text}
    </span>
  )
}
