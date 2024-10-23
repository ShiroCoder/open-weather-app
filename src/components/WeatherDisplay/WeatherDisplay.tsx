import React from "react";
import "./WeatherDisplay.css";
import { CircularProgress, Typography } from "@mui/material";
import Switch from "../common/Switch";
import { roundNumber, textToStartCase } from "../../utils/textHandler";

import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import { useUnit } from "../../context/UnitContext";

export interface WeatherDisplayProps {
  weather: any;
  error: string;
  geoError: string;
  loading: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weather,
  loading,
  geoError,
  error,
}) => {
  const { unit, toggleUnit } = useUnit();
  const {
    city,
    temp_celsius,
    temp_fahrenheit,
    humidity,
    windSpeed,
    conditions,
    icon,
  } = weather;
  const temperature = unit === "C" ? temp_celsius : temp_fahrenheit;
  return (
    <div className="weather-display">
      {loading ? (
        <div className="loading-indicator">
          <CircularProgress size="4rem" color="inherit" />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : geoError ? (
        <Typography color="error">{geoError}</Typography>
      ) : (
        <>
          <h3 className="weather-display__city-name">{city}</h3>
          <Switch
            className="weather-display__switch"
            label="To Fahrenheit"
            checked={unit === "F"}
            onChange={toggleUnit}
          />
          <div className="weather-display__information">
            <div className="weather-display-information__basic">
              <div className="weather-display__item">
                <span className="weather-display__icon">
                  <DeviceThermostatOutlinedIcon />
                </span>
                <span>
                  {roundNumber(temperature)} °{unit}
                </span>
              </div>
              <div className="weather-display__item">
                <span className="weather-display__icon">
                  <WaterDropOutlinedIcon />
                </span>
                <span>{humidity}%</span>
              </div>
              <div className="weather-display__item">
                <span className="weather-display__icon">
                  <AirOutlinedIcon />
                </span>
                <span>{windSpeed} km/h</span>
              </div>
            </div>
            <div className="weather-display-information__condition">
              <img
                alt={conditions}
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                className="weather-display__icon-img"
              />
              <span>{textToStartCase(conditions)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDisplay;
