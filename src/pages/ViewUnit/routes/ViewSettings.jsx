import React from 'react'
import { useParams } from 'react-router-dom'

export default function ViewSettings() {
    const params = useParams()

    return (
        <div className='flex flex-row h-[99%] top-14'>
            <div className='w-full'>
                Settings
            </div>
        </div>
    )
}
