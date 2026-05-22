import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { FavoriteBorderOutlined, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useFavoritesStore from "../store/favoritesStore";

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const fav = useFavoritesStore((state) =>
    state.favorites.some((f) => f.id === restaurant.id),
  );
  return (
    <Card
      onClick={() => navigate(`/menu/${restaurant.id}`)}
      sx={{
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Image container */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="140"
          image={restaurant.image}
          alt={restaurant.name}
          sx={{ objectFit: "cover" }}
        />

        {/* Closed overlay */}
        {!restaurant.isOpen && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "inherit",
            }}
          >
            <Typography color="white" fontWeight={700} variant="body2">
              Closed
            </Typography>
          </Box>
        )}

        {/* Promo chip */}
        {restaurant.promo && (
          <Chip
            label={restaurant.promo}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "primary.main",
              color: "white",
              fontWeight: 700,
              fontSize: "0.6rem",
              height: 20,
            }}
          />
        )}

        {/* New badge */}
        {restaurant.new && (
          <Chip
            label="New"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 36,
              bgcolor: "secondary.main",
              color: "white",
              fontWeight: 700,
              fontSize: "0.6rem",
              height: 20,
            }}
          />
        )}

        {/* Favorite button */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(restaurant);
          }}
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            bgcolor: "background.paper",
            width: 28,
            height: 28,
            "&:hover": { bgcolor: "background.paper" },
          }}
        >
          {fav ? (
            <Favorite sx={{ fontSize: 15, color: "primary.main" }} />
          ) : (
            <FavoriteBorderOutlined sx={{ fontSize: 15 }} />
          )}
        </IconButton>
      </Box>

      {/* Card content */}
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography variant="body2" fontWeight={700} noWrap>
          {restaurant.name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          noWrap
          display="block"
        >
          {restaurant.cuisine}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
          <Typography variant="caption" fontWeight={700} color="primary.main">
            ⭐ {restaurant.rating}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            · {restaurant.deliveryTime} min
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" display="block">
          ₦{restaurant.deliveryFee.toLocaleString()} delivery
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
