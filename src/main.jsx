import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/index.css'
import AppRouter from './router/AppRouter'

const rootEl = document.getElementById('root')

ReactDOM.createRoot(rootEl).render(
    <div>
        <AppRouter />
    </div>
)
