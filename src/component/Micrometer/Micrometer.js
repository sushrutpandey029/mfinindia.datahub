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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import GrassIcon from '@mui/icons-material/Grass';
import CompareIcon from '@mui/icons-material/Compare';
import { useState, useEffect } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableChartIcon from '@mui/icons-material/TableChart';
import DateFieldFilterWithEntities from "../customReport/DateFieldFilterWithEntities";

import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import SortIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PaymentsIcon from '@mui/icons-material/Payments';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Face2Icon from '@mui/icons-material/Face2';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import Breadcrumb from "../common/Breadcrumb";
import Chip from '@mui/material/Chip';
import Loader from "../common/Loader";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

// Overview : Outreach import start from here
import Outreach from "./Overview/Outreach";
import Highlights from "./Overview/Highlights";
//  Overview : Outreach import end here

// Overview : Disbursement import start from here
import Disbursement from "./Overview/Disbursement";
//  Overview : Disbursement import end here

// Overview : ParAnalysis import start from here
import ParAnalysis from "./Overview/ParAnalysis";
//  Overview : ParAnalysis import end here

// Overview : Funding import start from here
import Funding from "./Overview/Funding";
//  Overview : Funding import end here

// Overview : BranchNetwork import start from here
import BranchNetwork from "./Overview/BranchNetwork";
//  Overview : BranchNetwork import end here

// ***************  Portfolio and Outreach : Start ************************

//LoanPortfolio import start from here
import LoanPortfolio from "./Portfolio_Outreach/LoanPortfolio";
//LoanPortfolio import end here

//Distribution of MFIs start from here
import DistributionMFI from "./Portfolio_Outreach/DistributionMFI";
//Distribution of MFIs end here

//TopMFIs import start from here
import TopMFIs from "./Portfolio_Outreach/TopMFIs";
//TopMFIs import end here

//Top 10 State GLP import start from here
import TopStateGLP from "./Portfolio_Outreach/TopStateGLP";
//Top 10 State GLP import end here

//AvgAccounts import start from here
import AvgAccounts from "./Portfolio_Outreach/AvgAccounts";
//AvgAccounts import end here

//PortfolioOutreach import start from here
import PortfolioOutreach from "./Portfolio_Outreach/PortfolioOutreach";
//PortfolioOutreach import end here

// ***************  Portfolio and Outreach : End ************************

// ***************  Disbursement : Start ************************

//Entities wise import start from here
import DisburEntitiesWise from "./Disbursement/DisburEntitiesWise";
//Entities wise import end here

//State wise import start from here
import DisburStateWise from "./Disbursement/DisburStateWise";
//State wise  import end here

//Disbursement (Rs Cr) start from here
import DisbursementLoanAmount from "./Disbursement/DisbursementLoanAmount";
//Disbursement (Rs Cr) end here

//Disbursement MFI-size (Rs Cr) start from here
import DisbursementLoanMFIWiseAmount from "./Disbursement/DisbursementLoanMFIWiseAmount";
//Disbursement MFI-size  (Rs Cr) end here


// ***************  Portfolio Quality : End ************************

//Portfolio at risk import start from here
import PortfolioRisk from "./PortfolioQuality/PortfolioRisk";
//Portfolio at risk import end here

// Overview : COF import start from here
import COF from "./PortfolioQuality/COF";
//  Overview : COF import end here

// ***************  Portfolio Quality : End ************************

// ***************  Financials : Start ************************

//Equity positions (Rs Cr) and leverage start from here
import EquityPositions from "./Financials/EquityPositions";
//Equity positions (Rs Cr) and leverage end here

//Total assets and outstanding borrowings start from here
import AssetsOutstandingBorrow from "./Financials/AssetsOutstandingBorrow";
//Total assets and outstanding borrowings end here

//Funding Instruments start from here
import FundingInstructions from "./Financials/FundingInstructions";
//Funding Instruments end here

//Breakup of borrowings O/s by source (Rs Cr) start from here
import BreakupOutstandingRecieved from "./Financials/BreakupOutstandingRecieved";
//Breakup of borrowings O/s by source (Rs Cr) end here

//Breakup of borrowings recieved by source (Rs Cr) start from here
import BreakBorrowingsSource from "./Financials/BreakBorrowingsSource";
//Breakup of borrowings recieved by source (Rs Cr)) end here

// ***************  Financials  : End ************************

// ***************  HR (Overall, HO & Branch level) : Start ************************

//Staff Distribution start from here
import HRStaffDistribution from "./HR_HO_Branch/HRStaffDistribution";
//Staff Distribution end here

//Staff Distribution by MFI start from here
import HRStaffDistributionbyMFI from "./HR_HO_Branch/HRStaffDistributionbyMFI";
//Staff Distribution by MFI end here

//Attrition Rate by Position start from here
import HRAttritionRateByPosition from "./HR_HO_Branch/HRAttritionRateByPosition";
//Attrition Rate by Position end here

// ***************  HR (Overall, HO & Branch level)  : End ************************

// ***************  Others : Start ************************

//Cost of funds % start from here
import COFPricing from "./Others/COFPricing";
//Cost of funds % end here

//Assest to Liability + Equity Gap Analysis start from here
import ALMAnalysis from "./Others/ALMAnalysis";
//Assest to Liability + Equity Gap Analysisend here

//Comprission Report for MFI start from here
import ComprisionReport from "./Comprision/ComprisionReport";
//Comprission Report for MFI end here

// ***************  Others  : End ************************
import ParBucketAnalysis from "./Overview/ParBucketAnalysis"
import { BaseUrl } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
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

const Micrometer = () => {

  var userdetails = JSON.parse(localStorage.getItem('user'))
  var userRole = JSON.parse(userdetails.data.userRole)

  console.log("User Details", userRole);
  console.log("userRole Details", userRole[2]['subkey'][0]['subkey_name']);
  
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

  const handleGraphToDateChange = (e) => {
    console.log("Value",e.target.value);
    setFormState({ ...formState, ['Quatar']: e.target.value });
    setGraphFilter({ ...graphFilter, ['Quatar']: e.target.value })
  };

  const [outreachSeries, setOutreachSeries] = useState([]);
  const [disbursementSeries, setDisbursementSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [Disbursedlabels, setDisbursedlLabels] = useState([]);
  const [parAnalysisSeries, setParAnalysis] = useState([]);
  const [parBucketAnalysisSeries, setParBucketAnalysis] = useState([]);
  const [parLabels, setParLabels] = useState([]);
  const [fundingLabels, setFundingLabels] = useState([]);
  const [fundingSeries, setFundingSeries] = useState([]);
  const [branchLabels, setBranchLabels] = useState([]);
  const [branchSeries, setBranchSeries] = useState([]);

  const getOverviewGraphData = async () => {
    const api = `api/auth/mm-overview-graph-calculations`;
    await axios.get(`${BaseUrl}/${api}`, { headers: authHeaders() }).then((response) => {
      setLabels(response.data.data.labels);
      setDisbursedlLabels(response.data.data.labels_disbursment);
      setParLabels(response.data.data.parLabels);
      //outreach
      setOutreachSeries([{
        name: 'AUM (Rs Cr)',
        type: 'column',
        data: response.data.data.glp
      }, {
        name: 'No. of Clients (Cr)',
        type: 'line',
        data: response.data.data.noOfClienst
      }])
      // disbursement
      setDisbursementSeries([{
        name: 'No. of Loans Disbursed (Lk)',
        type: 'column',
        data: response.data.data.numberOfLoanDisbursed
      }, {
        name: 'Loan Amount Disbursed (Cr)',
        type: 'line',
        data: response.data.data.loanAmountDisbursed
      }])
      // par analysis
      setParAnalysis(response.data.data.parAnalysisSeries);
      // par bucket analysis
      setParBucketAnalysis(response.data.data.parBucketAnalysisSeries);
      //fundings
      setFundingLabels(response.data.data.fundingLabels);
      setFundingSeries(response.data.data.fundingSeries);
      // branch 
      setBranchLabels(response.data.data.branchLabels);
      setBranchSeries(response.data.data.branchSeries);
    }).catch((error) => {
      console.log('err', error)
    });

  }

  const [overViewHighLights, setOverViewHighLights] = useState([]);

  // get overview highlights data
  const [selectedEntity, setSelectedEntity] = useState("All");
 
  const handleEntity = (e) => {
   setSelectedEntity(e.target.value);
  }


  const getOverHightsRecords = async () => {
      await axios.get(`${BaseUrl}/api/auth/mm-get-overview-highlights`, { headers: authHeaders() }).then((response) => {
      setOverViewHighLights(parse(response.data.data));
     }).catch((error) => {
      console.log('overview err', error)
    });
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

  //HR (Overall,HO & Branch Level)
  const [hrStaffDistributionSeries, setHrStaffDistributionSeries] = useState([]);
  const [hrStaffDistributionLabels, setHrStaffDistributionLabels] = useState([]);
  const [hrStaffDistributionLatestMonth, setHrStaffDistributionLatestMonth] = useState([]);

  const [hrMfiStaffDistributionSeries, setHrMfiStaffDistributionSeries] = useState([]);

  //Attrition Rate by position
  const [hrAttritionRatePositionSeries, setHrAttritionRatePositionSeries] = useState([]);
  const [hrAttritionRatePositionLabels, setHrAttritionRatePositionLabels] = useState([]);

  //Disbursement (Rs) graph
  const [pDisbursementLabels, setPDisbursementLabels] = useState([]);
  const [pDisbursementSeries, setPDisbursementSeries] = useState([]);

    //Disbursement MFI Size (Rs) graph
    const [pDisbursementMfiWiseLabels, setPDisbursementMfiWiseLabels] = useState([]);
    const [pDisbursementMfiWiseSeries, setPDisbursementMfiWiseSeries] = useState([]);
    const [ShowDate, setShowDate] = useState("");

    //Distribution of MFIs as per size
    const [DistributionMFISizesLabels, setDistributionMFISizesLabels] = useState([]);
    const [DistributionMFISizesSeries, setDistributionMFISizesSeries] = useState([]);
    const [DistributionMFISizesDateTitle, setDistributionMFISizesDateTitle] = useState([]);

  const GetDisbursementandHRTab = async (Quatar = 0, endMonth = 0) => {
   
    await axios.get(`${BaseUrl}/api/auth/mm-disburement-rs-graph-record?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      setPDisbursementLabels(response.data.data.labels)
      setPDisbursementSeries(response.data.data.series)
    }).catch((error) => {
      console.log('err', error)
    });

    await axios.get(`${BaseUrl}/api/auth/mm-disbursement-top-ten-mfis-graph?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      setDTopTenMfiLoanAmtLabels(response.data.data.labels)
      setDTopTenMfiLoanAmtSeries(response.data.data.series)
    }).catch((error) => {
      console.log('err', error)
    });

  await axios.get(`${BaseUrl}/api/auth/mm-disburement-mfi-size-graph-record?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
    setPDisbursementMfiWiseLabels(response.data.data.labels)
    setPDisbursementMfiWiseSeries(response.data.data.series)
    setShowDate(response.data.show_date)
  }).catch((error) => {
    console.log('err', error)
  });

     // top 10 state graph disbursement - Outreach
    await axios.get(`${BaseUrl}/api/auth/mm-get-portfolio-top-ten-state?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
  //          //disbusement
   setDisburseTopStateGLPSeries(response.data.data.dSeries)
   setDisburseTopStateGLPLabels(response.data.data.dLabels)
        }).catch((error) => {
          console.log('err', error)
         });

    /* //HR (Overall,HO & Branch Level) */
    // staff distribution 31 march 2023
    await axios.get(`${BaseUrl}/api/auth/mm-hr-staff-distribution-latest-month?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      setHrStaffDistributionLabels(response.data.data.labels)
      setHrStaffDistributionSeries(response.data.data.series)
      setHrStaffDistributionLatestMonth(response.data.data.latestMonth)
    }).catch((error) => {
      console.log('err', error)
    });
    // staff distribution MFI
    await axios.get(`${BaseUrl}/api/auth/mm-hr-staff-distribution-by-mfis?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      setHrMfiStaffDistributionSeries(response.data.data.series)
    }).catch((error) => {
      console.log('err', error)
    });
    //Attrition Rate by position
    await axios.get(`${BaseUrl}/api/auth/mm-hr-attrition-rate-by-position-graph-record?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      setHrAttritionRatePositionSeries(response.data.data.series)
      setHrAttritionRatePositionLabels(response.data.data.labels)
    }).catch((error) => {
      console.log('err', error)
    });




  }

  // Outreach Tab Start from Here
  const getPortfolioOutreachGraphTabData = async (Quatar = 0, endMonth = 0) => {

    //Distribution of MFIs as per size - Outreah
     await axios.get(`${BaseUrl}/api/auth/mm-distribution-by-mfis-size?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
         setDistributionMFISizesLabels(response.data.data.labels)
         setDistributionMFISizesSeries(response.data.data.series)
         setDistributionMFISizesDateTitle(response.data.data.show_date)
       }).catch((error) => {
         console.log('err', error)
       });
 
     // top 10 mfi graph - Outreach
     await axios.get(`${BaseUrl}/api/auth/mm-portfolio-top-ten-state-mfis?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
       setTopTenPMfiLabels(response.data.data.labels)
       setTopTenPMfiSerise(response.data.data.series)
     }).catch((error) => {
       console.log('err', error)
     });
     // top 10 state graph outreach
     await axios.get(`${BaseUrl}/api/auth/mm-get-portfolio-top-ten-state-outreach?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
       setpqTopStateGLPLabels(response.data.data.labels)
       setPqTopStateGLPSeries(response.data.data.series)
     }).catch((error) => {
       console.log('err', error)
     });
 

     // top 10 mfi graph - Outreach
     await axios.get(`${BaseUrl}/api/auth/mm-portfolio-loan-portfolio-graph-record?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
       setPLoanPortfolioLabels(response.data.data.labels)
       setPLoanPortfolioSeries(response.data.data.series)
     }).catch((error) => {
       console.log('err', error)
     });
 
     // portfolio employee loan and branches - Outrach
     await axios.get(`${BaseUrl}/api/auth/mm-portfolio-employee-loan-officers-graph?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
       setPELOBThousandLables(response.data.data.labels)
       setPELOBThousandSeries(response.data.data.series)
     }).catch((error) => {
       console.log('err', error)
     });
     // portfolio average loan outstanding disbursement - Outreach
     await axios.get(`${BaseUrl}/api/auth/mm-portfolio-average-loan-outstanding-disbursement-graph?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
       setPAverageLoanDisbursementLables(response.data.data.labels)
       setPAverageLoanDisbursementSeries(response.data.data.series)
     }).catch((error) => {
       console.log('err', error)
     });
 
   }
  // Outreach Tab End Here

  const [pqPortfolioRiskLables, setPqPortfolioRiskLables] = useState([]);
  const [pqPortfolioRiskSeries, setPqPortfolioRiskSeries] = useState([]);

  const [pqComparisonLables, setPqComparisonLables] = useState([]);
  const [pqComparisonSeries, setPqComparisonSeries] = useState([]);

  const [pqRiskTopFifteenState, sePqRiskTopFifteenState] = useState([]);
  const [pqRiskTopFifteenStateTitle, setPqRiskTopFifteenStateTitle] = useState('');

  const PortfolioQualityGraphData = async (Quatar = 0, endMonth = 0) => {
    await axios.get(`${BaseUrl}/api/auth/mm-pq-get-graph-records?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      setPqPortfolioRiskLables(response.data.data.parLabels);
      setPqPortfolioRiskSeries(response.data.data.parAnalysisSeries);

      setPqComparisonLables(response.data.data.comparisonLabels);
      setPqComparisonSeries(response.data.data.comparisonSeries);
    }).catch((error) => {
      console.log('err', error)
    });

    await axios.get(`${BaseUrl}/api/auth/mm-get-pgtoptfifteenstates?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      sePqRiskTopFifteenState(response.data.data.records);
      setPqRiskTopFifteenStateTitle("(" + response.data.data.lastQuarter + ")");

    }).catch((error) => {
      console.log('err', error)
    });

  }

  const [fEquityPositionsLabels, setFEquityPositionsLabels] = useState([]);
  const [fEquityPositionsSeries, setFEquityPositionsSeries] = useState([]);

  const [fAssetsOutstandingLabels, setFAssetsOutstandingLabels] = useState([]);
  const [fAssetsOutstandingSeries, setFAssetsOutstandingSeries] = useState([])
  
  const getFinancialGraphData = async (Quatar = 0, endMonth = 0) => {
    await axios.get(`${BaseUrl}/api/auth/mm-financials-get-graph-records?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
      setFEquityPositionsLabels(response.data.data.labels);
      setFEquityPositionsSeries(response.data.data.equityPositionSeries);
      setFAssetsOutstandingLabels(response.data.data.labels);
      setFAssetsOutstandingSeries(response.data.data.totalAssetsOutstanding);

    }).catch((error) => {
      console.log('err', error)
    });
  }

  const [BreakupOutstandingBorrowLabels, setBreakupOutstandingBorrowLabels] = useState([]);
  const [BreakupOutstandingBorrowSeries, setBreakupOutstandingBorrowSeries] = useState([]);
  const [BreakupOutstandingBorrowLatestMonth, setBreakupOutstandingBorrowLatestMonth] = useState([]);
  
  
  
  const getBreakupOutstandingBorrow = async (Quatar = 0, endMonth = 0) => {
    await axios.get(`${BaseUrl}/api/auth/mm-breakup-borrowings-received-graph-record?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
    //  console.log("labels",response.data.data.labels);
      //console.log("series",response.data.data.series);
      setBreakupOutstandingBorrowLabels(response.data.data.labels);
      setBreakupOutstandingBorrowSeries(response.data.data.series);
      setBreakupOutstandingBorrowLatestMonth(response.data.show_date_source);
  
    }).catch((error) => {
      console.log('err', error)
    });
  }

const [BreakupBorrowLabels, setBreakupBorrowLabels] = useState([]);
const [BreakupBorrowSeries, setBreakupBorrowSeries] = useState([]);
const getBreakupBorrowOS = async (Quatar = 0, endMonth = 0) => {
  await axios.get(`${BaseUrl}/api/auth/mm-breakup-borrowings-source-graph-record?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
    setBreakupBorrowLabels(response.data.data.labels);
    setBreakupBorrowSeries(response.data.data.series);

  }).catch((error) => {
    console.log('err', error)
  });
}

const [FundingInstructionsLabels, setFundingInstructionsLabels] = useState([]);
const [FundingInstructionsSeries, setFundingInstructionsSeries] = useState([]);
const getFundingInstructions = async (Quatar = 0, endMonth = 0) => {
  await axios.get(`${BaseUrl}/api/auth/mm-funding-instruction-graph-record?Quatar=${Quatar}&toMonth=${endMonth}`, { headers: authHeaders() }).then((response) => {
    setFundingInstructionsLabels(response.data.data.labels);
    setFundingInstructionsSeries(response.data.data.series);

  }).catch((error) => {
    console.log('err', error)
  });
}

  const filterdateOutreachGraph = async () => {
    setGraphFilter({ ...graphFilter, ['isLoader']: true, ['isDisabled']: true });
   await getPortfolioOutreachGraphTabData(graphFilter.Quatar, graphFilter.toMonth);

   await GetDisbursementandHRTab(graphFilter.Quatar, graphFilter.toMonth);
   await PortfolioQualityGraphData(graphFilter.Quatar, graphFilter.toMonth);
   await getFinancialGraphData(graphFilter.Quatar, graphFilter.toMonth);

   await getBreakupOutstandingBorrow(graphFilter.Quatar, graphFilter.toMonth);

   await getBreakupBorrowOS(graphFilter.Quatar, graphFilter.toMonth);
   
   await getFundingInstructions(graphFilter.Quatar, graphFilter.toMonth);

    setGraphFilter({ ...graphFilter, ['isLoader']: false, ['isDisabled']: false });
  }

  useEffect(() => {
    getOverHightsRecords();
    getOverviewGraphData();
    GetDisbursementandHRTab();
   //getDisbursementGraphData();
    PortfolioQualityGraphData();
    getFinancialGraphData();
    getBreakupOutstandingBorrow();
    getBreakupBorrowOS();
    getFundingInstructions();
    getPortfolioOutreachGraphTabData();
    getQuatarList();
  }, []);

  console.log("Quatar List",Quatars)
  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="NBFC-MFI" secondTitle="MFIN-MEMBERS" secondUrl="/Mfinmembersmodule" second={true} icon={GrassIcon} />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange1} aria-label="Micrometer" centered textColor="secondary"
                    indicatorColor="secondary">
                    
                    { userRole[2]['subkey'][0]['subkey_name'] == 'Overview' &&  userRole[2]['subkey'][0]['subkey_checked'] == true? 
                    <Tab icon={<AnalyticsIcon />} label="Overview" value="1" />
                    : "" }

                    { userRole[2]['subkey'][1]['subkey_name'] == 'Portfolio and Outreach' &&  userRole[2]['subkey'][1]['subkey_checked'] == true? 
                    <Tab icon={<TableChartIcon />} label="Portfolio and Outreach" value="2" />
                    : "" }

                    { userRole[2]['subkey'][2]['subkey_name'] == 'Disbursement' &&  userRole[2]['subkey'][2]['subkey_checked'] == true? 
                    <Tab icon={<PaymentsIcon />} label="Disbursement" value="3" />
                    : "" }

                    { userRole[2]['subkey'][3]['subkey_name'] == 'Portfolio Quality' &&  userRole[2]['subkey'][3]['subkey_checked'] == true? 
                    <Tab icon={<MiscellaneousServicesIcon />} label="Portfolio Quality" value="4" />
                    : "" }

                    { userRole[2]['subkey'][4]['subkey_name'] == 'Financials' &&  userRole[2]['subkey'][4]['subkey_checked'] == true? 
                    <Tab icon={<AccountBalanceWalletIcon />} label="Financials" value="5" />
                    : "" }

                    { userRole[2]['subkey'][5]['subkey_name'] == 'HR (Overall HO & Branch level)' &&  userRole[2]['subkey'][5]['subkey_checked'] == true? 
                    <Tab icon={<Face2Icon />} label="HR (Overall HO & Branch level)" value="6" />
                    : "" }

                    {/* { userRole[2]['subkey'][6]['subkey_name'] == 'Comparison' &&  userRole[2]['subkey'][6]['subkey_checked'] == true? 
                    <Tab icon={<CompareIcon />} label="Comparison" value="8" />
                    : "" } */}
                    
                   {/*  <Tab icon={<TableChartIcon />} label="Portfolio and Outreach" value="2" />
                    <Tab icon={<PaymentsIcon />} label="Disbursement" value="3" />
                    <Tab icon={<MiscellaneousServicesIcon />} label="Portfolio Quality" value="4" />
                     <Tab icon={<AccountBalanceWalletIcon />} label="Financials" value="5" /> 
                    <Tab icon={<Face2Icon />} label="HR (Overall HO & Branch level)" value="6" /> */}
                    {/* <Tab icon={<DevicesOtherIcon />} label="Others" value="7" /> */}
                    {/* <Tab icon={<CompareIcon />} label="Comparison" value="8" /> */}
                  </TabList>
                </Box>

                {/* Overview Start from Here */}
                <TabPanel value="1">

                <Grid container spacing={2} mt={2}>
                    {/* Date Filter Component Start from here */}
                     {/* <Grid xs={12} sm={12} md={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} mt={2}>
                            <Grid xs={12} sm={12} md={5}>
                            <FormControl variant="standard" sx={{ m: 2, minWidth: '60rem' }}>
                          <InputLabel id="demo-simple-select-standard-label">Select Entities</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="entities"
                            defaultValue={selectedEntity}
                            onChange={(e) => handleEntity(e)}
                            label="Select Entities"
                           >
                            <MenuItem value={"All"} >All</MenuItem>
                            <MenuItem value={"Banks"}>Banks</MenuItem>
                            <MenuItem value={"NBFC-MFI"}>NBFC-MFI</MenuItem>
                            <MenuItem value={"NBFCs"}>NBFCs</MenuItem>
                            <MenuItem value={"SFBs"}>SFBs</MenuItem>
                            <MenuItem value={"Universe"}>Universe</MenuItem>
                          
                          </Select>
                        </FormControl>
                      </Grid>

                                <Grid xs={12} sm={12} md={2} style={{'margin-left':'30rem'}}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.Buttonbg}
                                        sx={{ mt: 3, mb: 2 }}
                                         onClick={getOverHightsRecords}
                                    >
                                        Filter
                                     </Button>
                                </Grid>


                            </Grid>
                        </CardContent>
                    </Card>
            </Grid> */}
                    {/* Date Filter Component End here */}
                  </Grid>

                  {/* Overview Start from Here */}
                  <Grid container spacing={2}>
                    {/* Highlights Start from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <Highlights overViewHighLights={overViewHighLights} />
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Highlights End from here */}
                    {/* Outreach Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <Outreach outreachSeries={outreachSeries} labels={labels} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              {/*  Click here to see details. */}
                              <Link className="App-link" to="/micrometer/1">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Outreach End from here */}


                    {/* Disbursement Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <Disbursement disbursementSeries={disbursementSeries} labels={Disbursedlabels} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micrometer/2">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Disbursement End from here */}

                    {/* PAR Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <ParAnalysis parAnalysisSeries={parAnalysisSeries} parLabels={parLabels} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micrometer/3">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* PAR End from here */}


                    {/* Funding Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <Funding fundingLabels={fundingLabels} fundingSeries={fundingSeries} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micrometer/5">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Funding End from here */}


                    {/* BranchNetwork Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <BranchNetwork branchLabels={branchLabels} branchSeries={branchSeries} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micrometer/6">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* BranchNetwork End from here */}

                    {/* Par Bucket Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <ParBucketAnalysis parBucketAnalysisSeries={parBucketAnalysisSeries} parLabels={parLabels} />
                            </Typography>
                            <Typography variant="body1" className={classes.download_text}>
                              <Link className="App-link" to="/micrometer/4">Click here to see details.</Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Par Bucket End from here */}

                  </Grid>



                  {/* Overview End from Here */}

                </TabPanel>
                {/* Overview End from Here */}

                {/* Portfolio and Outreach Start from Here */}
                <TabPanel value="2">
                  <Grid container spacing={2}>

                    {/* Date Filter Component Start from here */}
                    <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} mt={2}>
  
                <Grid xs={12} sm={12} md={7}>

                <FormControl variant="standard" sx={{ minWidth:"100%" }}>
<InputLabel id="demo-simple-select-standard-label">Choose quater</InputLabel>
<Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Qautar"
                        value={graphFilter.Quatar}
                        onChange={handleGraphToDateChange}
                        label="Qautar">
                         {
                          Quatars.map((q) => {
                            return (<MenuItem value={q.Month}>{q.Month}</MenuItem>)
                          })
                        } 
                      </Select>
</FormControl>
                </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 2, mb: 2 }}
                      disabled={graphFilter.isDisabled}
                      onClick={filterdateOutreachGraph}
                    >
                      Filter
                      <Loader loader={graphFilter.isLoader} size={15} />
                    </Button>
                  </Grid>

                  <Grid xs={12} sm={12} md={2}></Grid>  
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Date Filter Component End here */}

                    {/* Loan Portfolio from here : Outreach*/}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <LoanPortfolio pLoanPortfolioLabels={pLoanPortfolioLabels} pLoanPortfolioSeries={pLoanPortfolioSeries} />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* LoanPortfolio End from here */}

                    {/* TopMFIs from here  : Outreach */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <TopMFIs pTopTenMfiLabels={pTopTenMfiLabels} pTopTenMfiSerise={pTopTenMfiSerise} />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* TopMFIs End from here */}

                    {/* Top 10 state in terms of GLP (Rs Cr) from here  : Outreach*/}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <TopStateGLP
                                pqTopStateGLPSeries={pqTopStateGLPSeries}
                                pqTopStateGLPLabels={pqTopStateGLPLabels}
                              />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Top 10 state in terms of GLP (Rs Cr) End from here */}

                    {/* Outreach from here  : Outreach */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <PortfolioOutreach
                                pELOBThousandLables={pELOBThousandLables}
                                pELOBThousandSeries={pELOBThousandSeries} />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Outreach End from here */}

                    {/* AvgAccounts from here  : Outreach*/}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <AvgAccounts
                                pAverageLoanDisbursementLables={pAverageLoanDisbursementLables}
                                pAverageLoanDisbursementSeries={pAverageLoanDisbursementSeries}
                              />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* AvgAccounts End from here  : Outreach*/}


                    {/* Distribution of MFIs from here  : Outreach*/}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <DistributionMFI GetSeries={DistributionMFISizesSeries} Getlabels={DistributionMFISizesLabels}  GetDatelabels={DistributionMFISizesDateTitle} />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Distribution of MFIs End from here  : Outreach*/}


                  </Grid>

                </TabPanel>
                {/* Portfolio and Outreach End from Here */}

                {/* Disbursement Start from Here */}
                <TabPanel value="3">
                  <Grid container spacing={2}>

                                        {/* Date Filter Component Start from here */}
                                        <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} mt={2}> 
                <Grid xs={12} sm={12} md={7}>

                <FormControl variant="standard" sx={{ minWidth:"100%" }}>
<InputLabel id="demo-simple-select-standard-label">Choose quater</InputLabel>
<Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Qautar"
                        value={graphFilter.Quatar}
                        onChange={handleGraphToDateChange}
                        label="Qautar">
                         {
                          Quatars.map((q) => {
                            return (<MenuItem value={q.Month}>{q.period}</MenuItem>)
                          })
                        } 
                      </Select>
</FormControl>
                </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 2, mb: 2 }}
                      disabled={graphFilter.isDisabled}
                      onClick={filterdateOutreachGraph}
                    >
                      Filter
                      <Loader loader={graphFilter.isLoader} size={15} />
                    </Button>
                  </Grid>

                  <Grid xs={12} sm={12} md={2}></Grid>  
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Date Filter Component End here */}


                    {/* Entities wise from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <DisburEntitiesWise
                                dTopTenMfiLoanAmtLabels={dTopTenMfiLoanAmtLabels}
                                dTopTenMfiLoanAmtSeries={dTopTenMfiLoanAmtSeries} />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Entities wise End from here */}


                    

                    {/* State wise from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <DisburStateWise
                                disburseTopStateGLPSeries={disburseTopStateGLPSeries}
                                disburseTopStateGLPLabels={disburseTopStateGLPLabels}
                              />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* State wise End from here */} 
                    
                    {/* Outreach from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <DisbursementLoanAmount
                                pDisbursementLabels={pDisbursementLabels}
                                pDisbursementSeries={pDisbursementSeries} />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Outreach End from here */}

                    {/* MFI size-wise Disbursement (Rs Cr) from here */}
                      <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <DisbursementLoanMFIWiseAmount
                                pDisbursementMfiWiseLabels={pDisbursementMfiWiseLabels}
                                pDisbursementMfiWiseSeries={pDisbursementMfiWiseSeries}
                                ShowDate={ShowDate}
                                />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* MFI size-wise Disbursement (Rs Cr) End from here */}



                  </Grid>
                </TabPanel>
                {/* Disbursement End from Here */}

                {/* Portfolio Quality Start from Here */}
                <TabPanel value="4">

                  <Grid container spacing={2}>
                                        {/* Date Filter Component Start from here */}
                                        <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} mt={2}>
 
                <Grid xs={12} sm={12} md={7}>

                <FormControl variant="standard" sx={{ minWidth:"100%" }}>
<InputLabel id="demo-simple-select-standard-label">Choose quater</InputLabel>
<Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Qautar"
                        value={graphFilter.Quatar}
                        onChange={handleGraphToDateChange}
                        label="Qautar">
                         {
                          Quatars.map((q) => {
                            return (<MenuItem value={q.Month}>{q.Month}</MenuItem>)
                          })
                        } 
                      </Select>
</FormControl>
                </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 2, mb: 2 }}
                      disabled={graphFilter.isDisabled}
                      onClick={filterdateOutreachGraph}
                    >
                      Filter
                      <Loader loader={graphFilter.isLoader} size={15} />
                    </Button>
                  </Grid>

                  <Grid xs={12} sm={12} md={2}></Grid>  
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Date Filter Component End here */}

                    {/* Portfolio at risk from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <PortfolioRisk
                                pqPortfolioRiskLables={pqPortfolioRiskLables}
                                pqPortfolioRiskSeries={pqPortfolioRiskSeries}
                              />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Portfolio at risk End from here */}

                    {/* COF Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <COF
                                pqComparisonLables={pqComparisonLables}
                                pqComparisonSeries={pqComparisonSeries}
                              />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* COF End from here */}


                    {/* Top 10 state in terms of GLP (Rs Cr) from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography gutterBottom variant="h5" style={{ textAlign: "left" }} className={classes.headingTitle} component="div">
                              Portfolio at Risk for Top 15 States in Terms of AUM  {pqRiskTopFifteenStateTitle}
                            </Typography>
                            <div className="main" style={{ marginTop: "15px" }}>
                            <Table striped bordered hover>
                              <tr>
                              <th>States</th>
                              <th>PAR<Chip label=">30" style={{paddingLeft:"0px"}} /></th> 
                              <th>PAR<Chip label=">90" style={{paddingLeft:"0px"}} /></th> 
                              <th>PAR<Chip label=">180" style={{paddingLeft:"0px"}} /></th>       
                              </tr>
                              {

                              
                                                      pqRiskTopFifteenState.map((v, i) => {
                                                        return (
                                                          <tr>
                                                            <td>{v.states}</td>
                                                            <td>{v.PAR_30}</td>
                                                            <td>{v.PAR_90}</td>
                                                            <td>{v.PAR_180}</td>
                                                          </tr>
                                                        )
                                                        
                                                      })
                              }       
                              </Table>
                              {/* <DataTableExtensions
                                columns={PortfolioTopStatecolumns}
                                data={pqRiskTopFifteenState}
                                responsive
                                direction="auto"
                                print={false}
                                export={false}
                              >
                                <DataTable
                                  noHeader
                                  sortIcon={<SortIcon />}
                                  responsive
                                  direction="auto"
                                  pagination
                                  highlightOnHover
                                />
                              </DataTableExtensions> */}
                            </div>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Top 10 state in terms of GLP (Rs Cr) End from here */}

                  </Grid>

                </TabPanel>
                {/* Portfolio Quality End from Here */}

                {/* Financials Start from Here */}
                <TabPanel value="5">

                  <Grid container spacing={2}>
                                        {/* Date Filter Component Start from here */}
                                        <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} mt={2}> 
                <Grid xs={12} sm={12} md={7}>

                <FormControl variant="standard" sx={{ minWidth:"100%" }}>
<InputLabel id="demo-simple-select-standard-label">Choose quater</InputLabel>
<Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Qautar"
                        value={graphFilter.Quatar}
                        onChange={handleGraphToDateChange}
                        label="Qautar">
                         {
                          Quatars.map((q) => {
                            return (<MenuItem value={q.Month}>{q.Month}</MenuItem>)
                          })
                        } 
                      </Select>
</FormControl>
                </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 2, mb: 2 }}
                      disabled={graphFilter.isDisabled}
                      onClick={filterdateOutreachGraph}
                    >
                      Filter
                      <Loader loader={graphFilter.isLoader} size={15} />
                    </Button>
                  </Grid>

                  <Grid xs={12} sm={12} md={2}></Grid>  
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Date Filter Component End here */}


                    {/* EquityPositions Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <EquityPositions
                                fEquityPositionsLabels={fEquityPositionsLabels}
                                fEquityPositionsSeries={fEquityPositionsSeries}
                              />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* EquityPositions End from here */}



                    {/* Total assets and outstanding borrowings Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <AssetsOutstandingBorrow
                                fAssetsOutstandingLabels={fAssetsOutstandingLabels}
                                fAssetsOutstandingSeries={fAssetsOutstandingSeries}
                              />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Total assets and outstanding borrowings End from here */}


                    {/* Funding Instruments Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                            <FundingInstructions
                                FundingInstructionsLabels={FundingInstructionsLabels}
                                FundingInstructionsSeries={FundingInstructionsSeries}
                              />
                              
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Funding Instruments End from here */}


                    {/* Breakup of borrowings O/s by source (Rs Cr) Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                             <BreakupOutstandingRecieved
                                BreakupOutstandingBorrowLatestMonth={BreakupOutstandingBorrowLatestMonth}
                                BreakupOutstandingBorrowLabels={BreakupOutstandingBorrowLabels}
                                BreakupOutstandingBorrowSeries={BreakupOutstandingBorrowSeries}
                              /> 
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Breakup of borrowings O/s by source (Rs Cr) End from here */}

                    {/* Breakup of borrowings recieved by source (Rs Cr) Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                            <BreakBorrowingsSource
  BreakupBorrowLabels={BreakupBorrowLabels}
  BreakupBorrowSeries={BreakupBorrowSeries}
/>;
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Breakup of borrowings recieved by source (Rs Cr) End from here */}

                  </Grid>
                </TabPanel>
                {/* Financials End from Here */}

                {/* HR (Overall, HO & Branch level) Start from Here */}
                <TabPanel value="6">
                  <Grid container spacing={2}>
                                        {/* Date Filter Component Start from here */}
                                        <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} mt={2}>
 
                <Grid xs={12} sm={12} md={7}>

                <FormControl variant="standard" sx={{ minWidth:"100%" }}>
<InputLabel id="demo-simple-select-standard-label">Choose quater</InputLabel>
<Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Qautar"
                        value={graphFilter.Quatar}
                        onChange={handleGraphToDateChange}
                        label="Qautar">
                         {
                          Quatars.map((q) => {
                            return (<MenuItem value={q.Month}>{q.Month}</MenuItem>)
                          })
                        } 
                      </Select>
</FormControl>
                </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 2, mb: 2 }}
                      disabled={graphFilter.isDisabled}
                      onClick={filterdateOutreachGraph}
                    >
                      Filter
                      <Loader loader={graphFilter.isLoader} size={15} />
                    </Button>
                  </Grid>

                  <Grid xs={12} sm={12} md={2}></Grid>  
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Date Filter Component End here */}

                    {/* Staff Distribution Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <HRStaffDistribution
                                hrStaffDistributionSeries={hrStaffDistributionSeries}
                                hrStaffDistributionLabels={hrStaffDistributionLabels}
                                hrStaffDistributionLatestMonth={hrStaffDistributionLatestMonth}
                              />
                            </Typography>

                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Staff Distribution End from here */}

                    {/* Staff Distribution by MFI Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <HRStaffDistributionbyMFI hrMfiStaffDistributionSeries={hrMfiStaffDistributionSeries} />
                            </Typography>

                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Staff Distribution by MFI End from here */}

                    {/* Attrition Rate by Position Start from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <HRAttritionRateByPosition
                                hrAttritionRatePositionLabels={hrAttritionRatePositionLabels}
                                hrAttritionRatePositionSeries={hrAttritionRatePositionSeries}
                              />
                            </Typography>

                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Attrition Rate by Position End from here */}

                  </Grid>
                </TabPanel>
                {/* HR (Overall, HO & Branch level) End from Here */}

                {/* Others Start from Here */}
                <TabPanel value="7">

                  <Grid container spacing={2}>
                                        {/* Date Filter Component Start from here */}
                                        <Grid xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} mt={2}>
               
                <Grid xs={12} sm={12} md={7}>

                <FormControl variant="standard" sx={{ minWidth:"100%" }}>
<InputLabel id="demo-simple-select-standard-label">Choose quater</InputLabel>
<Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="Qautar"
                        value={graphFilter.Quatar}
                        onChange={handleGraphToDateChange}
                        label="Qautar">
                         {
                          Quatars.map((q) => {
                            return (<MenuItem value={q.Month}>{q.Month}</MenuItem>)
                          })
                        } 
                      </Select>
</FormControl>
                </Grid>
                  <Grid xs={12} sm={12} md={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 2, mb: 2 }}
                      disabled={graphFilter.isDisabled}
                      onClick={filterdateOutreachGraph}
                    >
                      Filter
                      <Loader loader={graphFilter.isLoader} size={15} />
                    </Button>
                  </Grid>

                  <Grid xs={12} sm={12} md={2}></Grid>  
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Date Filter Component End here */}

                    {/* Cost of funds %  Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <COFPricing />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Cost of funds %  End from here */}

                    {/* Assest to Liability + Equity Gap Analysis : ALMAnalysis Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <Card style={{ padding: "8px" }} >
                        <CardActionArea>
                          <CardContent>
                            <Typography>
                              <ALMAnalysis />
                            </Typography>
                            {/* <Typography variant="body1" className={classes.download_text}>
                              Click here to see details.
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                        </CardActions>
                      </Card>
                    </Grid>
                    {/* Assest to Liability + Equity Gap Analysis : ALMAnalysis End from here */}

                  </Grid>


                </TabPanel>
                {/* Others End from Here */}

  {/* Comprision Tab Start from Here */}
  {/* <TabPanel value="8">

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
</TabPanel> */}
{/* Comprision Tab End from Here */}

              </TabContext>

              <Typography style={{textAlign:"left", fontWeight:500}}>Source: Self-reported data from MFIN Member NBFC-MFIs (Data presented here will not match with Micrometer publication since the panel of MFIs differ between the publication and Datahub) </Typography>

            </Box>

          </Grid>


        </Grid>
      </Box>
    </>

  );
};

export default Micrometer;
