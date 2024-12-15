import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import SearchBox from "../components/SearchBox";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { user, isAuthenticated, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/");
  };

  const handleSignOutClick = () => {
    signout(() => {
      navigate("/");
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#757575" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Job Routing
            </Typography>

            <SearchBox></SearchBox>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user ? (
                <Typography>{`Welcome, ${user.username.toUpperCase()}!`}</Typography>
              ) : (
                ""
              )}
            </Typography>

            <Button
              color="inherit"
              onClick={isAuthenticated ? handleSignOutClick : handleSignInClick}
            >
              {isAuthenticated ? "Sign out" : "Sign in"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
