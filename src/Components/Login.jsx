import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Avatar,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const paperStyle = {
    padding: 30,
    height: "60vh",
    maxWidth: 320,
    margin: "0 auto",
    position: "relative",
    borderRadius: 10,
  };
  const avatarStyle = { backgroundColor: "rgba(38,126,130,1)" };
  const btnstyle = { margin: "15px 0", backgroundColor: "rgba(38,126,130,1)" };
  const iconStyle = {
    position: "absolute",
    top: 10,
    right: 10,
    color: "primary",
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = username ? "" : "Username is required";
    tempErrors.password = password ? "" : "Password is required";
    setErrors(tempErrors);

    return Object.values(tempErrors).every((error) => error === "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setLoginError("");
      try {
        const res = await axios.post("http://192.168.50.87:8000/login", {
          email: username, 
          password,
        });
        if (res.status === 200) {
          console.log("Login successful");
          setIsSubmitting(false);
          navigate("/home");
        }
      } catch (error) {
        setIsSubmitting(false);
        if (error.response && error.response.status === 400) {
          setLoginError(error.response.data.error);
        } else {
          setLoginError("An error occurred. Please try again.");
        }
      }
    }
  };
  

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ height: "100vh" }}>
      <Paper elevation={3} style={paperStyle}>
        <IconButton onClick={() => navigate("/home")} style={iconStyle}>
          <CancelOutlinedIcon />
        </IconButton>
        <Grid container direction="column" alignItems="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" style={{ margin: "10px 0" }}>
            Log In
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            sx={{ marginTop: "10px" }}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" style={{ color: 'rgba(38,126,130,1)' }} />}
            label="Remember me"
          />
          {loginError && (
            <Typography color="error" style={{ marginTop: "10px", fontSize: "14px" }}>
              {loginError}
            </Typography>
          )}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
        <Typography style={{ marginTop: "10px" }}>
          Do you have an account?{" "}
          <a href="/signup" style={{ color: "rgba(38,126,130,1)", textDecoration: "none" }}>
            Sign Up
          </a>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
