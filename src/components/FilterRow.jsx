import { Box, Chip, Stack } from "@mui/material";
import { SortOutlined } from "@mui/icons-material";

function FilterRow({ activeFilter, setActiveFilter, sortBy, setSortBy }) {
  const categories = [
    "All",
    "Trending",
    "New Spots",
    "Grills",
    "Fast Food",
    "Intercontinental",
  ];
  const sortCycle = ["Rating", "Distance", "Delivery Time", "Price"];
  const handleSort = () => {
    const current = sortCycle.indexOf(sortBy);
    const next = sortCycle[(current + 1) % sortCycle.length];
    setSortBy(next);
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
        onClick={handleSort}
        variant="outlined"
      />
    </Box>
  );
}

export default FilterRow;
