'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import * as topojson from 'topojson-client';
import { FeatureCollection, Geometry, GeoJsonProperties, Feature } from 'geojson';  // Importamos los tipos correctos
// import { getWeatherByCity } from '@/app/services/weatherService';
import { getWeatherByCity } from '@/services/weatherService';

// Ruta del archivo TopoJSON
const TOPOJSON_PATH = '/geoBoundaries-SLV-ADM2.topojson';

export default function MapsPage() {
    const [geoData, setGeoData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<Feature<Geometry, GeoJsonProperties> | null>(null);
    const [weatherData, setWeatherData] = useState<any>(null);

    // Cargar y convertir el archivo TopoJSON a GeoJSON
    useEffect(() => {
        fetch(TOPOJSON_PATH)
            .then((response) => response.json())
            .then((topoData) => {
                const geojsonData = topojson.feature(topoData, topoData.objects.SLV_ADM2 as any) as FeatureCollection<Geometry, GeoJsonProperties>;
                setGeoData(geojsonData);
            });
    }, []);

    // Manejar el clic en un departamento
    const handleDepartmentClick = async (department: Feature<Geometry, GeoJsonProperties>) => {
        setSelectedDepartment(department);
        if (department.properties) {
            const weather = await getWeatherByCity(department.properties.shapeName);
        }
        setWeatherData(weather);
    };

    // Estilo personalizado para los departamentos
    const departmentStyle = {
        fillColor: '#4a83ec',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white p-8">
            <h1 className="text-5xl font-bold text-center mb-12">Mapa de Clima en El Salvador</h1>
            <MapContainer
                center={[13.7, -89.2]}
                zoom={8}
                scrollWheelZoom={false}
                className="w-full h-[600px] rounded-lg shadow-md"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                {geoData && (
                    <GeoJSON
                        data={geoData}
                        style={departmentStyle}
                        onEachFeature={(feature, layer) => {
                            layer.on({
                                click: () => handleDepartmentClick(feature),
                            });
                        }}
                    />
                )}
            </MapContainer>

            {selectedDepartment && weatherData && (
                <div className="mt-8 bg-white bg-opacity-10 p-6 rounded-lg">
                    <h2 className="text-3xl font-bold mb-4">{selectedDepartment.properties?.shapeName}</h2>
                    <p><strong>Clima en {selectedDepartment?.properties?.shapeName}:</strong> {weatherData.weather[0].description}</p>
                    <p><strong>Temperatura:</strong> {Math.round(weatherData.main.temp)}°C</p>
                    <p><strong>Viento:</strong> {weatherData.wind.speed} m/s</p>
                    <p><strong>Humedad:</strong> {weatherData.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}
