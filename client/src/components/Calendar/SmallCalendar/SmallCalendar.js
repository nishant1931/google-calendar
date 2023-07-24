import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../../../utils/getMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GlobalContext from "../../../context/GlobalContext";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const prevMonthHandler = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };

  const nextMonthHandler = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const getCurrentDay = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const daySlc = daySelected && daySelected.format("DD-MM-YY");
    const currday = day.format(format);

    if (nowDay === currday) {
      return "currDateClass";
    } else if (currday === daySlc) {
      return "day_selected";
    } else {
      return "";
    }
  };

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  return (
    <Box mt={6}>
      <header className="small_cal_header">
        <Typography variant="body2" fontSize={14}>
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </Typography>
        <div>
          <span className="chev_icons" onClick={prevMonthHandler}>
            <ChevronLeftIcon fontSize="medium" />
          </span>
          <span className="chev_icons" onClick={nextMonthHandler}>
            <ChevronRightIcon fontSize="medium" />
          </span>
        </div>
      </header>
      <div className="small_cal_grid">
        {currentMonth[0].map((day, i) => (
          <span style={{ textAlign: "center" }} key={i}>
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                className="small_cal_btn"
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
              >
                <p className={`rounded_date ${getCurrentDay(day)}`}>
                  {day.format("D")}
                </p>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Box>
  );
};

export default SmallCalendar;
