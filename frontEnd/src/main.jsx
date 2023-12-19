import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './Index.jsx'
import Home from './Home.jsx';
import './global.css'
import NotFound from './NotFound.jsx';
import { App } from 'antd';

const isDev = import.meta.env.VITE_ENV === 'development'

if (isDev) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Home current={"dashboard"} />} />
            <Route path="/devices" element={<Home current={"devices"} />} />
            <Route path="/search" element={<Home current={"search"} />} />
            <Route path="/settings" element={<Home current={"settings"} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </App>
    </React.StrictMode>,
  )
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Home current={"dashboard"} />} />
          <Route path="/devices" element={<Home current={"devices"} />} />
          <Route path="/search" element={<Home current={"search"} />} />
          <Route path="/settings" element={<Home current={"settings"} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </App>,
  )
}
