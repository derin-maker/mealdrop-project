import { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import Greeting from "../components/Greeting";
import FilterRow from "../components/FilterRow";
import RestaurantCard from "../components/RestaurantCard";
import restaurants from "../data/restaurants.json";
import useSearchStore from "../store/searchStore";

function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Rating");
  const [loading, setLoading] = useState(true);
  const { query } = useSearchStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = restaurants.filter((r) => {
    if (
      query &&
      !r.name.toLowerCase().includes(query.toLowerCase()) &&
      !r.cuisine.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    if (activeFilter === "Trending") return r.popular === true;
    if (activeFilter === "New Spots") return r.new === true;
    if (activeFilter === "Grills") return r.cuisine === "Grills";
    if (activeFilter === "Fast Food") return r.cuisine === "Fast Food";
    if (activeFilter === "Intercontinental")
      return !["Nigerian", "Fast Food", "Grills"].includes(r.cuisine);
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Rating") return b.rating - a.rating;
    if (sortBy === "Delivery Time")
      return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
    if (sortBy === "Price") return a.minimumOrder - b.minimumOrder;
    return 0;
  });

  return (
    <Box className="page-fade" sx={{ px: 2, pt: 2, pb: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Greeting />
      </Box>

      <FilterRow
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <Box sx={{ mt: 2 }}>
        {loading ? (
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2, mt: 2,
          }}>
            {[...Array(6)].map((_, i) => (
              <Box key={i} sx={{ borderRadius: "20px", overflow: "hidden", bgcolor: "background.paper" }}>
                <Skeleton variant="rectangular" height={140} />
                <Box sx={{ p: 1.5 }}>
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Box>
              </Box>
            ))}
          </Box>
        ) : sorted.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" fontWeight={700}>No restaurants found</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Try a different filter or search term
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2, mt: 2,
          }}>
            {sorted.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;