import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CalendarHeader from "../components/Calendar/CalendarHeader/CalendarHeader";
import Sidebar from "../components/Sidebar/Sidebar";
import Month from "../components/Calendar/Month/Month";
import { getMonth } from "../utils/getMonth";
import GlobalContext from "../context/GlobalContext";

const GoogleCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <Box
      className="calendar_container"
      display="flex"
      flexDirection="column"
      position="relative"
      height="100vh"
    >
      <CalendarHeader />
      <Box display="flex" flex={1}>
        <Sidebar />
        <Month month={currentMonth} />
      </Box>
    </Box>
  );
};

export default GoogleCalendarPage;
