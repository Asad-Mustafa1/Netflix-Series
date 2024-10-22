import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.50.87:8000/contact", formData);
      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "There was an error submitting the form",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Grid id="contact">
      <Card
        sx={{
          maxWidth: 350,
          padding: "20px 5px",
          margin: "0 auto",
          marginTop: "100px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5">
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  name="firstName"
                  placeholder="Enter first name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  name="lastName"
                  placeholder="Enter last name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  placeholder="Enter phone number"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={formData.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="message"
                  label="Message"
                  multiline
                  rows={4}
                  placeholder="Type your message here"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={formData.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "rgba(38,126,130,1)" }}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Contact;
