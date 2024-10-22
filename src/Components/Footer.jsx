import React from "react";
import { Container, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterContainer = styled("footer")({
  backgroundImage:
    "linear-gradient(174deg, rgba(8,8,8,1) 31%, rgba(38,126,130,1) 51%, rgba(212,25,25,1) 84%)",
  color: "#fff",
  padding: "20px 0",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container
        maxWidth={false}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} Asad_Mustafa. All rights reserved.
        </Typography>
        <div style={{ display: "flex", gap: "8px" }}>
          <a
            href="https://www.facebook.com/asad.mustafa.37051?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer" 
            color="inherit"
            underline="none"
          >
            <IconButton style={{ color: "white" }}>
              <FacebookIcon />
            </IconButton>
          </a>
          <a
            href="https://x.com/AsadMustafa1100?t=W8tSJsWU3pOLYNSWmoed0Q&s=09"
            target="_blank"
            rel="noopener noreferrer" 
            color="secondary"
            underline="none"
          >
            <IconButton style={{ color: "white" }}>
              <TwitterIcon />
            </IconButton>
          </a>
          <a
            href="https://www.instagram.com/asad_mustafa313?igsh=MXQ1Z2h3Mjdramd0Nw=="
            target="_blank"
            rel="noopener noreferrer" 
            color="secondary"
            underline="none"
          >
            <IconButton style={{ color: "white" }}>
              <InstagramIcon />
            </IconButton>
          </a>
        </div>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
