const apiKey = "a91d7ccbd965ed9fb8bf0b3e8d407159";

export const fetchWeatherData = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
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

export const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
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

export const getWeatherConditionIcon = async () => {
  const res = await fetch(`https://openweathermap.org/img/wn/10d@2x.png`);
};
