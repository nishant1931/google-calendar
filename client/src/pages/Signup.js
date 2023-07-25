import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import GlobalContext from "../context/GlobalContext";
import AlertMessage from "../components/Alert/AlertMessage";

const emailFormat = /.+@.+\.[A-Za-z]+$/;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailPatternValid = emailFormat.test(email);
  const emailIsValid = email.trim() !== "" && emailPatternValid;
  const passwordIsValid = password.trim() !== "";
  const emailIsInvalid = !emailIsValid && emailTouched;
  const passwordIsInvalid = !passwordIsValid && passwordTouched;

  const { createUser } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailIsValid) {
      setEmailTouched(true);
      return;
    }

    if (!passwordIsValid) {
      setPasswordTouched(true);
      return;
    }

    setEmailTouched(false);
    setPasswordTouched(false);

    setError("");
    try {
      await createUser(email, password);
      return true;
    } catch (error) {
      console.log(error);
      setError(error.message);
      return false;
    }
  };

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setError("");
  //     }, 3000);
  //   }, [error]);

  return (
    <React.Fragment>
      <Header />
      <Container>
        {error && <AlertMessage severity="error">{error}</AlertMessage>}
        <Box sx={{ maxWidth: "500px", margin: "16px auto" }}>
          <Box>
            <Typography textAlign="center" variant="h4" py={2}>
              Sign up for free
            </Typography>
            <Typography variant="subtitle1" py={2}>
              Already have an account?
              <Link to="/">Login.</Link>
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                id="email"
                error={emailIsInvalid}
                onBlur={() => setEmailTouched(true)}
                helperText={
                  emailTouched && emailIsInvalid && "Enter valid email"
                }
                name="email"
                label="Email"
                size="small"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                id="password"
                error={passwordIsInvalid}
                onBlur={() => () => setPasswordTouched(true)}
                helperText={
                  passwordTouched && passwordIsInvalid && "Enter your password"
                }
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                type="password"
                fullWidth
              />
            </Box>

            <Button
              fullWidth
              sx={{ display: "inline-block", margin: "10px 0 " }}
              variant="contained"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Signup;
