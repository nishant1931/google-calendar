import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { googleSignIn, currentUser, setLoading, loading } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const googleSignInHandler = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser != null) {
      navigate("/google-calendar");
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) return <h1>Loading....</h1>;

  return (
    <React.Fragment>
      <Box sx={{ bgcolor: "whitesmoke" }}>
        <Container>
          <header className="home_header">
            <Typography variant="h5">Welcome to Google Calendar</Typography>
          </header>
        </Container>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: `50vh`,
        }}
      >
        <Button variant="contained" onClick={googleSignInHandler}>
          Sign in
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Home;
