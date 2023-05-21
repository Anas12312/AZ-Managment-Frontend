import React from 'react'

export default function Link(props) {
  return (
    <span style={{color: "blue"}} onClick={props.onClick}>
        {props.text}
    </span>
  )
}
