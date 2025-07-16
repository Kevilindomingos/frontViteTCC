import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css'
import App from './App'
import List from './List';
import DailyList from './DailyList';
import AboutUs from './AboutUs';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/List' element={<List/>}/>
        <Route path='/DailyList' element={<DailyList/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)