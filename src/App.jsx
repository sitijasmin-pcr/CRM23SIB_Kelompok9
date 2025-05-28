import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Sidebar from './components/Sidebar'
import MainLayout from './components/MainLayout'
import SalesManagement from './Pages/SalesManagement'
import ShiftManagement from './Pages/ShiftManagement'
import BranchOutlet from './Pages/BranchOutlet'; // atau sesuaikan path-nya



function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/Sales" element={<SalesManagement />}/>
          <Route path="/shift" element={<ShiftManagement />}/>
          <Route path="/outlets" element={<BranchOutlet />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
