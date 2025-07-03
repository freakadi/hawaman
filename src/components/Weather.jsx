import React, { useState } from 'react';
import Information from './Information';
const Weather = () => {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${import.meta.env.VITE_OPENWEATHER_API}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? "City not found" : "Failed to fetch weather data");
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Weather App</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter city name"
        style={{ padding: '8px', width: '200px' }}
      />
      <button 
        onClick={fetchWeather} 
        style={{ marginLeft: '10px', padding: '8px' }}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <Information data={data} />}
    </div>
  );
};

export default Weather;