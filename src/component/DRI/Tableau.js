import { Padding } from "@mui/icons-material";
import React from "react";
import ReactDOM from "react-dom";
//c =
function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

function Tableau(props) {
  return (
    <div className="IframeApp">
      <Iframe iframe={props.GetIframInfo}  />,
    </div>
  );
};
export default Tableau;