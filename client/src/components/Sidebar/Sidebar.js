import React, { useContext } from "react";
import CreateEvent from "../CreateEvent/CreateEvent";
import SmallCalendar from "../Calendar/SmallCalendar/SmallCalendar";
import EventModal from "../EventModal/EventModal";
import GlobalContext from "../../context/GlobalContext";
import Labels from "../Labels/Labels";

const Sidebar = () => {
  const { showEventModal, setShowEventModal } = useContext(GlobalContext);

  return (
    <aside className="sidebar">
      <CreateEvent />
      <SmallCalendar />
      {showEventModal && (
        <EventModal open={showEventModal} setOpen={setShowEventModal} />
      )}
      <Labels />
    </aside>
  );
};

export default Sidebar;
