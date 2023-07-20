import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, Box, TextField, Typography } from "@mui/material/";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SegmentIcon from "@mui/icons-material/Segment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from "@mui/material/styles";
import GlobalContext from "../../context/GlobalContext";
import {
  ADDEVENT,
  DELETEEVENT,
  EDITEVENT,
} from "../../constants/dispatchEvents";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const labelClasses = [
  "indigo",
  "warning.main",
  "primary.main",
  "error.main",
  "success.main",
];

const EventModal = ({ open, setOpen }) => {
  const { daySelected, dispatchCall, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClasses.find((label) => label === selectedEvent.label)
      : labelClasses[0]
  );

  const handleClose = () => {
    setOpen(false);
  };

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <React.Fragment>
            {selectedEvent && (
              <IconButton
                aria-label="close"
                onClick={() => {
                  dispatchCall({ type: DELETEEVENT, payload: selectedEvent });
                  setOpen(false);
                }}
                sx={{
                  position: "absolute",
                  right: 48,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}

            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        ) : null}
      </DialogTitle>
    );
  }

  const submitEventsHandler = (e) => {
    e.preventDefault();

    const calendarEvents = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCall({ type: EDITEVENT, payload: calendarEvents });
    } else {
      dispatchCall({ type: ADDEVENT, payload: calendarEvents });
    }

    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        sx={{ background: "transparent" }}
      >
        <BootstrapDialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          //   id="customized-dialog-title"
          onClose={handleClose}
        >
          <DragHandleIcon className="icons" />
        </BootstrapDialogTitle>
        <DialogContent sx={{ paddingBottom: "6px" }}>
          <TextField
            id="title"
            autoFocus={false}
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Add Title"
            type="text"
            key="title"
            fullWidth
            variant="standard"
          />
          <Box my={2} display="flex" alignItems="center" gap={1}>
            <AccessTimeIcon className="icons" fontSize="small " />
            <Typography variant="subtitle2">
              {daySelected.format("dddd, MMMM DD")}
            </Typography>
          </Box>
          <Box my={1} display="flex" alignItems="center" gap={1}>
            <SegmentIcon className="icons" fontSize="small " />
            <TextField
              // margin="dense"
              id="description"
              name="description"
              multiline
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Description"
              size="small"
              type="text"
              fullWidth
            />
          </Box>
          <Box my={2} display="flex" alignItems="center" gap={1}>
            <BookmarkBorderIcon className="icons" fontSize="small " />
            <div className="color_boxes">
              {labelClasses.map((color, i) => (
                <Box
                  onClick={() => setSelectedLabel(color)}
                  key={i}
                  className="color_box"
                  sx={{ bgcolor: `${color}`, width: "20px", height: "20px" }}
                >
                  {selectedLabel === color && (
                    <CheckCircleOutlineIcon
                      fontSize="small"
                      className="check_icon"
                    />
                  )}
                </Box>
              ))}
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={submitEventsHandler}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventModal;