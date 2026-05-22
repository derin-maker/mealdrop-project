import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import { ReceiptLongOutlined } from "@mui/icons-material";
import useOrderStore from "../store/orderStore";
import { useEffect, useState } from "react";

const STATUS_STEPS = {
  confirmed: 25,
  preparing: 50,
  otw: 75,
  delivered: 100,
  cancelled: 0,
};
const STATUS_LABELS = {
  confirmed: "Order Confirmed",
  preparing: "Preparing",
  otw: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
const STATUS_COLORS = {
  confirmed: "#2196F3",
  preparing: "#FF9800",
  otw: "#9C27B0",
  delivered: "#4CAF50",
  cancelled: "#F44336",
};

function OrderHistory() {
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Skeleton width={160} height={40} sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[...Array(3)].map((_, i) => (
            <Card key={i} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Skeleton width={140} />
                    <Skeleton width={100} />
                  </Box>
                  <Skeleton width={80} height={30} />
                </Box>
                <Skeleton width="90%" />
                <Skeleton height={20} sx={{ mt: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Skeleton width={60} />
                  <Skeleton width={80} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  if (orders.length === 0) {
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
        <ReceiptLongOutlined
          sx={{ fontSize: 64, color: "text.secondary", opacity: 0.4 }}
        />
        <Typography variant="h6" fontWeight={700}>
          No orders yet
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Your order history will show up here after you place your first order.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Order Now
        </Button>
      </Box>
    );
  }

  return (
    <Box className="page-fade" sx={{ px: 2, py: 3 }}>
      <Typography variant="h5" fontWeight={800} mb={3}>
        Your Orders
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {orders.map((order) => {
          const date = new Date(order.placedAt);
          const formattedDate = date.toLocaleDateString("en-NG", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          return (
            <Card
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
              sx={{ cursor: "pointer", borderRadius: 3 }}
            >
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={800}>
                      {order.restaurantName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formattedDate} · #{order.id}
                    </Typography>
                  </Box>
                  <Chip
                    label={STATUS_LABELS[order.status]}
                    size="small"
                    sx={{
                      bgcolor: STATUS_COLORS[order.status],
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.6rem",
                      height: 20,
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={1.5}
                >
                  {order.items
                    .map((i) => `${i.quantity}x ${i.name}`)
                    .join(", ")}
                </Typography>
                {order.status !== "cancelled" && (
                  <Box sx={{ mb: 1.5 }}>
                    <LinearProgress
                      variant="determinate"
                      value={STATUS_STEPS[order.status]}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "action.hover",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: STATUS_COLORS[order.status],
                          borderRadius: 3,
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 0.5,
                      }}
                    >
                      {[
                        "Confirmed",
                        "Preparing",
                        "On the way",
                        "Delivered",
                      ].map((step) => (
                        <Typography
                          key={step}
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: "0.55rem" }}
                        >
                          {step}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={800}
                    color="primary.main"
                  >
                    ₦{order.total.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default OrderHistory;
