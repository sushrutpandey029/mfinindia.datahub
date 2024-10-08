import { Padding } from "@mui/icons-material";
import React from "react";
import ReactDOM from "react-dom";
const demos = {
  soundcloud:
    '<iframe style="width:100%; height:750px; border:0; overflow:hidden;"  id="hide-iframe"  scrolling="yes" frameborder="no"  src="https://public.tableau.com/views/DRIMap_April2023Revised/DRIDashboard?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:tabs=no&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:language=en-US&publish=yes&:loadOrderID=0"></iframe>'
};

//c =
function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

function Tableau() {
  return (
    <div className="IframeApp">
      <Iframe iframe={demos["soundcloud"]}  />,
    </div>
  );
};
export default Tableau;