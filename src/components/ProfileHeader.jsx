import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  EmailOutlined,
  PhoneOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProfileHeader({ user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const handleSave = () => {
    updateUser(editForm);
    setEditOpen(false);
  };
  const { logout, updateUser } = useAuthStore();
  return (
    <Box sx={{ display: "flex", alignItems: "left", gap: 2, mb: 3, p: 1.5 }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            gap: 0.5,
            mb: 0.5,
            px: 1.5,
          }}
        >
          <AccountCircleOutlined
            fontSize="large"
            color="primary.main"
            sx={{ borderRadius: "50%", mt: 1.45 }}
          />
          <Typography variant="h3" fontWeight={800}>
            {user.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmailOutlined fontSize="small" color="action" sx={{ mb: 1.5 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            display="inline"
            ml={0.5}
            mr={2}
            sx={{ mb: 1.5 }}
          >
            {user.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <PhoneOutlined fontSize="small" color="action" sx={{ mb: 1.5 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            display="inline"
            ml={0.5}
            sx={{ mb: 1.5 }}
          >
            {user.phone}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{ p: 1, mr: 1.5, borderRadius: 1.5 }}
          onClick={() => setEditOpen(true)}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          sx={{ p: 1, borderRadius: 1.5 }}
          onClick={() => setOpen(true)}
        >
          Logout
        </Button>
      </Box>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            value={editForm.email}
            onChange={(e) =>
              setEditForm({ ...editForm, email: e.target.value })
            }
            fullWidth
            margin="normal"
          />

          <TextField
            label="Phone"
            value={editForm.phone}
            onChange={(e) =>
              setEditForm({ ...editForm, phone: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              updateUser(editForm);
              setEditOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              logout();
              navigate("/home");
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProfileHeader;
