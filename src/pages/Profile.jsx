import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  HomeOutlined,
  WorkOutlined,
  AddOutlined,
  CreditCardOutlined,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";
import ProfileHeader from "../components/ProfileHeader";
import useAuthStore from "../store/authStore";
import useOrderStore from "../store/orderStore";
import { useEffect, useState } from "react";

const PAYMENT_METHODS = [
  {
    id: 1,
    label: "Visa ending in 4242",
    sub: "Expires 12/26",
    icon: <CreditCardOutlined />,
  },
  {
    id: 2,
    label: "App Wallet",
    sub: "₦0.00 balance",
    icon: <AccountBalanceWalletOutlined />,
  },
];

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { orders } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", address: "" });
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const handleEditAddress = () => {
    if (!selectedAddress.label || !selectedAddress.address) return;
    const updated = addresses.map((a) =>
      a.id === selectedAddress.id ? selectedAddress : a,
    );
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    setAddresses(updated);
    setEditAddressOpen(false);
  };
  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem("savedAddresses")) || [],
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address) return;
    const updated = [
      ...addresses,
      { id: Date.now().toString(), ...newAddress },
    ];
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    setAddresses(updated);
    setNewAddress({ label: "", address: "" });
    setAddAddressOpen(false);
  };

  if (!user) {
    return (
      <Box
        className="page-fade"
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
        <Typography variant="h6" fontWeight={700}>
          You're not logged in
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Log in to view your profile, saved addresses, and order history.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Login or Sign Up
        </Button>
      </Box>
    );
  }

  const recentOrders = orders.slice(0, 3);

  return (
    <Box sx={{ px: 2, py: 3, maxWidth: 900, mx: "auto" }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <ProfileHeader user={user} />
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Saved Addresses
                </Typography>
                <Button
                  startIcon={<AddOutlined />}
                  size="small"
                  color="primary"
                  onClick={() => setAddAddressOpen(true)}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {addresses.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No saved addresses yet
                  </Typography>
                ) : addresses.map((addr, i) => (
                  <Box key={addr.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "background.default",
                      }}
                    >
                      <Box sx={{ color: "primary.main", mt: 0.25 }}>
                        {addr.label === "Home" ? (
                          <HomeOutlined fontSize="small" />
                        ) : (
                          <WorkOutlined fontSize="small" />
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={700}>
                          {addr.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {addr.address}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        color="primary.main"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedAddress(addr);
                          setEditAddressOpen(true);
                        }}
                      >
                        Edit
                      </Typography>
                    </Box>
                    {i < addresses.length - 1 && <Divider sx={{ mt: 1 }} />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Payment Methods
                </Typography>
                <Button
                  startIcon={<AddOutlined />}
                  size="small"
                  color="primary"
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {PAYMENT_METHODS.map((method) => (
                  <Box
                    key={method.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "background.default",
                    }}
                  >
                    <Box sx={{ color: "text.secondary" }}>{method.icon}</Box>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>
                        {method.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {method.sub}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Recent Orders
              </Typography>
              <Typography
                variant="body2"
                color="primary.main"
                fontWeight={600}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/orders")}
              >
                View All
              </Typography>
            </Box>
            {recentOrders.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No orders yet
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {recentOrders.map((order) => (
                  <Box
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "background.default",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body2" fontWeight={700}>
                        {order.restaurantName}
                      </Typography>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          fontSize: "0.6rem",
                          height: 18,
                          textTransform: "capitalize",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {order.items
                        .map((i) => `${i.quantity}x ${i.name}`)
                        .join(", ")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        ₦{order.total.toLocaleString()}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: "0.65rem",
                          py: 0.25,
                          px: 1,
                          minWidth: 0,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/menu/${order.restaurantId}`);
                        }}
                      >
                        Reorder
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <Dialog open={addAddressOpen} onClose={() => setAddAddressOpen(false)}>
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent>
          <TextField
            label="Label (e.g. Home, Work)"
            value={newAddress.label}
            onChange={(e) =>
              setNewAddress({ ...newAddress, label: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Full Address"
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, address: e.target.value })
            }
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddAddressOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddAddress}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editAddressOpen} onClose={() => setEditAddressOpen(false)}>
        <DialogTitle>Edit Address</DialogTitle>
        <DialogContent>
          <TextField
            label="Label"
            value={selectedAddress?.label || ""}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, label: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Full Address"
            value={selectedAddress?.address || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                address: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditAddressOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditAddress}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;
