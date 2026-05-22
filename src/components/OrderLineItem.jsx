import { Box, Typography } from "@mui/material";

function OrderLineItem({ item }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}>
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        {item.quantity}x {item.name}
      </Typography>

      <Box
        sx={{
          flex: 1,
          borderBottom: "2px dashed",
          borderColor: "divider",
          mb: "-2px",
        }}
      />

      <Typography
        variant="body2"
        fontWeight={700}
        sx={{ whiteSpace: "nowrap" }}
      >
        ₦{(item.price * item.quantity).toLocaleString()}
      </Typography>
    </Box>
  );
}

export default OrderLineItem;
