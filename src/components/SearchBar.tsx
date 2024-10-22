import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    if (city) {
      onSearch(city);
    }
  };

  return (
    <div>
      <TextField
        label="City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
      />
      <Button onClick={handleSubmit}>Search</Button>
    </div>
  );
};

export default SearchBar;
