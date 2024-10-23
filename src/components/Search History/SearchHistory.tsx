import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import "./SearchHistory.css";
interface SearchHistoryProps {
  history: string[];
  onSearch: (city: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSearch }) => {
  return (
    <div className="search-history">
      <Typography variant="h5">Recently Searched</Typography>
      <List>
        {history.map((city, index) => (
          <ListItem divider key={index} onClick={() => onSearch(city)}>
            <ListItemText primary={city} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SearchHistory;
