import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Breadcrumb from "../common/Breadcrumb";
import GrassIcon from "@mui/icons-material/Grass";
import MultiStep from "react-multistep";
import Overview from "./Overview/Overview";
import Equity from "./Equity/Equity";
import PortfolioBreakup from "./PortfolioBreakup/PortfolioBreakup";
import Rating from "./Rating/Rating";
import ProductPricing from "./ProductPricing/ProductPricing";
import PricingForQuarter from "./PricingForQuarter/PricingForQuarter";
import HR from "./HR/HR";
import ALM from "./ALM/ALM";
import FinancialRatio from "./FinancialRatio.js/FinancialRatio";
import Borrowing from "./Borrowing/Borrowing";
import Preview from "./Preview/Preview";
import {
  saveUserFormData,
  loadUserFormData,
  clearUserFormData,
  handleFileUpload,
} from "./utils/StorageHelper";
import formFields from "./data/FormFields";
import axios from "axios";
import { BaseUrl, storeLoanDetails } from "../url/url";

const DataDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState(() => {
    const storedData = loadUserFormData();
    return storedData && storedData.States ? storedData : formFields;
  });

  const [activeStep, setActiveStep] = useState(0);

  if (!localStorage.getItem("userFormData")) {
    saveUserFormData(formFields);
  }

  const handleFileSelection = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Load form data from local storage on mount
  useEffect(() => {
    const savedData = loadUserFormData();
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData);
    }
  }, []);

  // function for changing top level data in form
  const handleChange = (step, field, value) => {
    setFormData((prevData) => {
      let updatedData;

      if (prevData[step] !== undefined) {
        // If 'step' exists, update it as a nested object
        updatedData = {
          ...prevData,
          [step]: {
            ...prevData[step],
            [field]: value,
          },
        };
      } else {
        // If 'step' does not exist, update it as a top-level field
        updatedData = {
          ...prevData,
          [field]: value,
        };
      }

      // Check if the field being updated is part of the OnBalanceSheetPortfolio calculation
      if (
        field === "SPVPartOfPortfolio" ||
        field === "SecuritizedCreatedThroughSPV" ||
        field === "AssignedBilateralAgreement"
      ) {
        // Get the latest values, ensuring they are numbers
        const spvPart = parseFloat(updatedData.SPVPartOfPortfolio || 0);
        const securitized = parseFloat(
          updatedData.SecuritizedCreatedThroughSPV || 0
        );
        const assigned = parseFloat(
          updatedData.AssignedBilateralAgreement || 0
        );

        // Calculate sum
        const sum = spvPart + securitized + assigned;

        // Update the OnBalanceSheetPortfolio field
        updatedData.OnBalanceSheetManagedPortfolio = sum;

        updatedData.AUM =
          parseFloat(updatedData.AUM) +
          parseFloat(updatedData.OnBalanceSheetManagedPortfolio);

        updatedData.BalanceSheetFigures.GLP = updatedData.AUM;
      }

      // check if filed is OwnedLoanPortfolio
      if (field === "OwnedLoanPortfolio") {
        const sum =
          parseFloat(updatedData.OwnedLoanPortfolio) +
          parseFloat(updatedData.OnBalanceSheetManagedPortfolio || 0);

        updatedData.OnBalanceSheetPortfolio = sum;
      }

      if (
        field === "SPVPartOfPortfolioOffBS" ||
        field === "SecuritizedCreatedThroughSPVOffBS" ||
        field === "AssignedBilateralAgreementOffBS" ||
        field === "LoanPortfolioCreatedBC"
      ) {
        // Convert values to numbers for Off-Balance Sheet Portfolio calculation
        const spvPartOffBS = parseFloat(
          updatedData.SPVPartOfPortfolioOffBS || 0
        );
        const securitizedOffBS = parseFloat(
          updatedData.SecuritizedCreatedThroughSPVOffBS || 0
        );
        const assignedOffBS = parseFloat(
          updatedData.AssignedBilateralAgreementOffBS || 0
        );
        const loanPortfolioBC = parseFloat(
          updatedData.LoanPortfolioCreatedBC || 0
        );

        // Calculate sum for Off-Balance Sheet Managed Portfolio
        const offBalanceSheetSum =
          spvPartOffBS + securitizedOffBS + assignedOffBS + loanPortfolioBC;
        updatedData.OffBalanceSheetManagedPortfolio = offBalanceSheetSum;

        updatedData.AUM =
          parseFloat(updatedData.OnBalanceSheetPortfolio) +
          parseFloat(updatedData.OffBalanceSheetManagedPortfolio);

        updatedData.BalanceSheetFigures.GLP = updatedData.AUM;
      }

      // add the amount of share capital and reserves surplus in Balansheet figures in overview form
      if (
        (step === "BalanceSheetFigures" && field === "ShareCapital") ||
        (step === "BalanceSheetFigures" && field === "ReservesAndSurplus")
      ) {
        updatedData.BalanceSheetFigures.TotalEquity =
          parseFloat(updatedData.BalanceSheetFigures.ShareCapital || 0) +
          parseFloat(updatedData.BalanceSheetFigures.ReservesAndSurplus || 0);

        // updatedData.BalanceSheetFigures.TotalEquity =
        // parseFloat(updatedData.BalanceSheetFigures.TotalEquity) + sum;
      }

      // portfolio breakup form
      if (field === "AgricultureAndAlliedActivities") {
        updatedData.AgricultureAndAlliedActivitiesTotal =
          updatedData.AgricultureAndAlliedActivities;
      }

      if (field === "TradeAndServices" || field === "ManufacturingProduction") {
        updatedData.NonAgricultureTotal =
          parseFloat(updatedData.TradeAndServices || 0) +
          parseFloat(updatedData.ManufacturingProduction || 0);
      }

      if (
        field === "Education" ||
        field === "Medical" ||
        field === "HousingHomeImprovement" ||
        field === "OtherHouseholdFinance"
      ) {
        updatedData.HouseholdFinanceTotal =
          parseFloat(updatedData.Education || 0) +
          parseFloat(updatedData.Medical || 0) +
          parseFloat(updatedData.HousingHomeImprovement || 0) +
          parseFloat(updatedData.OtherHouseholdFinance || 0);

        // adding total
        updatedData.Total =
          parseFloat(updatedData.AgricultureAndAlliedActivitiesTotal || 0) +
          parseFloat(updatedData.NonAgricultureTotal || 0) +
          parseFloat(updatedData.HouseholdFinanceTotal || 0);
      }

      if (
        (step === "Location1" && field === "Rural") ||
        (step === "Location1" && field === "MetropolitanUrbanSemiUrban")
      ) {
        updatedData.Location =
          parseFloat(updatedData.Location1.Rural || 0) +
          parseFloat(updatedData.Location1.MetropolitanUrbanSemiUrban || 0);
      }
      saveUserFormData(updatedData);

      return updatedData;
    });
  };

  // function to change SIDBI like array
  const handleArrayChange = (step, index, field, value) => {
    setFormData((prevData) => {
      let updatedData = { ...prevData };

      // Ensure 'step' is an array
      if (!updatedData[step]) {
        updatedData[step] = [];
      }

      // Ensure the specified index exists
      if (!updatedData[step][index]) {
        updatedData[step][index] = {};
      }

      // Update the specific field
      updatedData[step][index][field] = value;

      saveUserFormData(updatedData); // Persist data
      return updatedData;
    });
  };

  // function for changing nested data in form
  const handleNestedChange = (path, value) => {
    setFormData((prevData) => {
      const keys = path.split(".");
      const updatedData = { ...prevData };
      let current = updatedData;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        if (!isNaN(key)) {
          const index = parseInt(key, 10);
          if (!Array.isArray(current)) return prevData;
          if (!current[index]) current[index] = {};
          current = current[index];
        } else {
          if (!current[key]) current[key] = {};
          current = current[key];
        }
      }

      current[keys[keys.length - 1]] = value;

      // Check if the updated field is "DomesticPromoter" or "Others"
      if (
        path === "ShareholdersFunds.Domestic.DomesticPromoter" ||
        path === "ShareholdersFunds.Domestic.Others"
      ) {
        // Convert values to numbers for summation
        updatedData.ShareholdersFunds.Domestic.Total =
          parseFloat(
            updatedData.ShareholdersFunds.Domestic.DomesticPromoter || 0
          ) + parseFloat(updatedData.ShareholdersFunds.Domestic.Others || 0);

        updatedData.ShareholdersFunds.ShareOfEquity =
          parseFloat(updatedData.ShareholdersFunds.Foreign.Total || 0) +
          parseFloat(updatedData.ShareholdersFunds.Domestic.Total || 0);
      }

      // check if updated filed is ShareholdersFunds.Foreign.FDI or related to inside code
      if (
        path === "ShareholdersFunds.Foreign.FDI" ||
        path === "ShareholdersFunds.Foreign.FPI" ||
        path === "ShareholdersFunds.Foreign.FII" ||
        path === "ShareholdersFunds.Foreign.ForeignPromoter" ||
        path === "ShareholdersFunds.Foreign.Others"
      ) {
        updatedData.ShareholdersFunds.Foreign.Total =
          parseFloat(updatedData.ShareholdersFunds.Foreign.FDI || 0) +
          parseFloat(updatedData.ShareholdersFunds.Foreign.FPI || 0) +
          parseFloat(updatedData.ShareholdersFunds.Foreign.FII || 0) +
          parseFloat(
            updatedData.ShareholdersFunds.Foreign.ForeignPromoter || 0
          ) +
          parseFloat(updatedData.ShareholdersFunds.Foreign.Others || 0);

        updatedData.ShareholdersFunds.ShareOfEquity =
          parseFloat(updatedData.ShareholdersFunds.Foreign.Total || 0) +
          parseFloat(updatedData.ShareholdersFunds.Domestic.Total || 0);
      }

      // check if updated file path is FreshEquityReceived.Domestic.DomesticPromoter
      if (
        path === "FreshEquityReceived.Domestic.DomesticPromoter" ||
        path === "FreshEquityReceived.Domestic.Others"
      ) {
        updatedData.FreshEquityReceived.Domestic.Total =
          parseFloat(
            updatedData.FreshEquityReceived.Domestic.DomesticPromoter || 0
          ) + parseFloat(updatedData.FreshEquityReceived.Domestic.Others || 0);

        updatedData.FreshEquityReceived.Total =
          parseFloat(updatedData.FreshEquityReceived.Foreign.Total || 0) +
          parseFloat(updatedData.FreshEquityReceived.Domestic.Total || 0);
      }

      if (
        path === "FreshEquityReceived.Foreign.FDI" ||
        path === "FreshEquityReceived.Foreign.FPI" ||
        path === "FreshEquityReceived.Foreign.FII" ||
        path === "FreshEquityReceived.Foreign.ForeignPromoter" ||
        path === "FreshEquityReceived.Foreign.Others"
      ) {
        updatedData.FreshEquityReceived.Foreign.Total =
          parseFloat(updatedData.FreshEquityReceived.Foreign.FDI || 0) +
          parseFloat(updatedData.FreshEquityReceived.Foreign.FPI || 0) +
          parseFloat(updatedData.FreshEquityReceived.Foreign.FII || 0) +
          parseFloat(
            updatedData.FreshEquityReceived.Foreign.ForeignPromoter || 0
          ) +
          parseFloat(updatedData.FreshEquityReceived.Foreign.Others || 0);

        updatedData.FreshEquityReceived.Total =
          parseFloat(updatedData.FreshEquityReceived.Foreign.Total || 0) +
          parseFloat(updatedData.FreshEquityReceived.Domestic.Total || 0);
      }

      saveUserFormData(updatedData);
      return updatedData;
    });
  };

  // function for overview form for changing states data
  const handleStateDataChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedStates = prevData.States ? [...prevData.States] : [];

      // Ensure the state object exists at the given index
      if (!updatedStates[index]) {
        updatedStates[index] = {};
      }

      updatedStates[index] = {
        ...updatedStates[index],
        [field]: value, // Update only the selected field
      };

      const updatedData = { ...prevData, States: updatedStates };

      // Save to local storage (optional)
      saveUserFormData(updatedData);

      console.log("Updated States:", updatedData.States); // Debugging log
      return updatedData;
    });
  };

  // function for equity form
  const handleRowCountChange = (e, key) => {
    const newCount = Number(e.target.value);

    setFormData((prevData) => {
      const updatedProviders = [...(prevData[key] || [])];

      // Ensure array has the correct length
      while (updatedProviders.length < newCount) {
        updatedProviders.push({ Name: "", Type: "", AmountReported: "" });
      }
      while (updatedProviders.length > newCount) {
        updatedProviders.pop();
      }

      const updatedData = {
        ...prevData,
        [key]: updatedProviders, // Dynamically update the key
      };
      saveUserFormData(updatedData); // Store data in localStorage
      return updatedData;
    });
  };
  // function for equity form
  const handleInputChange = (index, field, value, key) => {
    setFormData((prevData) => {
      const updatedProviders =
        prevData[key].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ) || [];

      const updatedData = {
        ...prevData,
        [key]: updatedProviders, // Dynamically update the key
      };
      saveUserFormData(updatedData); // Store data in localStorage
      return updatedData;
    });
  };

  // function for Rating form
  const handleRowCountChangeRating = (
    e,
    fieldName,
    setRowCount,
    defaultRowStructure
  ) => {
    const newCount = Number(e.target.value);
    setRowCount(newCount);

    setFormData((prevData) => {
      const updatedRows = [...(prevData[fieldName] || [])];

      // Ensure array has the correct length
      while (updatedRows.length < newCount) {
        updatedRows.push({ ...defaultRowStructure });
      }
      while (updatedRows.length > newCount) {
        updatedRows.pop();
      }

      const updatedData = { ...prevData, [fieldName]: updatedRows };
      saveUserFormData(updatedData); // Store data in localStorage
      return updatedData;
    });
  };

  // function for Rating form
  const handleInputChangeRating = (index, field, value, fieldName) => {
    setFormData((prevData) => {
      const updatedRows = prevData[fieldName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );

      const updatedData = { ...prevData, [fieldName]: updatedRows };
      saveUserFormData(updatedData); // Store data in localStorage
      return updatedData;
    });
  };

  const handleMicroFinanceRowChange = (e, fieldName, defaultRowStructure) => {
    const newCount = Number(e.target.value);

    setFormData((prevData) => {
      const updatedRows = [...(prevData[fieldName] || [])];

      // Ensure array has the correct length
      while (updatedRows.length < newCount) {
        updatedRows.push({ ...defaultRowStructure });
      }
      while (updatedRows.length > newCount) {
        updatedRows.pop();
      }

      return { ...prevData, [fieldName]: updatedRows };
    });
  };

  const handleRepeaterChange = (fieldName, index, key, value) => {
    setFormData((prevData) => {
      const updatedList = prevData[fieldName].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      );

      const updatedData = { ...prevData, [fieldName]: updatedList };
      saveUserFormData(updatedData); // Store updated data in localStorage
      return updatedData;
    });
  };

  // function triggering on clicking next button
  const handleNext = () => {
    // Save form data to local storage before moving to the next step
    console.log("trig next");
    saveUserFormData(formData);
    setActiveStep((prevStep) => prevStep + 1);
    console.log("localnext", loadUserFormData());
  };

  // function triggering on clicking previous button
  const handlePrev = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleReset = () => {
    clearUserFormData();
    alert("data cleared successfully.");
    window.location.reload();
  };

  // function for final submit
  const handleSubmit = async () => {
    try {
      const data = loadUserFormData();
      console.log("fm_data_b", data);
      // const response = await axios.post(`${BaseUrl}/${storeLoanDetails}`, {
      //   data, // Ensuring "data" is sent as expected
      //   lastDateOfQuarter: "2024-12-31", // Example, adjust as needed
      // });
      // console.log("loan_success", response);
    } catch (err) {
      // console.log("loan_failed", err);
      // alert(err);
    } finally {
      clearUserFormData();
    }
  };

  const steps = [
    {
      title: "Overview",
      component: (
        <Overview
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleStateDataChange={handleStateDataChange}
        />
      ),
    },
    {
      title: "Equity",
      component: (
        <Equity
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleRowCountChange={handleRowCountChange}
          handleInputChange={handleInputChange}
        />
      ),
    },
    {
      title: "Portfolio Breakup",
      component: (
        <PortfolioBreakup
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
        />
      ),
    },
    {
      title: "Rating",
      component: (
        <Rating
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleRowCountChangeRating={handleRowCountChangeRating}
          handleInputChangeRating={handleInputChangeRating}
        />
      ),
    },
    {
      title: "Product Pricing",
      component: (
        <ProductPricing
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleRepeaterChange={handleRepeaterChange}
          handleMicroFinanceRowChange={handleMicroFinanceRowChange}
        />
      ),
    },
    {
      title: "Pricing For Quarter",
      component: (
        <PricingForQuarter
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleRepeaterChange={handleRepeaterChange}
          handleMicroFinanceRowChange={handleMicroFinanceRowChange}
        />
      ),
    },
    {
      title: "HR",
      component: (
        <HR
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
        />
      ),
    },
    {
      title: "ALM",
      component: (
        <ALM
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
        />
      ),
    },
    {
      title: "Borrowing",
      component: (
        <Borrowing
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleArrayChange={handleArrayChange}
        />
      ),
    },
    {
      title: "Financial Ratio",
      component: (
        <FinancialRatio
          formData={formData}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
        />
      ),
    },
    // {
    //   title: "Preview",
    //   component: (
    //     <Preview
    //       formData={formData}
    //       setActiveStep={setActiveStep}
    //       handleSubmit={handleSubmit}
    //     />
    //   ),
    // },
  ];

  return (
    <Box sx={{ flexGrow: 1, width: "100vw", overflowX: "auto" }} mt={10}>
      <Breadcrumb title="Data Reports" icon={GrassIcon} />

      <div style={{ textAlign: "left", marginTop: "2rem" }}>
        <p>
          <b>Choose Excel</b>
        </p>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileSelection}
        />
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handleFileUpload(selectedFile, setFormData)}
        >
          Upload & Fill Form
        </button>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleReset()}
          style={{ marginLeft: "3rem" }}
        >
          Reset
        </button>

        <a href="/excel_format/template.xlsx" download="user_form_template.xlsx" style={{ marginLeft: "3rem" }}>
          <button className="btn btn-sm btn-secondary">Download Excel Template</button>
        </a>
      </div>

      <MultiStep
        activeStep={activeStep}
        // showNavigation={true}
        showNavigation={activeStep !== steps.length - 1}
        steps={steps}
        prevButton={
          activeStep !== steps.length - 1
            ? {
              title: "Previous",
              style: {
                background: "red",
                color: "white",
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "5px",
                float: "left"
              },
              onClick: handlePrev,
            }
            : null
        }
        nextButton={
          activeStep !== steps.length - 1
            ? {
              title: "Next",
              style: {
                background: "green",
                color: "white",
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "5px",
                marginRight: "16rem",
                float: "right"
              },
              onClick: () => {
                console.log("click");
                handleNext();
              },
            }
            : null
        }
      />
    </Box>
  );
};

export default DataDashboard;

// import { Box, Grid } from "@mui/material";
// import Breadcrumb from "../common/Breadcrumb";
// import GrassIcon from "@mui/icons-material/Grass";
// import AnalyticsIcon from "@mui/icons-material/Analytics";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import React, { useState } from "react";
// import Overview from "./Overview/Overview";
// import Equity from "./Equity/Equity";
// import PortfolioBreakup from "./PortfolioBreakup/PortfolioBreakup";
// import Rating from "./Rating/Rating";
// import ProductPricing from "./ProductPricing/ProductPricing";
// import PricingForQuarter from "./PricingForQuarter/PricingForQuarter";
// import HR from "./HR/HR";
// import ALM from "./ALM/ALM";
// import FinancialRatio from "./FinancialRatio.js/FinancialRatio";
// import Borrowing from "./Borrowing/Borrowing";

// const DataMaster = () => {
//   const [tabValue, setTabValue] = useState("10");

//   const handeChangeTabValue = (event, value) => {
//     setTabValue(value);
//   };
//   return (
//     <Box sx={{ flexGrow: 1 }} mt={10}>
//       <Breadcrumb title="Data Dashboard" icon={GrassIcon} />
//       <Grid container spacing={2} mt={2}>
//         <Grid xs={12} sm={12} md={12}>
//           <Box sx={{ width: "100%", typography: "body1" }}>
//             <TabContext value={tabValue}>
//               <Box
//                 sx={{
//                   borderColor: "divider",
//                   width: "100%",
//                   overflowX: "auto",
//                 }}
//               >
//                 <TabList
//                   onChange={handeChangeTabValue}
//                   aria-label="DataDashboard"
//                   centered
//                   textColor="secondary"
//                   indicatorColor="secondary"
//                   variant="scrollable"
//                   scrollButtons="auto"
//                 >
//                   <Tab icon={<AnalyticsIcon />} label="Overview" value="1" />
//                   <Tab icon={<AnalyticsIcon />} label="Equity" value="2" />
//                   <Tab
//                     icon={<AnalyticsIcon />}
//                     label="Portfolio Breakup"
//                     value="3"
//                   />
//                   <Tab icon={<AnalyticsIcon />} label="Rating" value="4" />
//                   <Tab
//                     icon={<AnalyticsIcon />}
//                     label="Product Pricing"
//                     value="5"
//                   />
//                   <Tab
//                     icon={<AnalyticsIcon />}
//                     label="Pricing for Quarter"
//                     value="6"
//                   />
//                   {/* <Tab icon={<AnalyticsIcon />} label="Pricing New" value="7" /> */}
//                   <Tab icon={<AnalyticsIcon />} label="HR" value="7" />
//                   <Tab icon={<AnalyticsIcon />} label="ALM" value="8" />
//                   <Tab icon={<AnalyticsIcon />} label="Borrowing" value="9" />
//                   <Tab
//                     icon={<AnalyticsIcon />}
//                     label="Financial Ratios"
//                     value="10"
//                   />
//                 </TabList>
//               </Box>
//               <TabPanel value="1">
//                 <Overview />
//               </TabPanel>
//               <TabPanel value="2">
//                 <Equity />
//               </TabPanel>
//               <TabPanel value="3">
//                 <PortfolioBreakup />
//               </TabPanel>
//               <TabPanel value="4">
//                 <Rating />
//               </TabPanel>
//               <TabPanel value="5">
//                 <ProductPricing />
//               </TabPanel>
//               <TabPanel value="6">
//                 <PricingForQuarter />
//               </TabPanel>
//               <TabPanel value="7">
//                 <HR />
//               </TabPanel>
//               <TabPanel value="8">
//                 <ALM />
//               </TabPanel>
//               <TabPanel value="9">
//                 <Borrowing />
//               </TabPanel>
//               <TabPanel value="10">
//                 <FinancialRatio />
//               </TabPanel>
//             </TabContext>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DataMaster;
