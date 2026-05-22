import { Box, Typography, IconButton, CardMedia } from "@mui/material";
import {
  AddOutlined,
  RemoveOutlined,
  FavoriteBorderOutlined,
  Favorite,
} from "@mui/icons-material";
import useCartStore from "../store/cartStore";
import useFavoritesStore from "../store/favoritesStore";

function MenuItemCard({ item, restaurantId, isOpen, restaurantName }) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;
  const { toggleMealFavorite } = useFavoritesStore();
  const fav = useFavoritesStore((state) =>
    state.mealFavorites.some((m) => m.id === item.id),
  );

  const handleAdd = () => {
    addItem({ ...item, restaurantId });
  };

  return (
    <Box
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="130"
          image={item.image}
          alt={item.name}
          sx={{ objectFit: "cover" }}
        />
        {item.popular && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "secondary.main",
              color: "white",
              borderRadius: "999px",
              px: 1,
              py: 0.25,
              fontSize: "0.6rem",
              fontWeight: 700,
            }}
          >
            🔥 Popular
          </Box>
        )}

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            toggleMealFavorite(item);
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

      {/* Perforated divider */}
      <Box
        sx={{
          position: "relative",
          height: "16px",
          bgcolor: "background.paper",
        }}
      >
        {/* Dashed line */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "16px",
            right: "16px",
            borderTop: "2px dashed",
            borderColor: "divider",
            transform: "translateY(-50%)",
          }}
        />
        {/* Left notch */}
        <Box
          sx={{
            position: "absolute",
            left: -8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: "background.default",
          }}
        />
        {/* Right notch */}
        <Box
          sx={{
            position: "absolute",
            right: -8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: "background.default",
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          p: 1.5,
          pt: 0.5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography variant="body2" fontWeight={700} noWrap>
          {item.name} 
        </Typography>
        
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.4,
          }}
        >
          {item.description}
        </Typography>

        {/* Price + controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
            pt: 1,
          }}
        >
          <Typography variant="body2" fontWeight={800} color="primary.main">
            ₦{item.price.toLocaleString()}
          </Typography>

          {quantity === 0 ? (
            // Add button
            <IconButton
              size="small"
              onClick={handleAdd}
              disabled={!isOpen}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                width: 28,
                height: 28,
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <AddOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          ) : (
            // Quantity controls
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={() => updateQuantity(item.id, quantity - 1)}
                sx={{
                  bgcolor: "background.default",
                  width: 24,
                  height: 24,
                }}
              >
                <RemoveOutlined sx={{ fontSize: 14 }} />
              </IconButton>
              <Typography
                variant="caption"
                fontWeight={800}
                sx={{ minWidth: 16, textAlign: "center" }}
              >
                {quantity}
              </Typography>
              <IconButton
                size="small"
                onClick={() => updateQuantity(item.id, quantity + 1)}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  width: 24,
                  height: 24,
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <AddOutlined sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MenuItemCard;
