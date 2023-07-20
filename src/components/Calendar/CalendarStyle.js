import React, { useState } from "react";
import Calendar from "react-calendar";
import "./CalendarStyle.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const CalendarStyle = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(new Date());

  const dateChangeHandler = (e) => {
    setOpen(true);
    setValue(e);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="create_btn">+ Create</button>
      <Calendar
        value={value}
        onChange={dateChangeHandler}
        // onClickDay={dayHandler}
      />
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CalendarStyle;
