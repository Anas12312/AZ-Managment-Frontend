import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/index.css'
import AppRouter from './router/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 

const rootEl = document.getElementById('root')

ReactDOM.createRoot(rootEl).render(
    <div>
        <AppRouter />
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>
)
