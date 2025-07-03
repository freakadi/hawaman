import React, { useEffect, useState } from 'react';
import Information from './Information';
const apiKey = import.meta.env.VITE_OPENWEATHER_API;

const LocationWeather = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (err) => {
        setError("Location access denied or not available");
        console.error(err);
      }
    );
  }, []);

  // Fetch weather after coords are updated
  useEffect(() => {
    const fetchWeather = async () => {
      if (!coords.lat || !coords.lon) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
        );
        const weatherData = await response.json();
        setData(weatherData);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords.lat, coords.lon]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <Information data={data} />}
    </div>
  );
};

export default LocationWeather;
