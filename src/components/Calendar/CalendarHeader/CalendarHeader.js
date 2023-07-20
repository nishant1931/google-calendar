import React, { useContext } from "react";
import logo from "../../../assets/logo.png";
import { Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import dayjs from "dayjs";
import GlobalContext from "../../../context/GlobalContext";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

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

  return (
    <Box display="flex" alignItems="center" padding="10px">
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
  );
};

export default CalendarHeader;
