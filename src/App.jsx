import { useState,useEffect } from 'react'
import { Route,Routes,Link } from 'react-router-dom'
import Weather from './components/Weather'
import LocationWeather from './components/LocationWeather'
function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hawaman</h1>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/weather" style={{ marginRight: '20px' }}>Search City</Link>
        <Link to="/location">My Location</Link>
      </nav>

      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/location" element={<LocationWeather />} />
        <Route path="*" element={<p>404 - Page not found</p>} />
      </Routes>
    </div>
  )
}

export default App
