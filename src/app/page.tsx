'use client';

import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import { getWeatherByCity } from '@/services/weatherService';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para almacenar los datos filtrados
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  // Estado para almacenar los datos del clima
  const [weatherData, setWeatherData] = useState<any[]>([]);


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

  // Filtrar los departamentos
  useEffect(() => {
    setFilteredCities(
      cities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Obtener los datos del clima para las ciudades filtradas
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(
        filteredCities.map(async (city) => {
          const weather = await getWeatherByCity(city);
          return {
            city: weather.name,
            temperature: weather.main.temp,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon,
            wind: weather.wind.speed,
            humidity: weather.main.humidity,
            feels_like: weather.main.feels_like,
          };
        })
      );
      setWeatherData(data);
    };

    if (filteredCities.length > 0) {
      fetchWeatherData();
    }
  }, [filteredCities]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-blue-950 to-black text-white p-8">
      <h1 className="text-5xl font-bold text-center mb-12">Clima en El Salvador</h1>

      {/* Campo de búsqueda */}
      <div className="max-w-lg mx-auto mb-8">
        <input
          type="text"
          placeholder="Buscar un departamento"
          className="w-full px-4 py-2 text-gray-100 placeholder-gray-200 bg-blue-950 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

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
