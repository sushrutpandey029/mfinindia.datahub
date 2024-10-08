import * as React from 'react';
import ReactDatamaps from "react-india-states-map";
import { useState } from "react";
import axios from "axios";
import './styles.css';
//import {useParams} from "react-router-dom";
const STATES = {
  Maharashtra: {
    value: 50,
    content: {
      txt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A quisquam quae laboriosam sed magni aliquam dolore sequi libero harum, hic nihil. Omnis eos deserunt molestiae harum, cum nemo et temporibus?"
    }
  }
};

function StateResults(props) {
  const [getDateCreated, setDateCreated] = useState("");
  const [getDRICategory, setDRICategory] = useState("");
  const [getDRIScore, setDRIScore] = useState(0);
  const [getDRIGLP, setDRIGLP] = useState(0);
  const [getDRIGLPRank, setDRIGLPRank] = useState(0);
  const [getDRINoofAC, setDRINoofAC] = useState(0);
  const [getDRINoofUB, setDRINoofUB] = useState(0);
  const [getDRINoofFls, setDRINoofFls] = useState(0);

  const [getDensityofFI, setDensityofFI] = useState(0);
  const [getDRIAccountUB, setDRIAccountUB] = useState(0);
   const [getDRIDepthofOutreach, setDRIDepthofOutreach] = useState(0);
   const [getDRIPortfolioGDDP, setDRIPortfolioGDDP] = useState(0);
   const [getDRIPAR60days, setDRIPAR60days] = useState(0);
   const [getDRIRader_ringLeader, setDRIRader_ringLeader] = useState(0);
   const [getDRIRadar_risky_area, setDRIRadar_risky_area] = useState(0);
   const [getDRIRadar_external_inciter, setDRIRadar_external_inciter] = useState(0);
   const [getDRIRadar_Negative_area, setDRIRadar_Negative_area] = useState(0);
   const [getDRICGRM_query, setDRICGRM_query] = useState(0);
   const [getDRICGRM_complaint, setDRICGRM_complaint] = useState(0);
   const [getDRICGRM_resolved, setDRICGRM_resolved] = useState(0);
  
  const fetchData = async() => {
    try {
      const result = await axios.get("https://dataweb.akosmdtech.com/api/auth/dri-states?statename="+props.statename)
      console.log(result, "resultAll");
      const response = result.data.data;
      var jsonInfo = JSON.parse(response.jsonData);
      setDateCreated(response.date_of_created);
      setDRICategory(response.jsonData.DRI_Cat);
      setDRIScore(response.jsonData.DRI_Score);
      setDRIGLP(response.GLP);
      setDRIGLPRank(response.GLP_Rank);
      setDRINoofAC(jsonInfo['No_of_Ac']);
      setDRINoofUB(jsonInfo['No_of_Ubs']);
      setDRINoofFls(jsonInfo['No_of_Fis']);
      setDensityofFI(jsonInfo['Density_of_FI']);
      setDRIAccountUB(jsonInfo['Account_UB']);
      setDRIDepthofOutreach(jsonInfo['Depth_of_outreach']);
      setDRIPortfolioGDDP(jsonInfo['portfolio_GDDP_per_HH']);
      setDRIPAR60days(jsonInfo['PAR_Gr_60_days']);
      setDRIRader_ringLeader(jsonInfo['Rader_ringLeader']);
      setDRIRadar_risky_area(jsonInfo['Radar_risky_area']);
      setDRIRadar_external_inciter(jsonInfo['Radar_external_inciter']);
      setDRIRadar_Negative_area(jsonInfo['Radar_Negative_area']);
      setDRICGRM_query(jsonInfo['CGRM_query']);
      setDRICGRM_complaint(jsonInfo['CGRM_complaint']);
      setDRICGRM_resolved(jsonInfo['CGRM_resolved']);
      console.log(jsonInfo['No_of_Ac'], "result");
    } catch (error) {
      
    }
      }
      React.useEffect(() => {
        fetchData();
      }, [props.statename])
      
  return (
    <>
      <div>
         <h1 style={{fontSize:"22px"}}>{props.statename}<span style={{color:"white"}}>({getDateCreated?getDateCreated:"N/A"})</span></h1>
         {getDRICategory?
         <p style={{marginTop:"10px",marginBottom:"10px"}}>DRI Category : <span style={{color:"white"}}>{getDRICategory?getDRICategory:"N/A"}</span> | DRI Score : <span style={{color:"white"}}>{getDRIScore?getDRIScore:"0.00"}%</span></p>:""}
         <p style={{marginBottom:"10px"}}>GLP(Rs Cr) : <span style={{color:"white"}}>{getDRIGLP?getDRIGLP:"0"}</span> | GLP Rank : <span style={{color:"white"}}>{getDRIGLPRank?getDRIGLPRank:"0"}</span></p>
         <p style={{marginBottom:"10px"}}>No of Ac : <span style={{color:"white"}}>{getDRINoofAC?getDRINoofAC:"0"}</span> | No of UBs : <span style={{color:"white"}}>{getDRINoofUB?getDRINoofUB:"0"}</span> | No of Fls : <span style={{color:"white"}}>{getDRINoofFls?getDRINoofFls:"0"}</span></p>
         {getDensityofFI?
         <p style={{marginBottom:"10px"}}>Density of FI : <span style={{color:"white"}}>{getDensityofFI?getDensityofFI:"0"} </span> </p>:""
         }
         {getDRIAccountUB?
         <p style={{marginBottom:"10px"}}>Account/UB : <span style={{color:"white"}}>{getDRIAccountUB?getDRIAccountUB:"0"} </span> </p>:""}
         {getDRIDepthofOutreach?
         <p style={{marginBottom:"10px"}}>Depth of Outreach : <span style={{color:"white"}}>{getDRIDepthofOutreach?getDRIDepthofOutreach:"0"} </span></p>:""}
         {getDRIPortfolioGDDP?
         <p style={{marginBottom:"10px"}}>Portfolio/GDDP (per HH) : <span style={{color:"white"}}>{getDRIPortfolioGDDP?getDRIPortfolioGDDP:"0"} </span> </p>:""}
         {getDRIPortfolioGDDP?
         <p style={{marginBottom:"10px"}}>PAR 60 days : <span style={{color:"white"}}>{getDRIPAR60days?getDRIPAR60days:"0"} </span></p>:""}

         <h2 style={{fontSize:"18px"}}>Radar</h2>
         <p style={{marginTop:"10px",marginBottom:"10px"}}>Ring Leader : <span style={{color:"white"}}>{getDRIRader_ringLeader?getDRIRader_ringLeader:"0"}</span> | External Inciter : <span style={{color:"white"}}>{getDRIRadar_risky_area?getDRIRadar_risky_area:"0"}</span></p>
         <p style={{marginBottom:"10px"}}>Risk Area : <span style={{color:"white"}}>{getDRIRadar_external_inciter?getDRIRadar_external_inciter:"0"}</span> | Negative Area : <span style={{color:"white"}}>{getDRIRadar_Negative_area?getDRIRadar_Negative_area:"0"}</span></p>

         <h2 style={{fontSize:"18px"}}>CGRM (for {getDateCreated?getDateCreated:"N/A"})</h2>
         <p style={{marginTop:"10px",marginBottom:"10px"}}>Query : <span style={{color:"white"}}>{getDRICGRM_query?getDRICGRM_query:"0"}</span> | Complaint : <span style={{color:"white"}}>{getDRICGRM_complaint?getDRICGRM_complaint:"0"}</span> | Resolved : <span style={{color:"white"}}>{getDRICGRM_resolved?getDRICGRM_resolved:"0"}</span></p>
       </div>
    </>
  );
}
const StateMapData = () => {
  const [activeState, setactiveState] = useState({
    data: STATES.Maharashtra,
    name: "India"
  });

  const [stateLists, setStateLists] = useState(STATES);

  const stateOnClick = (data, name) => {
    console.log("jhjhjkhkjhkh",stateLists);
    setactiveState({ data, name });
  };
  
  return (
    <>
    <div className='mapWidth'>
    <ReactDatamaps 
      mapLayout={{
        height: 90,
        width: 70,
        title: "Wrong Product",
        legendTitle: "Legend",
        hoverTitle: "Count",
        noDataColor: "#F4F5F7",
        BackgroundColor: "#F4F5F7",
        Background: "#F4F5F7",
        borderColor: "#000000",
        hoverBorderColor: "pink",
        hoverColor: "#39B1AC"
      }}
      hoverComponent={({ value }) => {
        return (
          <>
           <div>
           <StateResults statename={value.name} />
{/* 
            <h1 style={{fontSize:"22px"}}>{ value.name }<span style={{color:"white"}}>(30/04/2023)</span></h1>
            <p style={{marginTop:"10px",marginBottom:"10px"}}>DRI Category : <span style={{color:"white"}}>High</span> | DRI Score : <span style={{color:"white"}}>41.38%</span></p>
            <p>GLP(Rs Cr) : <span style={{color:"white"}}>49</span> | GLP Rank : <span style={{color:"white"}}>561</span></p>
            <p style={{marginBottom:"10px"}}>No of Ac(000) : <span style={{color:"white"}}>19</span> | No of UBs(000) : <span style={{color:"white"}}>14</span> | No of Fls : <span style={{color:"white"}}>42</span></p>
            <p style={{marginBottom:"10px"}}>Density of FI : <span style={{color:"white"}}>4.6 </span> | Percentile : <span style={{color:"white"}}>62.94%</span></p>
            <p style={{marginBottom:"10px"}}>Account/UB : <span style={{color:"white"}}>4.6 </span> | Percentile : <span style={{color:"white"}}>62.94%</span></p>
            <p style={{marginBottom:"10px"}}>Depth of Outreach : <span style={{color:"white"}}>4.6 </span> | Percentile : <span style={{color:"white"}}>62.94%</span></p>
            <p style={{marginBottom:"10px"}}>Portfolio/GDDP (per HH) : <span style={{color:"white"}}>4.6 </span> | Percentile : <span style={{color:"white"}}>62.94%</span></p>
            <p style={{marginBottom:"10px"}}>PAR 60 days : <span style={{color:"white"}}>4.6 </span> | Percentile : <span style={{color:"white"}}>62.94%</span></p>

            <h2 style={{fontSize:"18px"}}>Radar</h2>
            <p style={{marginTop:"10px",marginBottom:"10px"}}>Ring Leader : <span style={{color:"white"}}>0</span> | External Inciter : <span style={{color:"white"}}>0</span></p>
            <p style={{marginBottom:"10px"}}>Risk Area : <span style={{color:"white"}}>0</span> | Negative Area : <span style={{color:"white"}}>0</span></p>

            <h2 style={{fontSize:"18px"}}>CGRM (for April 2023)</h2>
            <p style={{marginTop:"10px",marginBottom:"10px"}}>Query : <span style={{color:"white"}}>0</span> | Complaint : <span style={{color:"white"}}>0</span> | Resolved : <span style={{color:"white"}}>0</span></p> */}
          </div>
          </>
        );
      }}
      onClick={stateOnClick}
      activeState={activeState}
    />
    </div>
    </>
  );
};
export default StateMapData;
