import React from 'react'

export default function Button(props) {
  return (
    <button className='font-bold' onClick={props.onClick}>{props.title}</button>
  )
}
