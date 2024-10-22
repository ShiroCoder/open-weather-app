import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

interface SearchHistoryProps {
  history: string[];
  onSearch: (city: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSearch }) => {
  return (
    <List>
      {history.map((city, index) => (
        <ListItem key={index} onClick={() => onSearch(city)}>
          <ListItemText primary={city} />
        </ListItem>
      ))}
    </List>
  );
};

export default SearchHistory;
