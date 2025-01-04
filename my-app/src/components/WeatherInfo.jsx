import React from 'react';

export default function WeatherInfo({ weather, windDirection, toggleForecast, showForecast }) {
    return (
        <div className="weather-info">
            <h2>{weather.name}</h2>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Ikona pogody" className="weather-info-img" />
            <p>🌡️ Temp: {Math.round(weather.main.temp)}°C</p>
            <p>🌥️ {weather.weather[0].description}</p>
            <p>💨 Wiatr: {weather.wind.speed} m/s, {windDirection(weather.wind.deg)}</p>
            <p>🌅 Wschód: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()} | 🌇 Zachód: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            <button onClick={toggleForecast} className="forecast-button">
                {showForecast ? 'Ukryj prognozę' : 'Pokaż prognozę na 7 dni'}
            </button>
        </div>
    );
}
