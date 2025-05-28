import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Sidebar from './components/Sidebar'
import MainLayout from './components/MainLayout'
import Customer from './Pages/Customer'
import SalesManagement from './Pages/SalesManagement'
import ProdukTerlaris from './Pages/ProdukTerlaris'
import Feedback from './Pages/Feedback'
import Faq from './Pages/FAQ'


function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/customer" element={<Customer />}/>
          <Route path="/sales" element={<SalesManagement />}/>
          <Route path="/produkTerlaris" element={<ProdukTerlaris />}/>
          <Route path="/feedback" element={<Feedback />}/>
          <Route path="/faq" element={<Faq />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
