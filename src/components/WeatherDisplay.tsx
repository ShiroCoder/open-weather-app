import React from "react";
import {
  Typography,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import _ from "lodash";
interface WeatherDisplayProps {
  weather: any;
  unit: string;
  setUnit: (unit: string) => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weather,
  unit,
  setUnit,
}) => {
  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const temperature =
    unit === "C" ? weather.temp_celsius : weather.temp_fahrenheit;

  return (
    <Container className="weather-display">
      <Typography
        align="center"
        className="weather-display__city-name"
        variant="h3"
      >
        {weather.city}
      </Typography>
      <Grid container spacing={2} className="weather-display__information">
        <Grid size={8}>
          <ListItem>
            <ListItemIcon>
              <DeviceThermostatOutlinedIcon fontSize="large" />
            </ListItemIcon>
            <Typography>
              {temperature} °{unit}
            </Typography>
            <Switch checked={unit === "F"} onChange={toggleUnit} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WaterDropOutlinedIcon fontSize="large" />
            </ListItemIcon>
            <Typography>{weather.humidity}% </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AirOutlinedIcon fontSize="large" />
            </ListItemIcon>
            <Typography>{weather.windSpeed} km/h </Typography>
          </ListItem>
        </Grid>
        <Grid size={4} alignContent="center">
          <img
            alt={weather.conditions}
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          />
          <Typography> {_.startCase(weather.conditions)}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeatherDisplay;
