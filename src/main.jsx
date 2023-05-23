import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/index.css'
import AppRouter from './router/AppRouter'

ReactDOM.createRoot(document.getElementById('root')).render(
    <div className=' bg-gray-800 container mx-auto px-6 text-neutral-200'>
        <AppRouter />
    </div>
)
