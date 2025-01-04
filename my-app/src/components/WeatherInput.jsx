import React from 'react';

export default function WeatherInput({ city, setCity, fetchWeather, error }) {
    return (
        <div className="input-section">
            <input
                type="text"
                placeholder="Wpisz nazwę miasta..."
                value={city}
                onChange={e => setCity(e.target.value)}
                className="city-input"
            />
            <button onClick={fetchWeather} className="search-button">Szukaj</button>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    );
}
