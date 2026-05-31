import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  IconButton,
} from "@mui/material";
import {
  HomeOutlined,
  WorkOutlined,
  ArrowBackOutlined,
  CreditCardOutlined,
  AccountBalanceWalletOutlined,
  TwoWheelerOutlined,
} from "@mui/icons-material";
import useCartStore from "../store/cartStore";
import useOrderStore from "../store/orderStore";
import useAuthStore from "../store/authStore";
import OrderLineItem from "../components/OrderLineItem";
import restaurants from "../data/restaurants.json";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Visa ending in 4242",
    sub: "Expires 12/26",
    icon: <CreditCardOutlined />,
  },
  {
    id: "wallet",
    label: "App Wallet",
    sub: "₦0.00 balance",
    icon: <AccountBalanceWalletOutlined />,
  },
  {
    id: "cash",
    label: "Cash on Delivery",
    sub: "Pay when your order arrives",
    icon: <TwoWheelerOutlined />,
  },
];

function Payment() {
  const navigate = useNavigate();
  const { items, clearCart, getTotal } = useCartStore();
  const { placeOrder } = useOrderStore();
  const { user } = useAuthStore();
  const savedAddresses = (
    JSON.parse(localStorage.getItem("savedAddresses")) || []
  ).map((addr) => ({
    ...addr,
    icon:
      addr.label === "Home" ? (
        <HomeOutlined fontSize="small" />
      ) : (
        <WorkOutlined fontSize="small" />
      ),
  }));

  const [selectedAddress, setSelectedAddress] = useState(
    savedAddresses[0]?.id || "",
  );
  const [selectedPayment, setSelectedPayment] = useState("cash");

  const subtotal = getTotal();
const restaurantId = items[0]?.restaurantId;
const restaurantData = restaurants.find((r) => r.id === restaurantId);
const deliveryFee = restaurantData?.deliveryFee || 500;
const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    const order = placeOrder({
      items,
      subtotal,
      deliveryFee,
      total,
      restaurantId,
      restaurantName: restaurantData?.name || "Unknown",
      paymentMethod: PAYMENT_METHODS.find((m) => m.id === selectedPayment)
        ?.label,
      deliveryAddress: savedAddresses.find((a) => a.id === selectedAddress)
        ?.address,
    });
    clearCart();
    navigate(`/orders/${order.id}`);
  };

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
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Nothing to pay for
        </Typography>
        <Button variant="contained" onClick={() => navigate("/home")}>
          Browse Restaurants
        </Button>
      </Box>
    );
  }

  return (
    <Box className="page-fade" sx={{ px: 2, py: 3, maxWidth: 560, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBackOutlined />
        </IconButton>
        <Typography variant="h5" fontWeight={800}>
          Checkout
        </Typography>
      </Box>

      {/* Delivery Address */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            📍 Delivery Address
          </Typography>
          <RadioGroup
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1.5,
              }}
            >
              {savedAddresses.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No saved addresses yet. Add an address in your profile.
                </Typography>
              ) : savedAddresses.map((addr) => (
                <Box
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor:
                      selectedAddress === addr.id ? "primary.main" : "divider",
                    bgcolor:
                      selectedAddress === addr.id
                        ? "rgba(230,57,70,0.05)"
                        : "background.default",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <Box sx={{ color: "primary.main" }}>{addr.icon}</Box>
                    <Typography variant="body2" fontWeight={700}>
                      {addr.label}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {addr.address}
                  </Typography>
                  <FormControlLabel
                    value={addr.id}
                    control={<Radio size="small" sx={{ display: "none" }} />}
                    label=""
                    sx={{ display: "none" }}
                  />
                </Box>
              ))}
            </Box>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            💳 Payment Method
          </Typography>
          <RadioGroup
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {PAYMENT_METHODS.map((method, i) => (
                <Box key={method.id}>
                  <Box
                    onClick={() => setSelectedPayment(method.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      cursor: "pointer",
                      bgcolor:
                        selectedPayment === method.id
                          ? "rgba(230,57,70,0.05)"
                          : "transparent",
                      transition: "bgcolor 0.2s ease",
                    }}
                  >
                    <Radio
                      value={method.id}
                      size="small"
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      sx={{
                        color: "primary.main",
                        "&.Mui-checked": { color: "primary.main" },
                      }}
                    />
                    <Box sx={{ color: "text.secondary" }}>{method.icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={700}>
                        {method.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {method.sub}
                      </Typography>
                    </Box>
                  </Box>
                  {i < PAYMENT_METHODS.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            📋 Order Summary
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {items.map((item) => (
              <OrderLineItem key={item.id} item={item} />
            ))}
          </Box>
          <Box
            sx={{ borderTop: "2px dashed", borderColor: "divider", my: 2 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
                Delivery Fee
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
        </CardContent>
      </Card>

      {/* Place Order */}
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handlePlaceOrder}
        disabled={!selectedAddress}
        sx={{ py: 2, fontSize: "1rem", borderRadius: "999px" }}
      >
        Place Order · ₦{total.toLocaleString()}
      </Button>
    </Box>
  );
}

export default Payment;
