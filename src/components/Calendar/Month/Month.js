import React from "react";
import Day from "../Day/Day";
import { Box, Grid } from "@mui/material";

const Month = ({ month }) => {
  return (
    <Grid width="100%">
      {month.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "spaceBetween",
            height: `calc(100%/${month.length})`,
            // padding: "20px 0",
            // gap: "10px",
          }}
        >
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </Box>
      ))}
    </Grid>
  );
};

export default Month;
