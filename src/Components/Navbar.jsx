import React, { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab, Grid, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";

const Navbar = ({ links }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate=useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  
  const getTabIndex = () => {
    const path = location.pathname.slice(1);     
    return links.findIndex(link => `/${link.toLowerCase().replace(/\s+/g, "")}` === `/${path}`);
  };
  const handleButtonClick = (buttonName, path) => {
    setActiveButton(buttonName);
    navigate(path); 
  };

  return (
    <AppBar
      sx={{
        backgroundImage:
          "linear-gradient(174deg, rgba(8,8,8,1) 31%, rgba(38,126,130,1) 51%, rgba(212,25,25,1) 84%);",
      }}
      position="fixed"
    >
      <Toolbar>
        {isMatch ? (
          <>
          <img src="/image (2).png" alt="Netflix Logo" style={{ height:50 ,width:95,marginTop:10 }} />
            <DrawerComponent links={links} />
          </>
        ) : (
          <Grid container alignItems="center">
            <Grid item xs={1.8} md={2.5}>
            <img src="/image (2).png" alt="Netflix Logo" style={{ height: 50 ,width:95,marginTop:10 }} />
            </Grid>
            <Grid item xs={6} md={6}>
              <Tabs centered textColor="inherit" value={getTabIndex() > -1 &&  getTabIndex()} aria-label="navbar tabs">
                {links.map((link, index) => (
                  <Tab
                    key={index}
                    label={link}
                    onClick={() => {
                      setActiveButton(null); 
                      navigate(`/${link.toLowerCase().replace(/\s+/g, "")}`);
                    }}
                    component={Link}
                    to={`/${link.toLowerCase().replace(/\s+/g, "")}`}
                    sx={{
                      '&.Mui-selected': { color: 'white' },
                      '&:hover': { color: 'white' }
                    }}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={4.2} md={3.5} container justifyContent="flex-end">
              <Box  >
              <Button
                  to="/login"
                  sx={{
                    background: activeButton === "login" ? "#b81d24" : "#e50913",
                    '&:hover': { background: "#b81d24" }
                  }}
                  variant="contained"
                  onClick={() => handleButtonClick("login", "/login")} 
                >
                  Log In
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    marginLeft: 2,
                    background: activeButton === "signup" ? "#b81d24" : "#e50913",
                    '&:hover': { background: "#b81d24" }
                  }}
                  variant="contained"
                  onClick={() => handleButtonClick("signup" ,"/signup")}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
