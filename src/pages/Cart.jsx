import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  IconButton,
} from "@mui/material";
import { DeleteSweepOutlined, ArrowBackOutlined } from "@mui/icons-material";
import CartItem from "../components/CartItem";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import useOrderStore from "../store/orderStore";
import restaurants from "../data/restaurants.json";
import { useEffect, useState } from "react";
function Cart() {
  const navigate = useNavigate();
  const { items, clearCart, getTotal } = useCartStore();
  const { user } = useAuthStore();
  const { placeOrder } = useOrderStore();

  const subtotal = getTotal();
  const deliveryFee = items.length > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  // Get restaurant name from first item's restaurantId
  const restaurantId = items[0]?.restaurantId;
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const handleCheckout = () => {
    if (!user) {
      navigate("/");
      return;
    }
    navigate("/payment");
  };

  // Empty state
  if (items.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 2,
          px: 3,
        }}
      >
        <Typography fontSize="4rem">🛒</Typography>
        <Typography variant="h6" fontWeight={700}>
          Your cart is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Looks like you haven't added anything yet. Go find something good.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/home")}>
          Browse Restaurants
        </Button>
      </Box>
    );
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Box className="page-fade" sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBackOutlined />
        </IconButton>
        <Typography variant="h5" fontWeight={800}>
          Your Cart
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
          ({items.length} {items.length === 1 ? "item" : "items"})
        </Typography>
      </Box>

      {/* Main layout */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "flex-start",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left — cart items */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Restaurant name */}
          {restaurant && (
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              From: {restaurant.name}
            </Typography>
          )}

          {/* Items */}
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {/* Clear cart */}
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepOutlined />}
            onClick={clearCart}
            sx={{ alignSelf: "flex-start", mt: 1 }}
          >
            Clear Cart
          </Button>
        </Box>

        {/* Right — order summary */}
        <Paper
          sx={{
            p: 3,
            width: { xs: "100%", md: 320 },
            position: { md: "sticky" },
            top: { md: 80 },
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight={800} mb={2}>
            Order Summary
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ₦{subtotal.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Delivery fee
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ₦{deliveryFee.toLocaleString()}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" fontWeight={800}>
                Total
              </Typography>
              <Typography variant="body1" fontWeight={800} color="primary.main">
                ₦{total.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleCheckout}
            sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
          >
            {user ? "Place Order" : "Login to Checkout"}
          </Button>

          {!user && (
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              display="block"
              mt={1}
            >
              You need an account to place an order
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default Cart;
