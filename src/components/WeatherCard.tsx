import React from 'react';
import Image from 'next/image'; // Importamos el componente Image

interface WeatherCardProps {
    city: string;
    temperature: number;
    description: string;
    icon: string;
    wind: number;
    humidity: number;
    feelsLike: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
    city,
    temperature,
    description,
    icon,
    wind,
    humidity,
    feelsLike,
}) => {
    return (
        <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer backdrop-blur-lg select-none">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">{city}</h2>
                    <p className="text-gray-300 capitalize">{description}</p>
                </div>
                <Image
                    src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt={description}
                    width={80} // Ajustamos el tamaño (puedes cambiar según el diseño)
                    height={80} // Ajustamos el tamaño
                />
            </div>
            <div className="mt-6">
                <p className="text-5xl font-extrabold text-white">{Math.round(temperature)}°C</p>
                <div className="flex justify-between mt-4 text-sm text-gray-300">
                    <div>
                        <p><strong>Viento:</strong> {wind} m/s</p>
                        <p><strong>Humedad:</strong> {humidity}%</p>
                    </div>
                    <div>
                        <p><strong>Sensación térmica:</strong> {Math.round(feelsLike)}°C</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
