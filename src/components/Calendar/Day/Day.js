import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setDaySelected,
    setShowEventModal,
    savedEvents,
    setSelectedEvent,
    filteredEvents,
  } = useContext(GlobalContext);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "currentDate"
      : "";
  };

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    setDayEvents(events);
  }, [filteredEvents, day]);

  return (
    <Box
      pt={1}
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
        cursor: "pointer",
        border: " 1px",
        borderColor: "#eee",
        borderStyle: "solid",
        height: "100%",
      }}
      onClick={() => {
        setShowEventModal(true);
        setDaySelected(day);
      }}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {rowIdx === 0 && (
          <Typography variant="body1" align="center">
            {day.format("ddd").toUpperCase()}
          </Typography>
        )}

        <Typography
          variant="body1"
          align="center"
          className={`${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </Typography>
        {dayEvents.map((evt) => (
          <Box
            key={evt.id}
            fontSize={12}
            sx={{
              bgcolor: `${evt.label}`,
              color: "#fff",
              width: "100%",
              padding: "2px 4px",
              borderRadius: "6px",
            }}
            my="1px"
            onClick={() => setSelectedEvent(evt)}
          >
            {evt.title}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Day;
