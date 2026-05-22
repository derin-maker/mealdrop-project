import { Box, Typography, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import useCartStore from "../store/cartStore";

function CheckoutBar() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  );
  const count = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  return (
    <Slide direction="up" in={items.length > 0} mountOnEnter unmountOnExit>
      <Box
        onClick={() => navigate("/cart")}
        sx={{
          position: "fixed",
          bottom: "96px",
          left: "auto",
          right: 16,
          width: { xs: 260, sm: 300 },
          maxWidth: "calc(100% - 32px)",
          zIndex: 999,
          background: "linear-gradient(135deg, #E63946 0%, #F4A261 100%)",
          borderRadius: "999px",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          boxShadow: "0 8px 32px rgba(230, 57, 70, 0.4)",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          "&:hover": { transform: "translateY(-2px)" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.25)",
              borderRadius: "999px",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color="white" fontWeight={800}>
              {count}
            </Typography>
          </Box>
          <ShoppingCartOutlined sx={{ color: "white", fontSize: 18 }} />
          <Typography variant="body2" color="white" fontWeight={700}>
            View Cart
          </Typography>
        </Box>
        <Typography variant="body2" color="white" fontWeight={800}>
          ₦{total.toLocaleString()}
        </Typography>
      </Box>
    </Slide>
  );
}

export default CheckoutBar;
