import useAuthStore from "../store/authStore";
import { Box, Typography } from "@mui/material";

function Greeting() {
  const time_period = new Date().getHours();
  const message =
    time_period < 12
      ? "Good morning"
      : time_period < 17
        ? "Good afternoon"
        : time_period < 21
          ? "Good evening"
          : "Good night";
  const subline =
    time_period < 12
      ? "Start your day with something good 🍳"
      : time_period < 17
        ? "What are you craving? 🍔"
        : time_period < 21
          ? "Dinner time. Let's go 🍽️"
          : "Late night hunger? We've got you 🌙";

  const { user } = useAuthStore();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
      <Typography variant="h5" fontWeight={800}>
        {message}, {user?.name || "there"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subline}
      </Typography>
    </Box>
  );
}

export default Greeting;
