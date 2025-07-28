import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css'
import App from './App'
import List from './List';
import DailyList from './DailyList';
import AboutUs from './AboutUs';
import DailyListById from './DailyListById'
import Cadastro from './Cadastro'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/List' element={<List/>}/>
        <Route path='/DailyList' element={<DailyList/>}/>
        <Route path='/rotina/:id' element={<DailyListById/>}/>
        <Route path='/Cadastro' element={<Cadastro/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)