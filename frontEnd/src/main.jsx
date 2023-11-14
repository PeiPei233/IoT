import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './Index.jsx'
import Dashboard from './Dashboard.jsx';
import './global.css'
import NotFound from './NotFound.jsx';
import { App } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </App>
  </React.StrictMode>,
)
