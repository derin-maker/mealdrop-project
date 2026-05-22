import { Box, Chip } from "@mui/material";

function MenuTabs({ categories, activeCategory, setActiveCategory }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        overflow: "auto",
        flexWrap: "nowrap",
        gap: 1,
        py: 1,
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          onClick={() => setActiveCategory(category)}
          color={activeCategory === category ? "primary" : "default"}
          variant={activeCategory === category ? "filled" : "outlined"}
        />
      ))}
    </Box>
  );
}

export default MenuTabs;
