import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const DrawerComponent = ({ links }) => {
  const [open, setopen] = useState(false);
  return (
    <>
      <Drawer
      
        PaperProps={{
          sx: { backgroundColor: "rgba(38,126,130,1)" },
        }}
        open={open}
        onClose={() => setopen(false)}
      >
        <List>
          {links.map((link, index) => (
            <ListItemButton
              component={Link}
              to={`/${link.toLowerCase().replace(/\s+/g, "")}`}
              key={index}
              divider
              onClick={() => setopen(false)}
            >
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>{link}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',flexGrow: 1, justifyContent: 'flex-end',}}>
          <Button
            component={Link}
            to="/login"
            sx={{
              color: "white",
              backgroundColor: "transparent",
              mb: 2,
              width: '85%',
              '&:hover': { backgroundColor: "#b81d24" },
            }}
            variant="contained"
            onClick={() => setopen(false)} 
          >
            Log In
          </Button>
          <Button
            component={Link}
            to="/signup"
            sx={{
              color: "white",
              backgroundColor: "transparent",
              width: '85%',
              mb:1,
              '&:hover': { backgroundColor: "#b81d24" },
            }}
            variant="contained"
            onClick={() => setopen(!open)} 
          >
            SignUp
          </Button>
        </Box>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setopen(!open)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};
export default DrawerComponent;
