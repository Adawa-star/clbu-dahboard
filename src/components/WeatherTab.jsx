import { useState, useEffect } from 'react';
import Panel from './Panel';
import { LOCATION } from '../config';

export default function WeatherTab() {
  const [weather, setWeather] = useState(null);
  const [sunMoon, setSunMoon] = useState(null);
  const [iss, setIss] = useState(null);

  useEffect(() => {
  // 1. Fetch Cloud Cover & Temp 
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}&current=cloud_cover,temperature_2m`)
    .then(res => res.json())
    .then(data => setWeather(data.current))
    .catch(err => console.error(err));

  // 2. Fetch Sunset & Moon Phase
  fetch(`https://api.sunrise-sunset.org/json?lat=${LOCATION.lat}&lng=${LOCATION.lon}&formatted=0`)
    .then(res => res.json())
    .then(data => setSunMoon(data.results))
    .catch(err => console.error(err));

  // 3. Fetch ISS Location
  const fetchISS = () => {
    fetch(`https://api.wheretheiss.at/v1/satellites/25544`)
      .then(res => res.json())
      .then(data => setIss(data))
      .catch(err => console.error("ISS Fetch Error:", err));
  };

  fetchISS(); // Fetch immediately when tab opens

  // Create a timer to fetch every 3 seconds
  const intervalId = setInterval(fetchISS, 3000);

  // Cleanup: Stop the timer if the user leaves the Weather tab
  return () => clearInterval(intervalId);

}, []);
  
  // Helper to format the time (e.g., 6:30 PM)
  const formatTime = (isoString) => {
    if (!isoString) return "Loading...";
    return new Date(isoString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* CARD 1: Weather */}
      <Panel title="Live Sky Conditions">
        {weather ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <p style={{ margin: 0 }}><strong>Cloud Cover:</strong> {weather.cloud_cover}%</p>
            <p style={{ margin: 0 }}><strong>Temp:</strong> {weather.temperature_2m}°C</p>
          </div>
        ) : <p>Fetching weather...</p>}
      </Panel>

      {/* CARD 2: Sun & Moon */}
      <Panel title="Sun & Moon (Pune)">
        {sunMoon ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <p style={{ margin: 0 }}><strong>Sunset:</strong> {formatTime(sunMoon.sunset)}</p>
            <p style={{ margin: 0 }}><strong>Moon:</strong> {sunMoon.moon_phase}</p>
          </div>
        ) : <p>Fetching Sun/Moon data...</p>}
      </Panel>

      {/* CARD 3: ISS Tracker */}
      <Panel title="ISS Live Location">
        {iss ? (
          <div style={{ fontSize: '0.9rem' }}>
            <p style={{ margin: '0 0 10px 0' }}>
              The ISS is currently flying over: <strong>{iss.latitude.toFixed(2)}°N, {iss.longitude.toFixed(2)}°E</strong>
            </p>
            <p style={{ margin: 0, color: '#8a7a6a', fontSize: '0.8rem' }}>
              Altitude: {iss.altitude.toFixed(0)} km | Velocity: {iss.velocity.toFixed(0)} km/h
            </p>
          </div>
        ) : <p>Locating the ISS...</p>}
      </Panel>

    </div>
  );
}