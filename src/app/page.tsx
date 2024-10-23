
import React from 'react';
import WeatherCard from '../components/WeatherCard';
import { getWeatherByCity } from '@/services/weatherService';

export default async function HomePage() {
  const cities = [
    'Ahuachapán',
    'Cabañas',
    'Chalatenango',
    'Cuscatlán',
    'La Libertad',
    'La Paz',
    'La Unión',
    'Morazán',
    'San Miguel',
    'San Salvador',
    'San Vicente',
    'Santa Ana',
    'Sonsonate',
    'Usulután',
  ];

  const weatherData = await Promise.all(
    cities.map(async (city) => {
      const data = await getWeatherByCity(city);
      return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        feels_like: data.main.feels_like,
      };
    })
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-neutral-950 to-blue-950 to-black text-white p-8"
    >
      <h1 className="text-5xl font-bold text-center mb-12">Clima en El Salvador</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {weatherData.map((weather, index) => (
          <WeatherCard
            key={index}
            city={weather.city}
            temperature={weather.temperature}
            description={weather.description}
            icon={weather.icon}
            wind={weather.wind}
            humidity={weather.humidity}
            feelsLike={weather.feels_like}
          />
        ))}
      </div>
    </div>
  );
}
