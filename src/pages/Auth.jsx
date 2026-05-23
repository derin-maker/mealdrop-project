import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
} from "@mui/icons-material";
import useAuthStore from "../store/authStore";

function Auth() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const handleLogin = () => {
    setError("");
    if (!loginForm.email || !loginForm.password) {
      setError("Please fill in all fields");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const found = stored.find(
      (u) => u.email === loginForm.email && u.password === loginForm.password,
    );

    if (!found) {
      setError("Invalid email or password");
      return;
    }

    login({ name: found.name, email: found.email, phone: found.phone });
    navigate("/");
  };

  const handleSignup = () => {
    setError("");
    const { name, email, phone, password, confirm } = signupForm;

    if (!name || !email || !phone || !password || !confirm) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const exists = stored.find((u) => u.email === email);
    if (exists) {
      setError("An account with this email already exists");
      return;
    }

    const newUser = { name, email, phone, password };
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify([...stored, newUser]),
    );
    login({ name, email, phone });
    navigate("/home");
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Box
      className="page-fade"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" fontWeight={800} color="primary">
          🍔 MealDrop
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Food delivered fast across Lagos
        </Typography>
      </Box>

      <Card
        sx={{ width: "100%", maxWidth: 420, borderRadius: 4, boxShadow: 6 }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(_, v) => {
              setTab(v);
              setError("");
            }}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          {tab === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleLogin}
                sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, mt: 1 }}
              >
                Login
              </Button>
            </Box>
          )}

          {/* Signup Form */}
          {tab === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="What should we call you?"
                fullWidth
                value={signupForm.name}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Phone Number"
                fullWidth
                value={signupForm.phone}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, phone: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={signupForm.confirm}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, confirm: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleSignup}
                sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, mt: 1 }}
              >
                Create Account
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="caption"
            color="text.secondary"
            textAlign="center"
            display="block"
          >
            By continuing you agree to MealDrop's Terms & Privacy Policy
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Auth;
