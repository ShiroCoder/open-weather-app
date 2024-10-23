import { textToStartCase } from "../utils/textHandler";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const endpoint = process.env.REACT_APP_API_END_POINT;

export const fetchWeatherData = async (city: string) => {
  const response = await fetch(
    `${endpoint}/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(textToStartCase(data.message));
  }

  return {
    city: data.name,
    temp_celsius: data.main.temp,
    temp_fahrenheit: data.main.temp * 1.8 + 32,
    conditions: data.weather[0].description,
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
    icon: data.weather[0].icon,
  };
};
export const fetchForecastWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(
    `${endpoint}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=5`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(textToStartCase(data.message));
  }

  return {
    daily: data.daily.map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      temp: day.temp.day,
      icon: day.weather[0].icon,
    })),
  };
};

export const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
  const response = await fetch(
    `${endpoint}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(textToStartCase(data.message));
  }

  return {
    city: data.name,
    temp_celsius: data.main.temp,
    temp_fahrenheit: data.main.temp * 1.8 + 32,
    conditions: data.weather[0].description,
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
    icon: data.weather[0].icon,
  };
};
