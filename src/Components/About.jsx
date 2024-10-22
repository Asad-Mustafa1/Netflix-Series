import React from "react";
import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Box
      id="aboutus"
      component="section"
      sx={{
        marginTop: "100px",
        padding: "40px 0",
        textAlign: "center",
        color: "white",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to <strong>StreamFlix</strong>, your ultimate destination for
          discovering the best series available right now! At StreamFlix, we
          believe that finding your next favorite show should be as enjoyable as
          watching it. That's why we've curated a list of the top series that
          you simply can't miss.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to enhance your streaming experience by providing
          expertly curated recommendations and keeping you updated with the
          latest in entertainment. We’re passionate about great TV and committed
          to helping you find the perfect series to fit your mood.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for choosing StreamFlix. Happy watching!
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
