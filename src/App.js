import React, { useContext, useEffect, useState } from "react";
import CalendarStyle from "./components/Calendar/CalendarStyle";
import { getMonth } from "./utils/getMonth";
import CalendarHeader from "./components/Calendar/CalendarHeader/CalendarHeader";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar";
import Month from "./components/Calendar/Month/Month";
import GlobalContext from "./context/GlobalContext";
import dayjs from "dayjs";

const App = () => {
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
      {/* <CalendarStyle /> */}
      <Box display="flex" flex={1}>
        <Sidebar />
        <Month month={currentMonth} />
      </Box>
    </Box>
  );
};

export default App;
