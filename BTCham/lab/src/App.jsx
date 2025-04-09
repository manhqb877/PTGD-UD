import { useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './assets/pages/Dashboard'
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Other routes */}
      </Routes>
    </Router>
    </>
  )
}

export default App
