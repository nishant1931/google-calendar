import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "./utils/getMonth";
import CalendarHeader from "./components/Calendar/CalendarHeader/CalendarHeader";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar";
import Month from "./components/Calendar/Month/Month";
import GlobalContext from "./context/GlobalContext";
import dayjs from "dayjs";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import GoogleCalendarPage from "./pages/GoogleCalendarPage";
import Protect from "./components/Protect";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route
        exact
        path="/google-calendar"
        element={
          <Protect>
            <GoogleCalendarPage />
          </Protect>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
