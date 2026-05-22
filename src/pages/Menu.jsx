import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, IconButton, Chip, TextField,
  InputAdornment, Badge, Skeleton,
} from "@mui/material";
import {
  ArrowBackOutlined, StarOutlined,
  SearchOutlined, ShoppingCartOutlined,
} from "@mui/icons-material";
import MenuTabs from "../components/MenuTabs";
import MenuItemCard from "../components/MenuItemCard";
import restaurants from "../data/restaurants.json";
import menus from "../data/menus.json";
import useCartStore from "../store/cartStore";
import CheckoutBar from '../components/CheckoutBar'

function Menu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCount } = useCartStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const restaurant = restaurants.find((r) => r.id === id);
  const menuItems = menus[id] || [];
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];
  const filtered = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!restaurant) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <Typography>Restaurant not found</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Box sx={{ px: 2, pt: 2 }}>
          <Skeleton height={50} sx={{ borderRadius: 2 }} />
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} width={80} height={36} sx={{ borderRadius: "999px" }} />
            ))}
          </Box>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2, mt: 2,
          }}>
            {[...Array(4)].map((_, i) => (
              <Box key={i} sx={{ borderRadius: "20px", overflow: "hidden", bgcolor: "background.paper" }}>
                <Skeleton variant="rectangular" height={130} />
                <Box sx={{ p: 1.5 }}>
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="page-fade">
      <Box sx={{ position: "relative", height: { xs: 220, md: 300 } }}>
        <Box component="img" src={restaurant.image} alt={restaurant.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box sx={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)",
        }} />
        <IconButton onClick={() => navigate(-1)} sx={{
          position: "absolute", top: 16, left: 16,
          bgcolor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
          color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
        }}>
          <ArrowBackOutlined />
        </IconButton>
        <IconButton onClick={() => navigate("/cart")} sx={{
          position: "absolute", top: 16, right: 16,
          bgcolor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
          color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
        }}>
          <Badge badgeContent={getCount()} color="primary">
            <ShoppingCartOutlined />
          </Badge>
        </IconButton>
        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Chip label={restaurant.isOpen ? "Open Now" : "Closed"} size="small"
              sx={{ bgcolor: restaurant.isOpen ? "#4CAF50" : "#9E9E9E", color: "white", fontWeight: 700, fontSize: "0.65rem", height: 20 }}
            />
            {restaurant.promo && (
              <Chip label={restaurant.promo} size="small"
                sx={{ bgcolor: "primary.main", color: "white", fontWeight: 700, fontSize: "0.65rem", height: 20 }}
              />
            )}
          </Box>
          <Typography variant="h5" fontWeight={800} color="white">{restaurant.name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarOutlined sx={{ color: "#FFD600", fontSize: 16 }} />
              <Typography variant="caption" color="white" fontWeight={700}>{restaurant.rating}</Typography>
            </Box>
            <Typography variant="caption" color="rgba(255,255,255,0.8)">{restaurant.deliveryTime} min</Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.8)">₦{restaurant.deliveryFee.toLocaleString()} delivery</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 2, pt: 2 }}>
        <TextField fullWidth size="small"
          placeholder={`Search in ${restaurant.name}...`}
          value={search} onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchOutlined fontSize="small" /></InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
        />
        <MenuTabs categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {filtered.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" fontWeight={700}>Nothing found</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Try a different category or search term
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2, mt: 1, pb: 12,
          }}>
            {filtered.map(item => (
              <MenuItemCard key={item.id} item={item} restaurantId={id} isOpen={restaurant.isOpen} />
            ))}
          </Box>
        )}
      </Box>
      <CheckoutBar />
    </Box>
  );
}

export default Menu;