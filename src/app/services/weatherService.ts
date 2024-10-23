import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const response = await axios.get(`${API_URL}?q=${city},SV&appid=${apiKey}&units=metric&lang=es`);
    return response.data;
};
