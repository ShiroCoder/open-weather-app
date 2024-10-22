import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import SearchHistory from "./components/WeatherHistory";
import { UnitProvider } from "./context/UnitContext";

import { fetchWeatherData, fetchWeatherByCoordinates } from "./api/weatherApi";

const App: React.FC = () => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
      addToHistory(city);
    } catch (err) {
      setError("City not found or failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (city: string) => {
    const updatedHistory = [city, ...history.filter((c) => c !== city)].slice(
      0,
      5
    );
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError("");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchWeatherByCoordinates(latitude, longitude);
            setWeather(data);
          } catch (err) {
            setError("Failed to fetch weather for your location");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Location access denied");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    getCurrentLocation();
  }, []);

  return (
    <UnitProvider>
      <Container>
        <SearchBar onSearch={handleSearch} />
        {/* {loading && <CircularProgress />} */}
        {error && <Typography color="error">{error}</Typography>}
        {weather || !loading ? (
          <WeatherDisplay weather={weather} unit={unit} setUnit={setUnit} />
        ) : (
          <CircularProgress />
        )}
        <SearchHistory history={history} onSearch={handleSearch} />
      </Container>
    </UnitProvider>
  );
};

export default App;
