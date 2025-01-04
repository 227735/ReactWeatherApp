import React, { useState } from "react";
import WeatherInput from "./components/WeatherInput";
import WeatherInfo from "./components/WeatherInfo";
import Forecast from "./components/Forecast";
import './App.css';

export default function WeatherApp() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [showForecast, setShowForecast] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const [error, setError] = useState(''); // Dodanie stanu dla komunikatu o błędzie

    const fetchWeather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a263a1946ead7451ac6fcc415dd80ae&units=metric&lang=pl`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Miasto nie zostało znalezione'); // Błąd, gdy miasto nie istnieje
                }
                return res.json();
            })
            .then(data => {
                setWeather(data);
                fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=3a263a1946ead7451ac6fcc415dd80ae&units=metric&lang=pl`
                )
                    .then(res => res.json())
                    .then(data => setForecast(data.list));
                setShowInput(false);
                setError(''); // Jeśli wyszukiwanie się powiodło, czyścimy błąd
            })
            .catch(error => {
                console.error(error);
                setError(error.message); // Ustawienie komunikatu o błędzie
            });
    };

    const toggleForecast = () => {
        setShowForecast(!showForecast);
    };

    const windDirection = deg => ['Północ', 'Płn-Wsch', 'Wschód', 'Płd-Wsch', 'Południe', 'Płd-Zach', 'Zachód', 'Płn-Zach'][Math.round(deg / 45) % 8];

    const goBackToSearch = () => {
        setShowInput(true);
        setCity('');
        setWeather(null);
        setForecast([]);
        setShowForecast(false);
        setError(''); // Czyści błąd po powrocie do wyszukiwania
    };

    return (
        <div className="weather-page">
            <div className="weather-container">
                {showInput && <h1>Sprawdź pogodę</h1>}
                {showInput && <WeatherInput city={city} setCity={setCity} fetchWeather={fetchWeather} error={error} />}
                {weather && (
                    <div>
                        <WeatherInfo
                            weather={weather}
                            windDirection={windDirection}
                            toggleForecast={toggleForecast}
                            showForecast={showForecast}
                        />
                        <button onClick={goBackToSearch} className="back-button">Cofnij do wyszukiwania</button>
                    </div>
                )}
                {showForecast && forecast.length > 0 && <Forecast forecast={forecast} />}
            </div>
        </div>
    );
}
