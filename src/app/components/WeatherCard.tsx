import React from 'react';

interface WeatherCardProps {
    city: string;
    temperature: number;
    description: string;
    icon: string;
    wind: number;
    humidity: number;
    feelsLike: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, description, icon, wind, humidity, feelsLike }) => {
    return (
        <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{city}</h2>
                    <p className="text-gray-600 capitalize">{description}</p>
                </div>
                <img
                    src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt={description}
                    className="w-20 h-20"
                />
            </div>
            <div className="mt-6">
                <p className="text-5xl font-extrabold text-gray-800">{Math.round(temperature)}°C</p>
                <div className="flex justify-between mt-4 text-sm text-gray-600">
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
