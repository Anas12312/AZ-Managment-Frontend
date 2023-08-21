import React, { useEffect, useState } from 'react'
import { FaPlug, FaPlus } from 'react-icons/fa';

export default function DropDownButton({ innerText, options, children }) {
    const [dropDownHidden, setDropDownHidden] = useState(true)

    const toggileDropDownHidden = (e) => {  
        e.stopPropagation()
        setDropDownHidden(!dropDownHidden);
    }
    useEffect(()=>{
        document.addEventListener('click', ()=>{
            setDropDownHidden(true)
        })
    })
    return (
        <div className='relative'>
            <div onClick={(toggileDropDownHidden)}>
                {children}
            </div>
            <div hidden={dropDownHidden} id="dropdown" className="top-5 right-5 z-10 bg-secondary-3 divide-y divide-gray-100 rounded-lg shadow-md w-44 absolute">
                <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                    {
                        options.map((option, i) => {
                            return (
                                <li id={i} key={i}>
                                    <span 
                                        id={option.innerText}
                                        onClick={(e) => {
                                            setDropDownHidden(!dropDownHidden);
                                            option.action(e)
                                            e.stopPropagation()
                                        }}
                                        className="select-none block bg-secondary-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >{option.innerText}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
