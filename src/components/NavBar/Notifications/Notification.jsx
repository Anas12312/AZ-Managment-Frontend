import React from 'react'
import Invitation from './Invitation'
import JoinedUnit from './JoinedUnit'
import CreatedNode from './CreatedNode'
import CreatedResource from './CreatedResource'
import ResourceEdited from './ResourceEdited'

export default function Notification(props) {
  return (
    <div>
          {props.type === 'Invitation' && <Invitation {...props} />}
          {props.type === 'Unit' && <JoinedUnit {...props} />}
          {props.type === 'Node' && <CreatedNode {...props} />}
          {props.type === 'Resource' && <div>{props.message === 'CREATE'?(<CreatedResource {...props} />):(<ResourceEdited {...props} />)}</div>}
    </div>
  )
}
