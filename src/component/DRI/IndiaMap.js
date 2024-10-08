import React, { useState } from "react";
import India from "@svg-maps/india";
import { useNavigate } from "react-router-dom";
import "react-svg-map/lib/index.css";
import ReactDatamaps from "react-india-states-map";

function IndiaMap() {
  const navigate = useNavigate();
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [data, setData] = useState("");

  function onLocationClick(event) {
    console.log(event);
    const clickedStateCode = event?.target?.id;
    const clickedStateName = event?.target?.getAttribute("name");

    navigate("/cities", {
      state: { stateCode: clickedStateCode, stateName: clickedStateName },
    });
  }

  return (
    <div>
      <p> {stateName}</p>
      <p> {stateCode}</p>
      <ReactDatamaps map={India} onClick={onLocationClick} />
    </div>
  );
}

export default IndiaMap;