import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'
import Home from './Home'
import DBHome from './pages/DBHome'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';


const container = document.getElementById('root')

const root = createRoot(container)

root.render(
    <React.StrictMode>
        {/* <App/> */}
        {/* <AppRouter /> */}
        {/* <Home /> */}
        {/* <DBHome /> */}
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Navigate to='/' />} />
                <Route path='/' element={<Home />} />
                <Route path='/dbHome' element={<DBHome />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
