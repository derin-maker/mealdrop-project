import { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import useFavoritesStore from "../store/favoritesStore";
import RestaurantCard from "../components/RestaurantCard";
import MenuItemCard from "../components/MenuItemCard";
import restaurants from "../data/restaurants.json";

function Favorites() {
  const [tab, setTab] = useState(0);
  const { favorites, mealFavorites } = useFavoritesStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Box className="page-fade" sx={{ px: 2, py: 3 }}>
      <Typography variant="h5" fontWeight={800} mb={2}>
        Favorites
      </Typography>

      {/* YOUR CODE — MUI Tabs, two tabs: Restaurants and Meals */}
      <Tabs value={tab} onChange={(event, tab_index) => setTab(tab_index)}>
        <Tab label="Restaurants" />
        <Tab label="Meals" />
      </Tabs>

      {/* YOUR CODE — if tab === 0, show restaurants grid */}

      {tab === 0 &&
        (favorites.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" fontWeight={700}>
              No favorite restaurants yet
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Tap the heart on any restaurant to save it here
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
              mt: 2,
            }}
          >
            {favorites.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </Box>
        ))}

      {/* YOUR CODE — if tab === 1, show meals grid */}
      {tab === 1 &&
        (mealFavorites.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" fontWeight={700}>
              No favorite meals yet
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Tap the heart on any meal to save it here
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
              mt: 2,
            }}
          >
            {mealFavorites.map((meal) => {
              const restaurantData = restaurants.find(
                (r) => r.id === meal.restaurantId,
              );
              return (
                <MenuItemCard
                  key={meal.id}
                  item={meal}
                  restaurantId={meal.restaurantId}
                  isOpen={restaurantData?.isOpen ?? true}
                  restaurantName={restaurantData?.name}
                />
              );
            })}
          </Box>
        ))}

      {/* YOUR CODE — empty state for each tab if the array is empty */}
    </Box>
  );
}
export default Favorites;
