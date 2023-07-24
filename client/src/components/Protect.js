import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { Navigate } from "react-router-dom";

const Protect = ({ children }) => {
  const { currentUser } = useContext(GlobalContext);

  if (!currentUser) return <Navigate to="/" />;

  return children;
};

export default Protect;
