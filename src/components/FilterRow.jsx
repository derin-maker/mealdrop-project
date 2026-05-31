import { useState } from "react";
import { Box, Chip, Menu, MenuItem, Stack } from "@mui/material";
import { KeyboardArrowDownOutlined, SortOutlined } from "@mui/icons-material";

function FilterRow({ activeFilter, setActiveFilter, sortBy, setSortBy }) {
  const [sortAnchor, setSortAnchor] = useState(null);
  const categories = [
    "All",
    "Trending",
    "New Spots",
    "Grills",
    "Fast Food",
    "Intercontinental",
  ];
  const sortOptions = ["","Rating", "Distance", "Delivery Time", "Price"];

  const handleSortSelect = (option) => {
    setSortBy(option);
    setSortAnchor(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        overflow: "auto",
        flexWrap: "nowrap",
        gap: 4,
        py: 1,
      }}
    >
      <Stack direction="row" spacing={1}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setActiveFilter(category)}
            color={activeFilter === category ? "primary" : "default"}
            variant={activeFilter === category ? "filled" : "outlined"}
          />
        ))}
      </Stack>
      <Chip
        label={`Sort: ${sortBy}`}
        icon={<SortOutlined />}
        deleteIcon={<KeyboardArrowDownOutlined />}
        onClick={(event) => setSortAnchor(event.currentTarget)}
        onDelete={(event) => setSortAnchor(event.currentTarget)}
        variant="outlined"
      />
      <Menu
        anchorEl={sortAnchor}
        open={Boolean(sortAnchor)}
        onClose={() => setSortAnchor(null)}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option}
            selected={option === sortBy}
            onClick={() => handleSortSelect(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default FilterRow;
