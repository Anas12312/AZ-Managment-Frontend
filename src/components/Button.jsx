import React from 'react'

const DEFAULT = 
'bg-gradient-to-l from-green-700 from-20 to-blue-500 to-10 background-animate-1 rounded-md px-2 py-1 text-slate-100 font-bold'


export default function Button(props) {

  return (
    <button 
    className={props.className}
    onClick={props.onClick}
    >
      {props.title}
    </button>
  )
}
