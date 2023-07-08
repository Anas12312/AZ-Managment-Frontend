import React, { useEffect, useState } from 'react'
import { FaPlug, FaPlus } from 'react-icons/fa';

export default function DropDownButton({ innerText, options }) {
    const [dropDownHidden, setDropDownHidden] = useState(true)

    const toggileDropDownHidden = (e) => {  
        e.stopPropagation()
        setDropDownHidden(!dropDownHidden);
    }

    return (
        <div>
            <button
                id="dropdownDefaultButton"
                onClick={(toggileDropDownHidden)}
                className="node-option"
                type="button">{innerText}
                <FaPlus />
            </button>
            <div hidden={dropDownHidden} id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
                <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                    {
                        options.map((option, i) => {
                            return (
                                <li id={i}>
                                    <span 
                                        id={option.innerText}
                                        onClick={(e) => {
                                            toggileDropDownHidden()
                                            option.action()
                                        }}
                                        className="block px-4 py-2 hover:bg-gray-100  "
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
