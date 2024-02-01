import React from "react";
import { Fab } from "react-tiny-fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function FabButton() {
  let navigate = useNavigate();
  const toChats = () => {
    navigate("/chats");
  };
  return (
    <Fab
      icon={<FontAwesomeIcon icon={faMessage} />}
      event="hover"
      onClick={toChats}
    ></Fab>
  );
}
