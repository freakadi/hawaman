import React from 'react';

const Information = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-6 p-6 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg max-w-md mx-auto text-gray-800">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Weather in {data.name}, {data.sys?.country}
      </h3>
      <ul className="space-y-2 text-lg">
        <li>🌡️ Temperature: <span className="font-medium">{data.main.temp}°C</span></li>
        <li>🥵 Feels like: <span className="font-medium">{data.main.feels_like}°C</span></li>
        <li>🌤️ Condition: <span className="font-medium">{data.weather[0].main}</span> ({data.weather[0].description})</li>
        <li>💧 Humidity: <span className="font-medium">{data.main.humidity}%</span></li>
        <li>🌬️ Wind: <span className="font-medium">{data.wind.speed} m/s</span></li>
      </ul>
    </div>
  );
};

export default Information;
