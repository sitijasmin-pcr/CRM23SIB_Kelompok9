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


function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/customer" element={<Customer />}/>
          <Route path="/Sales" element={<SalesManagement />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
