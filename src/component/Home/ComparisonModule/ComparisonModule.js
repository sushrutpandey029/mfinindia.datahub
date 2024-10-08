import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import * as React from 'react';
 import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import GrassIcon from '@mui/icons-material/Grass';
 import { useState, useEffect } from "react";
 import TabContext from '@mui/lab/TabContext';
 
import "date-fns"; 
import Breadcrumb from "../../common/Breadcrumb";

import 'bootstrap/dist/css/bootstrap.min.css';
  





//Comprission Report for MFI start from here
import ComprisionReport from "../../Micrometer/Comprision/ComprisionReport";
//Comprission Report for MFI end here

// ***************  Others  : End ************************
 import { BaseUrl } from "../../url/url";
import axios from "axios";
import authHeaders from "../../Service/AuthHeaders";
import { Link } from "react-router-dom";
import parse from 'html-react-parser'

const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#2B60AD !important"
    },
    Uploadbg: {
      borderBottomColor: "#058283 !important",
      borderBottom: "2px solid"
    },
    Uploadbg_1: {
      borderBottomColor: "#DC3912 !important",
      borderBottom: "2px solid"
    },
    Uploadbg_2: {
      borderBottomColor: "#3366CC !important",
      borderBottom: "2px solid"
    },
    download_text: {
      color: "#918585",
      textDecoration: "underline  !important",
      fontStyle: "italic  !important",
      fontFamily: "auto  !important"
    },
    headingText: {
      textAlign: "left",
      fontSize: "18.5px !important",
      color: "#515454 !important",
      fontWeight: "bold !important",
    },
    headingHR: {
      borderBottom: "2px solid",
      borderBottomColor: "#b1b1b1 !important",
      marginBottom: "10px"
    },
    headingTitleBox: {
      paddingBottom: "12px !important",
      padding: "11px !important"
    },
    headingTitle: {
      fontSize: "17px !important",
      fontWeight: "bold !important"
    }
  })
);

const ComparisonModule = () => {

  var userdetails = JSON.parse(localStorage.getItem('user'))
  var userRole = JSON.parse(userdetails.data.userRole)
  // console.log("User Details", userRole);
  // console.log("userRole Details", userRole[2]['subkey'][0]['subkey_name']);
  const classes = useStyle();
  const [value, setValue] = useState('1');
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };
  const graphFilterInitialState = {
    fromMonth: new Date("Aug-2018"),
    toMonth: new Date("Mar-2019"),
    maxDate: new Date("Mar-2020"),
    Quatar: "Mar-23",
    Period: "Q4 FY 22-23",
    dateSeries: "2017",
    isLoader: false,
    isDisabled: false
  }

  const formInitialState = {
    entity: "Uni",
    Quatar: "Mar-23",
    Period: "Q4 FY 22-23",
    region: 0,
    states: 0,
    districts: [0],
    aspirational: 0,
    types: "GLP",
    fromMonth: new Date("Aug-2018"),
    toMonth: new Date("Mar-2019"),
    dateSeries: "2017",
    isLoader: false,
    isDisabled: false
  } 
  const [graphFilter, setGraphFilter] = useState(graphFilterInitialState);
  const [Quatars, setQuatarList] = useState([]);
  const [formState, setFormState] = useState(formInitialState);
  const getQuatarList = async () => {
    const api = 'api/auth/mm-quater-list';
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setQuatarList(response.data.data);
      setGraphFilter({ ...graphFilter, ['Quatar']: response.data.maxDate})
      setGraphFilter({ ...graphFilter, ['Period']: response.data.maxperiod})
    }).catch((error) => {
      console.log('error', error)
    })
  } 

  const [pTopTenMfiLabels, setTopTenPMfiLabels] = useState([]);
  const [pTopTenMfiSerise, setTopTenPMfiSerise] = useState([]);
  // top ten state
  const [pqTopStateGLPSeries, setPqTopStateGLPSeries] = useState([]);
  const [pqTopStateGLPLabels, setpqTopStateGLPLabels] = useState([]);
  //disbursement top ten state
  const [disburseTopStateGLPSeries, setDisburseTopStateGLPSeries] = useState([]);
  const [disburseTopStateGLPLabels, setDisburseTopStateGLPLabels] = useState([]);
  //loan port folio graph
  const [pLoanPortfolioLabels, setPLoanPortfolioLabels] = useState([]);
  const [pLoanPortfolioSeries, setPLoanPortfolioSeries] = useState([]);
  // portfolio employee loan and branches
  const [pELOBThousandLables, setPELOBThousandLables] = useState([]);
  const [pELOBThousandSeries, setPELOBThousandSeries] = useState([]);
  // portfolio average loan outstanding disbursement
  const [pAverageLoanDisbursementLables, setPAverageLoanDisbursementLables] = useState([]);
  const [pAverageLoanDisbursementSeries, setPAverageLoanDisbursementSeries] = useState([]);
  // disbursement top ten mfi graph
  const [dTopTenMfiLoanAmtLabels, setDTopTenMfiLoanAmtLabels] = useState([]);
  const [dTopTenMfiLoanAmtSeries, setDTopTenMfiLoanAmtSeries] = useState([]);

   

  //Attrition Rate by position
  const [hrAttritionRatePositionSeries, setHrAttritionRatePositionSeries] = useState([]);
  const [hrAttritionRatePositionLabels, setHrAttritionRatePositionLabels] = useState([]);

   

    //Disbursement MFI Size (Rs) graph
    const [pDisbursementMfiWiseLabels, setPDisbursementMfiWiseLabels] = useState([]);
    const [pDisbursementMfiWiseSeries, setPDisbursementMfiWiseSeries] = useState([]);
    const [ShowDate, setShowDate] = useState("");

    //Distribution of MFIs as per size
    const [DistributionMFISizesLabels, setDistributionMFISizesLabels] = useState([]);
    const [DistributionMFISizesSeries, setDistributionMFISizesSeries] = useState([]);
    const [DistributionMFISizesDateTitle, setDistributionMFISizesDateTitle] = useState([]);

  

  // Outreach Tab Start from Here
  
  // Outreach Tab End Here

  const [pqPortfolioRiskLables, setPqPortfolioRiskLables] = useState([]);
  const [pqPortfolioRiskSeries, setPqPortfolioRiskSeries] = useState([]);

  const [pqComparisonLables, setPqComparisonLables] = useState([]);
  const [pqComparisonSeries, setPqComparisonSeries] = useState([]);

  const [pqRiskTopFifteenState, sePqRiskTopFifteenState] = useState([]);
  const [pqRiskTopFifteenStateTitle, setPqRiskTopFifteenStateTitle] = useState('');

  

  const [fEquityPositionsLabels, setFEquityPositionsLabels] = useState([]);
  const [fEquityPositionsSeries, setFEquityPositionsSeries] = useState([]);

  const [fAssetsOutstandingLabels, setFAssetsOutstandingLabels] = useState([]);
  const [fAssetsOutstandingSeries, setFAssetsOutstandingSeries] = useState([])
  


  const [BreakupOutstandingBorrowLabels, setBreakupOutstandingBorrowLabels] = useState([]);
  const [BreakupOutstandingBorrowSeries, setBreakupOutstandingBorrowSeries] = useState([]);
  const [BreakupOutstandingBorrowLatestMonth, setBreakupOutstandingBorrowLatestMonth] = useState([]);
  
  
  
 

const [BreakupBorrowLabels, setBreakupBorrowLabels] = useState([]);
const [BreakupBorrowSeries, setBreakupBorrowSeries] = useState([]);


const [FundingInstructionsLabels, setFundingInstructionsLabels] = useState([]);
const [FundingInstructionsSeries, setFundingInstructionsSeries] = useState([]);


//   const filterdateOutreachGraph = async () => {
//     setGraphFilter({ ...graphFilter, ['isLoader']: true, ['isDisabled']: true });
 
//      await getFinancialGraphData(graphFilter.Quatar, graphFilter.toMonth);

//    await getBreakupOutstandingBorrow(graphFilter.Quatar, graphFilter.toMonth);

//    await getBreakupBorrowOS(graphFilter.Quatar, graphFilter.toMonth);
   
//    await getFundingInstructions(graphFilter.Quatar, graphFilter.toMonth);

//     setGraphFilter({ ...graphFilter, ['isLoader']: false, ['isDisabled']: false });
//   }

 

  console.log("Quatar List",Quatars)
  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="BenchMarks" icon={GrassIcon} />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value} >
                

 
<Grid container spacing={2}>

  <Grid xs={12} sm={12} md={12}>
    <Card style={{ padding: "8px" }} >
      <CardActionArea>
        <CardContent>
          <Typography>
            <ComprisionReport />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  </Grid>
 
</Grid>
 

              </TabContext>

              <Typography style={{textAlign:"left", fontWeight:500}}></Typography>

            </Box>

          </Grid>


        </Grid>
      </Box>
    </>

  );
};

export default ComparisonModule;
