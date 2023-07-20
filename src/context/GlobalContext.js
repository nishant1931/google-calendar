import dayjs from "dayjs";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { ADDEVENT, DELETEEVENT, EDITEVENT } from "../constants/dispatchEvents";

const savedEventsReducer = (state, action) => {
  switch (action.type) {
    case ADDEVENT:
      return [...state, action.payload];

    case EDITEVENT:
      return state.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    case DELETEEVENT:
      return state.filter((event) => event.id !== action.payload.id);
    default:
      throw new Error();
  }
};

const initValues = () => {
  const storageEvts = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvts ? JSON.parse(storageEvts) : [];
  return parsedEvents;
};

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (idx) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  savedEvents: [],
  dispatchCall: () => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  selectedLabels: [],
  setSelectedlabels: () => {},
  updateLabel: () => {},
});

export const GlobalContextProvider = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedLabels, setSelectedlabels] = useState([]);

  const [savedEvents, dispatchCall] = useReducer(
    savedEventsReducer,
    [],
    initValues
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      selectedLabels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, selectedLabels]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    setSelectedlabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find(
          (prevLabel) => prevLabel.label === label
        );
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  const updateLabel = (lbl) => {
    setSelectedlabels(
      selectedLabels.map((label) => (label.label === lbl.label ? lbl : label))
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        smallCalendarMonth,
        setSmallCalendarMonth,
        showEventModal,
        setShowEventModal,
        savedEvents,
        dispatchCall,
        selectedEvent,
        setSelectedEvent,
        selectedLabels,
        setSelectedlabels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
