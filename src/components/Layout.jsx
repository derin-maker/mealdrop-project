import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
  Slide,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ShoppingCartOutlined,
  LightModeOutlined,
  DarkModeOutlined,
  HomeOutlined,
  FavoriteBorderOutlined,
  ReceiptLongOutlined,
  PersonOutlined,
  Home,
  Favorite,
  ReceiptLong,
  Person,
  SearchOutlined,
  LocationOnOutlined,
  CloseOutlined,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import useThemeStore from "../store/themeStore";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import useSearchStore from "../store/searchStore";

const LOCATIONS = ["Ibadan", "Lagos", "Abuja", "Port Harcourt", "Kano"];

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleMode } = useThemeStore();
  const { user } = useAuthStore();
  const { query, setQuery } = useSearchStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem('location') || '',
  );
  const [locationAnchor, setLocationAnchor] = useState(null);
  const cartCount = useCartStore(
    (state) => state.items.reduce((sum, i) => sum + i.quantity, 0), // total quantity of items in cart
  );

  const navItems = [
    {
      label: "Home",
      path: "/home",
      icon: <HomeOutlined />,
      activeIcon: <Home />,
    },
    {
      label: "Favorites",
      path: "/favorites",
      icon: <FavoriteBorderOutlined />,
      activeIcon: <Favorite />,
    },
    {
      label: "Orders",
      path: "/orders",
      icon: <ReceiptLongOutlined />,
      activeIcon: <ReceiptLong />,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <PersonOutlined />,
      activeIcon: <Person />,
    },
  ];

  const currentNav = navItems.findIndex(
    (item) => item.path === location.pathname,
  );

  const handleLocationSelect = (loc) => {
    setSelectedLocation(loc);
    localStorage.setItem("location", loc);
    setLocationAnchor(null);
  };

  const handleSearchToggle = () => {
    if (searchOpen) setQuery("");
    setSearchOpen(!searchOpen);
  };

  return (
    <Box sx={{ pb: "70px", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Top AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          {/* Location picker */}
          <Box
            onClick={(e) => setLocationAnchor(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
            }}
          >
            <LocationOnOutlined fontSize="small" color="primary" />
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                lineHeight={1}
                sx={{ color: "text.secondary" }}
              >
                Deliver to
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                lineHeight={1.2}
                sx={{ color: "text.primary" }}
              >
                {selectedLocation || "Select Location"}
              </Typography>
            </Box>
            <KeyboardArrowDownOutlined fontSize="small" color="action" />
          </Box>

          <Menu
            anchorEl={locationAnchor}
            open={Boolean(locationAnchor)}
            onClose={() => setLocationAnchor(null)}
          >
            {LOCATIONS.map((loc) => (
              <MenuItem
                key={loc}
                onClick={() => handleLocationSelect(loc)}
                selected={loc === selectedLocation}
              >
                {loc}
              </MenuItem>
            ))}
          </Menu>

          {/* Logo center */}
          <Typography
            variant="h6"
            fontWeight={800}
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              color: "primary.main",
              letterSpacing: "-0.5px",
            }}
          >
            🍔 MealDrop
          </Typography>

          {/* Right actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton onClick={toggleMode} size="small">
              {mode === "light" ? (
                <DarkModeOutlined fontSize="small" />
              ) : (
                <LightModeOutlined fontSize="small" />
              )}
            </IconButton>
            <IconButton onClick={() => navigate("/cart")} size="small">
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartOutlined fontSize="small" />
              </Badge>
            </IconButton>
            <Avatar
              onClick={() => navigate(user ? "/profile" : "/auth")}
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
                fontSize: "0.85rem",
                cursor: "pointer",
                ml: 0.5,
              }}
            >
              {user ? user.name[0].toUpperCase() : "?"}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page content */}
      <Box>{children}</Box>

      {/* Slide-up search bar */}
      <Slide direction="up" in={searchOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            bottom: "70px",
            left: 0,
            right: 0,
            bgcolor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
            px: 2,
            py: 1.5,
            zIndex: 1100,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <TextField
            autoFocus
            fullWidth
            placeholder="Search restaurants or dishes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleSearchToggle}>
                    <CloseOutlined fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Slide>

      {/* Bottom Navigation */}
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid",
          borderColor: "divider",
          zIndex: 1000,
        }}
      >
        <BottomNavigation
          value={searchOpen ? 4 : currentNav === -1 ? false : currentNav}
          sx={{ bgcolor: "background.paper", height: "70px" }}
        >
          {navItems.map((item, i) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={currentNav === i ? item.activeIcon : item.icon}
              onClick={() => {
                if (searchOpen) setSearchOpen(false);
                navigate(item.path);
              }}
              sx={{
                color: "text.secondary",
                "&.Mui-selected": { color: "primary.main" },
                minWidth: 0,
              }}
            />
          ))}
          <BottomNavigationAction
            label="Search"
            icon={<SearchOutlined />}
            onClick={handleSearchToggle}
            sx={{
              color: searchOpen ? "primary.main" : "text.secondary",
              minWidth: 0,
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Layout;
