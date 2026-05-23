import { Button, Box, Typography } from "@mui/material";
import {
  EmailOutlined,
  PhoneOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProfileHeader({ user }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", alignItems: "left", gap: 2, mb: 3, p: 1.5 }}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "left", gap: 0.5, mb: 0.5, px:1.5 }}>
        <AccountCircleOutlined
          fontSize="large"
          color="primary.main"
          sx={{ borderRadius: "50%", mt: 1.45 }}
        />
        <Typography variant="h3" fontWeight={800}>
          {user.name}
        </Typography>
        </Box>              
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <EmailOutlined fontSize="small" color="action" sx={{mb: 1.5}} />
          <Typography
            variant="body2"
            color="text.secondary"
            display="inline"
            ml={0.5}
            mr={2}
            sx={{mb: 1.5}}
          >
            {user.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PhoneOutlined fontSize="small" color="action" sx={{mb: 1.5}} />
          <Typography
            variant="body2"
            color="text.secondary"
            display="inline"
            ml={0.5}
            sx={{mb: 1.5}}
          >
            {user.phone}
          </Typography>
        </Box>
        <Button variant="outlined" size="small" sx={{ p: 1, mr: 1.5 }}>
          Edit Profile
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{ p: 1 }}
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileHeader;
