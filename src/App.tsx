import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import { UnitProvider } from "./context/UnitContext";

import { fetchWeatherData, fetchWeatherByCoordinates } from "./api/weatherApi";
import "./App.css";
import { delay } from "lodash";
import SearchHistory from "./components/Search History/SearchHistory";

const App: React.FC = () => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [geoError, setGeoError] = useState("");

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError("");
    setGeoError("");
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
      addToHistory(city);
    } catch (err: any) {
      setError(err.message);
    } finally {
      delay(() => {
        setLoading(false);
      }, 1000);
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

  const getCurrentLocationWeather = () => {
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
          delay(() => {}, 2000);
          setGeoError(
            "Location access denied, please enter city name manually"
          );
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
    getCurrentLocationWeather();
  }, []);

  return (
    <UnitProvider>
      <Container className="App">
        <SearchBar history={history} onSearch={handleSearch} />
        <WeatherDisplay
          error={error}
          geoError={geoError}
          weather={weather}
          loading={loading}
        />
        <SearchHistory history={history} onSearch={handleSearch} />
      </Container>
    </UnitProvider>
  );
};

export default App;
