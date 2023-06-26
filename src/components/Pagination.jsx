import React, { useEffect } from 'react'

export default function ({count, page, setPage}) {
    useEffect(()=>{
        let selected = document.getElementById(page);
        if(selected) {
            selected.classList.add("bg-black")
        }
        
        
    },[page])
  return (
    <div className='w-full justify-around'>
        <nav aria-label="Page navigation example" className='flex justify-center'>
            <ul className="inline-flex -space-x-px">
                <li>
                    <a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">"Previous</a>
                </li>
                {
                    Array.from(Array(parseInt(count/6)+1).keys()).map((ele, no)=> (
                        <li key={no+1} onClick={() => {setPage(no)}}>
                            <a href="#" id={no} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{no+1}</a>
                        </li>))
                }
                <li>
                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ">Next</a>
                </li>
            </ul>
        </nav>

    </div>
  )
}
