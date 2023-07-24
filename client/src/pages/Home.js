import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

import Signin from "../components/Authentication/Signin";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Signin />
      </Container>
    </React.Fragment>
  );
};

export default Home;
