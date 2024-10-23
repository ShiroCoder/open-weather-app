import React, { useState } from "react";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (city: string) => void;
  history: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, history }) => {
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    if (city) {
      onSearch(city);
    }
  };

  return (
    <div className="search-bar">
      <Autocomplete
        freeSolo
        options={history}
        inputValue={city}
        onInputChange={(event, newInputValue) => setCity(newInputValue)}
        onChange={(event, newValue) => {
          if (newValue) {
            setCity(newValue as string);
            onSearch(newValue as string);
          }
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Enter City Name"
            variant="outlined"
            className="search-bar__input"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSubmit}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchBar;
