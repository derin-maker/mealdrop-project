import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Chip, Divider } from "@mui/material";
import {
  HomeOutlined,
  LocationOnOutlined,
  PersonOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";
import OrderLineItem from "../components/OrderLineItem";
import useOrderStore from "../store/orderStore";
import { useEffect, useState } from "react";

const STATUS_COLORS = {
  confirmed: "#2196F3",
  preparing: "#FF9800",
  otw: "#9C27B0",
  delivered: "#4CAF50",
  cancelled: "#F44336",
};

const STATUS_LABELS = {
  confirmed: "Order Confirmed",
  preparing: "Preparing",
  otw: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder } = useOrderStore();
  const order = getOrder(id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!order) {
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
          Order not found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/home")}>
          Back to Home
        </Button>
      </Box>
    );
  }

  const date = new Date(order.placedAt);
  const formattedDate = date.toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box className="page-fade" sx={{ px: 2, py: 3, maxWidth: 480, mx: "auto" }}>
      {/* Receipt card */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        }}
      >
        {/* Top notch strip */}
        <Box
          sx={{
            height: 8,
            background: "linear-gradient(135deg, #E63946 0%, #F4A261 100%)",
          }}
        />

        <Box sx={{ p: 3 }}>
          {/* Header — date + status */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                DATE: {formattedDate}
                <br />
              </Typography>

              <Typography variant="caption" fontWeight={800} display="block">
                ORDER #{order.id}
              </Typography>
            </Box>
            <Chip
              label={STATUS_LABELS[order.status]}
              size="small"
              sx={{
                bgcolor: STATUS_COLORS[order.status],
                color: "white",
                fontWeight: 700,
                fontSize: "0.65rem",
              }}
            />
          </Box>

          {/* Dashed divider */}
          <Box
            sx={{ borderTop: "2px dashed", borderColor: "divider", my: 2 }}
          />

          {/* Restaurant name */}
          <Typography variant="h5" fontWeight={800} mb={0.5}>
            {order.restaurantName}
          </Typography>

          {/* Rider info */}
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PersonOutlined sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                Rider: Emeka Chukwu · +234 801 234 5678
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeOutlined
                sx={{ fontSize: 14, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                Placed at {formattedTime} · ETA 30-45 min
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnOutlined
                sx={{ fontSize: 14, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                Delivering to {localStorage.getItem("location") || "Ibadan"}
              </Typography>
            </Box>
          </Box>

          {/* Dashed divider */}
          <Box
            sx={{ borderTop: "2px dashed", borderColor: "divider", my: 2 }}
          />

          {/* Line items */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {order.items.map((item) => (
              <OrderLineItem key={item.id} item={item} />
            ))}
          </Box>

          {/* Dashed divider */}
          <Box
            sx={{ borderTop: "2px dashed", borderColor: "divider", my: 2 }}
          />

          {/* Totals */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2">
                ₦{order.subtotal.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Delivery Fee
              </Typography>
              <Typography variant="body2">
                ₦{order.deliveryFee.toLocaleString()}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" fontWeight={800}>
                TOTAL
              </Typography>
              <Typography variant="body1" fontWeight={800} color="primary.main">
                ₦{order.total.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Thank you */}
          <Box sx={{ textAlign: "center", mt: 3, mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              🍴 Thank you for choosing MealDrop!
            </Typography>
          </Box>

          {/* Bottom notch effect */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mx: -3,
              mt: 2,
            }}
          >
            {[...Array(12)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: "background.default",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => navigate("/orders")}
          sx={{ py: 1.5 }}
        >
          Track Order
        </Button>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<HomeOutlined />}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}

export default OrderDetail;
