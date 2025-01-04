import React from 'react';

export default function Forecast({ forecast }) {
  return (
    <div className="forecast">
      {forecast.slice(0, 7).map((item, i) => (
        <div key={i} className="forecast-item">
          <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
          <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Ikona pogody" className="forecast-item-img" />
          <p>{item.weather[0].description}</p>
          <p>🌡️ {Math.round(item.main.temp)}°C</p>
          
        </div>
      ))}
    </div>
  );
}
