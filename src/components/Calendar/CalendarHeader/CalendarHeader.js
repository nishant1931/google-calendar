import React, { useContext } from "react";
import logo from "../../../assets/logo.png";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import dayjs from "dayjs";
import GlobalContext from "../../../context/GlobalContext";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex, currentUser, logout } =
    useContext(GlobalContext);

  const prevMonthHandler = () => {
    setMonthIndex(monthIndex - 1);
  };

  const nextMonthHandler = () => {
    setMonthIndex(monthIndex + 1);
  };

  const currentDateHandler = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="10px"
    >
      <Box display="flex" alignItems="center">
        <img src={logo} alt="google-calendar-logo" className="logo" />
        <Typography variant="h6" fontSize={32} color="#444" ml={2}>
          Calendar
        </Typography>
        <button className="header_btn" onClick={currentDateHandler}>
          Today
        </button>

        <span className="chev_icons" onClick={prevMonthHandler}>
          <ChevronLeftIcon fontSize="large" />
        </span>
        <span className="chev_icons" onClick={nextMonthHandler}>
          <ChevronRightIcon fontSize="large" />
        </span>
        <Typography variant="h2" fontSize={30} color="#444" ml={3}>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </Typography>
      </Box>
      {currentUser && (
        <Box sx={{ cursor: "pointer", display: "flex", gap: "10px" }}>
          <Avatar alt="Remy Sharp" src={currentUser.photoURL} />
          <Button variant="contained" size="small" onClick={logoutHandler}>
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CalendarHeader;
