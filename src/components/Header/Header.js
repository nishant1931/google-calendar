import { Box, Container, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

const Header = () => {
  const { googleSignIn, currentUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const googleSignInHandler = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser != null) {
      navigate("/google-calendar");
    }
  }, [currentUser, navigate]);

  return (
    <Box sx={{ bgcolor: "whitesmoke" }}>
      <Container>
        <header className="header_container">
          <Typography variant="h5">Welcome to Google Calendar</Typography>
          <GoogleButton onClick={googleSignInHandler}>Sign in</GoogleButton>
        </header>
      </Container>
    </Box>
  );
};

export default Header;
