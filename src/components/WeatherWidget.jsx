import { useState, useEffect } from 'react';
import './WeatherWidget.css';

// Simple mapping from WMO Weather codes to emojis and text
// https://open-meteo.com/en/docs
function getWeatherInfo(code) {
    if (code === 0) return { emoji: '☀️', text: 'Clear' };
    if (code === 1 || code === 2) return { emoji: '🌤️', text: 'Partly Cloudy' };
    if (code === 3) return { emoji: '☁️', text: 'Overcast' };
    if (code >= 45 && code <= 48) return { emoji: '🌫️', text: 'Fog' };
    if (code >= 51 && code <= 55) return { emoji: '🌧️', text: 'Drizzle' };
    if (code >= 61 && code <= 65) return { emoji: '🌧️', text: 'Rain' };
    if (code >= 71 && code <= 77) return { emoji: '❄️', text: 'Snow' };
    if (code >= 80 && code <= 82) return { emoji: '🌧️', text: 'Showers' };
    if (code >= 85 && code <= 86) return { emoji: '❄️', text: 'Snow Showers' };
    if (code >= 95) return { emoji: '⛈️', text: 'Thunderstorm' };
    return { emoji: '🌤️', text: 'Variable' };
}

// Installation viability based on temp and rain
function getViability(maxTemp, minTemp, code) {
    if (code >= 51 && code <= 99) {
        return { status: 'Delay', desc: 'Precipitation', color: 'var(--coral)' };
    }
    if (minTemp < 5) {
        return { status: 'Caution', desc: 'Cold temps overnight', color: '#f59e0b' };
    }
    if (maxTemp > 35) {
        return { status: 'Caution', desc: 'Extreme heat', color: '#f59e0b' };
    }
    return { status: 'Optimal', desc: 'Great coating weather', color: '#10b981' };
}

export default function WeatherWidget({ city }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!city || !city.coordinates) return;

        const { lat, lng } = city.coordinates;
        // Fetch current weather and 3-day forecast
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setWeather(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch weather:", err);
                setError(true);
                setLoading(false);
            });
    }, [city]);

    if (loading) return <div className="weather-widget weather-widget--loading">Loading local forecast for {city.name}...</div>;
    if (error || !weather || !weather.daily) return null;

    const currentCode = weather.current_weather.weathercode;
    const currentInfo = getWeatherInfo(currentCode);
    const currentTemp = Math.round(weather.current_weather.temperature);

    return (
        <div className="weather-widget">
            <div className="weather-widget__header">
                <h3>{city.name} Weather & Installation Forecast</h3>
                <p>Check the conditions before booking your stone coating or concrete repair project.</p>
            </div>
            
            <div className="weather-widget__body">
                <div className="weather-widget__current">
                    <span className="weather-emoji" aria-hidden="true">{currentInfo.emoji}</span>
                    <div className="weather-current-details">
                        <span className="weather-temp">{currentTemp}°C</span>
                        <span className="weather-desc">{currentInfo.text}</span>
                    </div>
                </div>

                <div className="weather-widget__forecast">
                    {weather.daily.time.slice(0, 3).map((dateStr, index) => {
                        const date = new Date(dateStr + "T12:00:00");
                        const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
                        const maxTemp = Math.round(weather.daily.temperature_2m_max[index]);
                        const minTemp = Math.round(weather.daily.temperature_2m_min[index]);
                        const info = getWeatherInfo(weather.daily.weathercode[index]);
                        const viability = getViability(maxTemp, minTemp, weather.daily.weathercode[index]);

                        return (
                            <div className="weather-day" key={dateStr}>
                                <div className="weather-day__date">{dayName}</div>
                                <div className="weather-day__icon" title={info.text}>{info.emoji}</div>
                                <div className="weather-day__temps">
                                    <span className="weather-max">{maxTemp}°</span>
                                    <span className="weather-min">{minTemp}°</span>
                                </div>
                                <div className="weather-day__viability" style={{ color: viability.color }}>
                                    <span className="viability-dot" style={{ backgroundColor: viability.color }}></span>
                                    {viability.status}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="weather-widget__footer">
                <small>Sierra Stone installations require 24 hours of dry weather and temperatures between 5°C and 30°C for optimal epoxy curing.</small>
            </div>
        </div>
    );
}
