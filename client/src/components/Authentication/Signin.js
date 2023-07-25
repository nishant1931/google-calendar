import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import AlertMessage from "../Alert/AlertMessage";

const emailFormat = /.+@.+\.[A-Za-z]+$/;

const Signin = () => {
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

  const { signInUser } = useContext(GlobalContext);

  const navigate = useNavigate();

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
      await signInUser(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Box sx={{ maxWidth: "500px", margin: "16px auto" }}>
      {error && <AlertMessage severity="error">{error}</AlertMessage>}
      <Box>
        <Typography textAlign="center" variant="h4" py={2}>
          Sign in to your account
        </Typography>
        <Typography variant="subtitle1" py={2}>
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline">
            Sign up.
          </Link>
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            error={emailIsInvalid}
            onBlur={() => setEmailTouched(true)}
            helperText={emailTouched && emailIsInvalid && "Enter valid email"}
            id="email"
            name="email"
            label="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            error={passwordIsInvalid}
            onBlur={() => () => setPasswordTouched(true)}
            helperText={
              passwordTouched && passwordIsInvalid && "Enter your password"
            }
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
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
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default Signin;
