import React, { useContext } from "react";
import createEventSvg from "../../assets/plus.svg";
import GlobalContext from "../../context/GlobalContext";

const CreateEvent = () => {
  const { setShowEventModal } = useContext(GlobalContext);

  const showEventModalHandler = () => {
    setShowEventModal((prevState) => !prevState);
  };

  return (
    <button className="create_btn" onClick={showEventModalHandler}>
      <img src={createEventSvg} alt="create-event" />
      <span>Create</span>
    </button>
  );
};

export default CreateEvent;
