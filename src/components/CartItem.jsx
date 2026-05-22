import useCartStore from "../store/cartStore";
import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material";
import {
  AddOutlined,
  RemoveOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <Card sx={{ display: "flex", p: 2, gap: 2 }}>
      <CardMedia
        component="img"
        sx={{ borderRadius: 2, width: 80, height: 90, objectFit: "cover" }}
        image={item.image}
        title={item.name}
      />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="body2" fontWeight="700">
          {item.name}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          ₦{item.price.toLocaleString()}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <RemoveOutlined fontSize="small" />
          </IconButton>
          <Typography variant="body2" fontWeight={700}>
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <AddOutlined fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "primary.main" }} fontWeight={800}>
            ₦{(item.price * item.quantity).toLocaleString()}
          </Typography>
          <IconButton onClick={() => removeItem(item.id)} size="small">
            <DeleteOutlined sx={{ color: "error.main" }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
export default CartItem;
