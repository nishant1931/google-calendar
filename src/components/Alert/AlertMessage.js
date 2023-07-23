import { Alert } from "@mui/material";
import React from "react";

const AlertMessage = ({ children, severity }) => {
  return <Alert severity={severity}>{children}</Alert>;
};

export default AlertMessage;
