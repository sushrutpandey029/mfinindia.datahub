import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import "./ImportTables.css";
import TextField from '@mui/material/TextField';
import Breadcrumb from '../common/Breadcrumb'
import { useState, useRef } from "react";
import Loader from "../common/Loader"
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import {
  BaseUrl, importContactApi, importDRIStateApi,
  importDRIDistrictApi, importCbDistrict, importCbState,
  importMemberAssociateMaster, importMmStateMasterApi, importMmMasterDataApi, importSROEBDataApi,
  importSROCBDataApi, importSROQARDataApi, importSROCGRMDataApi, importALMDataApi, importRBIMasterDataApi, importMmMasterBorrowingsDataApi, importDRIMapDataApi
} from "../url/url";
// import {
//   BaseUrl, importContactApi, importDRIStateApi,
//   importDRIDistrictApi, importCbDistrict, importCbState,
//   importMemberAssociateMaster, importMudraBankWise, importMudraDistrictWise,
//   importRadarExternalInciterApi, importRadarNegativeAreaApi, importRadarRiskyAreaApi,
//   importRadarRingLeaderApi, importMmStateMasterApi, importMmMasterDataApi, importSROEBDataApi,
//   importSROCBDataApi, importSROQARDataApi, importSROCGRMDataApi, importALMDataApi, importRBIMasterDataApi, importMmMasterBorrowingsDataApi, importDRIMapDataApi
// } from "../url/url";
import { SuccessFailedMessage, SuccessToastMessage, ErrorToastMessage } from "../common/SuccessFailedMessage";
const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#058283 !important"
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

const ImportTables = () => {
  const classes = useStyle();
  /*
=====================================
  Micrometer Importing
=====================================
*/

  const refMicrometerMaster = useRef(null);
  const refMasterBorrowings = useRef(null);
  const refCbState = useRef(null);
  const refCbDistrict = useRef(null);
  const refDRIMapData = useRef(null);
  const refAssociateMaster = useRef(null);
  const refContactDetails = useRef(null);
  const refDRIState = useRef(null);
  const refDRIDistrict = useRef(null);
  // const refMudraDistrictkWise = useRef(null);
  // const refMudraBankWise = useRef(null);
  // const refRadarExternalInciter = useRef(null);
  // const refRadarNegativeArea = useRef(null);
  // const refRadarRiskyArea = useRef(null);
  // const refRadarRingLeader = useRef(null);
  const refMmStateMaster = useRef(null);
  const refSROEB = useRef(null);
  const refSROEB1 = useRef(null);
  const refSROCB = useRef(null);
  const refSROQAR = useRef(null);
  const refSROCGRM = useRef(null);
  const refALM = useRef(null);
  const refRBIMaster = useRef(null);

  const micrometerMasterInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }
  const [micrometerMaster, setMicrometerMaster] = useState(micrometerMasterInitialState)
  const changeImportMicrometerMasterCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setMicrometerMaster({ ...micrometerMaster, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setMicrometerMaster({ ...micrometerMaster, ['csv_import']: null, ['isDisabled']: true });
    }
  }
  const btnImportMicrometerMaster = async () => {
    setMicrometerMaster({ ...micrometerMaster, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      micrometerMaster.csv_import,
      micrometerMaster.csv_import.name
    );
    const api = `${importMmMasterDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setMicrometerMaster(micrometerMasterInitialState);

      refMicrometerMaster.current.value = null;
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setMicrometerMaster(micrometerMasterInitialState);
      refMicrometerMaster.current.value = null;
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setMicrometerMaster(micrometerMasterInitialState);
        refMicrometerMaster.current.value = null;
      }
    }
  }

  /* CB State */
  const cbStateInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [cbState, setCbState] = useState(cbStateInitialState);
  const changeImportCbStateCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setCbState({ ...cbState, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setCbState({ ...cbState, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportCbState = async () => {
    setCbState({ ...cbState, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      cbState.csv_import,
      cbState.csv_import.name
    );
    const api = `${importCbState}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setCbState(cbStateInitialState);
      refCbState.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setCbState(cbStateInitialState);
      refCbState.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setCbState(cbStateInitialState);
        refCbState.current.value = null
      }
    }
  }

  /* Master Borrowings State */
  const masterBorrowingsInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [masterBorrowings, setMasterBorrowings] = useState(masterBorrowingsInitialState);
  const changeImportMasterBorrowingsCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setMasterBorrowings({ ...masterBorrowings, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setMasterBorrowings({ ...masterBorrowings, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportMasterBorrowings = async () => {
    setMasterBorrowings({ ...masterBorrowings, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      masterBorrowings.csv_import,
      masterBorrowings.csv_import.name
    );
    const api = `${importMmMasterBorrowingsDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setMasterBorrowings(masterBorrowingsInitialState);
      refMasterBorrowings.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setMasterBorrowings(masterBorrowingsInitialState);
      refMasterBorrowings.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setMasterBorrowings(masterBorrowingsInitialState);
        refMasterBorrowings.current.value = null
      }
    }
  }

  /* CB District  */
  const cbDistrictInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [cbDistrict, setCbDistrict] = useState(cbDistrictInitialState);
  const changeImportCbDistrictCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setCbDistrict({ ...cbDistrict, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setCbDistrict({ ...cbDistrict, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportCbDistrict = async () => {
    setCbDistrict({ ...cbDistrict, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      cbDistrict.csv_import,
      cbDistrict.csv_import.name
    );
    const api = `${importCbDistrict}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setCbDistrict(cbDistrictInitialState);
      refCbDistrict.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setCbDistrict(cbDistrictInitialState);
      refCbDistrict.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setCbDistrict(cbDistrictInitialState);
        refCbDistrict.current.value = null
      }
    }
  }

  /* Member Associate Master  */
  const associateMasterInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [associateMaster, setAssociateMaster] = useState(associateMasterInitialState);
  const changeImportAssociateMasterCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setAssociateMaster({ ...associateMaster, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setAssociateMaster({ ...associateMaster, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportAssociateMaster = async () => {
    setAssociateMaster({ ...associateMaster, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      associateMaster.csv_import,
      associateMaster.csv_import.name
    );
    const api = `${importMemberAssociateMaster}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setAssociateMaster(associateMasterInitialState);
      refAssociateMaster.current.value = null;
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setAssociateMaster(associateMasterInitialState);
      refAssociateMaster.current.value = null;
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setAssociateMaster(associateMasterInitialState);
        refAssociateMaster.current.value = null;
      }
    }
  }

  /* DRI State Import  */
  const DRIStateInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [DRIState, setDRIState] = useState(DRIStateInitialState);
  const changeImportDRIStateCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setDRIState({ ...DRIState, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setDRIState({ ...DRIState, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportDRIState = async () => {
    setDRIState({ ...DRIState, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      DRIState.csv_import,
      DRIState.csv_import.name
    );
    const api = `${importDRIStateApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setDRIState(DRIStateInitialState);
      refDRIState.current.value = null;
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setDRIState(DRIStateInitialState);
      refDRIState.current.value = null;
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setDRIState(DRIStateInitialState);
        refDRIState.current.value = null;
      }
    }
  }


  /* DRI State Import  */
  const DRIDistrictInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [DRIDistrict, setDRIDistrict] = useState(DRIDistrictInitialState);
  const changeImportDRIDistrictCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setDRIDistrict({ ...DRIDistrict, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setDRIDistrict({ ...DRIDistrict, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportDRIDistrict = async () => {
    setDRIDistrict({ ...DRIDistrict, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      DRIDistrict.csv_import,
      DRIDistrict.csv_import.name
    );
    const api = `${importDRIDistrictApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setDRIDistrict(DRIDistrictInitialState);
      refDRIDistrict.current.value = null;
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setDRIDistrict(DRIDistrictInitialState);
      refDRIDistrict.current.value = null;
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setDRIDistrict(DRIDistrictInitialState);
        refDRIDistrict.current.value = null;
      }
    }
  }

  /* DRI Map Data Import  */

  const DRIMapDataInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [DRIMapData, setDRIMapData] = useState(DRIMapDataInitialState);

  const changeImportDRIMapDataCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setDRIMapData({
        ...DRIMapData,
        ["csv_import"]: event.target.files[0],
        ["isDisabled"]: false
      })
    } else {
      setDRIMapData({
        ...DRIMapData,
        ["csv_import"]: null,
        ["isDisabled"]: true
      })
    }
  }

  const btnImportDRIMapData = async () => {
    setDRIMapData({
      ...DRIMapData,
      ["isDisabled"]: true,
      ["isLoader"]: true
    });
    const formData = new FormData();
    formData.append(
      "csv_import",
      DRIMapData.csv_import,
      DRIMapData.csv_import.name
    );
    const api = `${importDRIMapDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "Success1");
      setDRIMapData(DRIMapDataInitialState);
      refDRIMapData.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed")
      setDRIMapData(DRIMapDataInitialState)
      refDRIMapData.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failed")
        setDRIMapData(DRIMapDataInitialState);
        refDRIMapData.current.value = null
      }
    }
  }

  /* Contact Details  */
  const contactDetailsInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [contactDetails, setContactDetails] = useState(contactDetailsInitialState);
  const changeImportContactDetailsCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setContactDetails({ ...contactDetails, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setContactDetails({ ...contactDetails, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportContactDetails = async () => {
    setContactDetails({ ...contactDetails, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      contactDetails.csv_import,
      contactDetails.csv_import.name
    );
    const api = `${importContactApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setContactDetails(contactDetailsInitialState);
      refContactDetails.current.value = null;
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setContactDetails(contactDetailsInitialState);
      refContactDetails.current.value = null;
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setContactDetails(contactDetailsInitialState);
        refContactDetails.current.value = null;
      }
    }
  }

  /* Mudra District Wise  */
  // const mudraDistrictkWiseInitialState = {
  //   isLoader: false,
  //   isDisabled: true,
  //   csv_import: null
  // }

  // const [mudraDistrictkWise, setMudraDistrictkWise] = useState(mudraDistrictkWiseInitialState);
  // const changeImportMudraDistrictWiseCsv = (event) => {
  //   if (event.target.files[0] && event.target.files[0] !== undefined) {
  //     setMudraDistrictkWise({ ...mudraDistrictkWise, ['csv_import']: event.target.files[0], ['isDisabled']: false });
  //   } else {
  //     setMudraDistrictkWise({ ...mudraDistrictkWise, ['csv_import']: null, ['isDisabled']: true });
  //   }
  // }

  // const btnImportMudraDistrictkWise = async () => {
  //   setMudraDistrictkWise({ ...mudraDistrictkWise, ['isDisabled']: true, ['isLoader']: true });
  //   const formData = new FormData();
  //   formData.append(
  //     "csv_import",
  //     mudraDistrictkWise.csv_import,
  //     mudraDistrictkWise.csv_import.name
  //   );
  //   const api = `${importMudraDistrictWise}`;
  //   const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
  //     return response;
  //   }).catch((error) => {
  //     return error.response;
  //   });
  //   if (res.status === 200) {
  //     SuccessToastMessage(res.data.message, "success1");
  //     setMudraDistrictkWise(mudraDistrictkWiseInitialState);
  //     refMudraDistrictkWise.current.value = null
  //   } else if (res.status === 401) {
  //     ErrorToastMessage(res.data.error.csv_import[0], "failed");
  //     setMudraDistrictkWise(mudraDistrictkWiseInitialState);
  //     refMudraDistrictkWise.current.value = null
  //   } else {
  //     if (res.data.message !== undefined) {
  //       ErrorToastMessage(res.data.message, "failedasdasda");
  //       setMudraDistrictkWise(mudraDistrictkWiseInitialState);
  //       refMudraDistrictkWise.current.value = null
  //     }
  //   }
  // }

  /* Mudra Bank Wise  */
  // const mudraBankWiseInitialState = {
  //   isLoader: false,
  //   isDisabled: true,
  //   csv_import: null
  // }

  // const [mudraBankWise, setMudraBankWise] = useState(mudraBankWiseInitialState);
  // const changeImportMudraBankWiseCsv = (event) => {
  //   if (event.target.files[0] && event.target.files[0] !== undefined) {
  //     setMudraBankWise({ ...mudraBankWise, ['csv_import']: event.target.files[0], ['isDisabled']: false });
  //   } else {
  //     setMudraBankWise({ ...mudraBankWise, ['csv_import']: null, ['isDisabled']: true });
  //   }
  // }

  // const btnImportMudraBankWise = async () => {
  //   setMudraBankWise({ ...mudraBankWise, ['isDisabled']: true, ['isLoader']: true });
  //   const formData = new FormData();
  //   formData.append(
  //     "csv_import",
  //     mudraBankWise.csv_import,
  //     mudraBankWise.csv_import.name
  //   );
  //   const api = `${importMudraBankWise}`;
  //   const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
  //     return response;
  //   }).catch((error) => {
  //     return error.response;
  //   });
  //   if (res.status === 200) {
  //     SuccessToastMessage(res.data.message, "success1");
  //     setMudraBankWise(mudraBankWiseInitialState);
  //     refMudraBankWise.current.value = null;
  //   } else if (res.status === 401) {
  //     ErrorToastMessage(res.data.error.csv_import[0], "failed");
  //     setMudraBankWise(mudraBankWiseInitialState);
  //     refMudraBankWise.current.value = null;
  //   } else {
  //     if (res.data.message !== undefined) {
  //       ErrorToastMessage(res.data.message, "failedasdasda");
  //       setMudraBankWise(mudraBankWiseInitialState);
  //       refMudraBankWise.current.value = null;
  //     }
  //   }
  // }

  /* Radar External Inciter  */
  // const radarExternalInciterInitialState = {
  //   isLoader: false,
  //   isDisabled: true,
  //   csv_import: null
  // }

  // const [radarExternalInciter, setRadarExternalInciter] = useState(radarExternalInciterInitialState);
  // const changeImportRadarExternalInciterCsv = (event) => {
  //   if (event.target.files[0] && event.target.files[0] !== undefined) {
  //     setRadarExternalInciter({ ...radarExternalInciter, ['csv_import']: event.target.files[0], ['isDisabled']: false });
  //   } else {
  //     setRadarExternalInciter({ ...radarExternalInciter, ['csv_import']: null, ['isDisabled']: true });
  //   }
  // }

  // const btnImportRadarExternalInciter = async () => {
  //   setRadarExternalInciter({ ...radarExternalInciter, ['isDisabled']: true, ['isLoader']: true });
  //   const formData = new FormData();
  //   formData.append(
  //     "csv_import",
  //     radarExternalInciter.csv_import,
  //     radarExternalInciter.csv_import.name
  //   );
  //   const api = `${importRadarExternalInciterApi}`;
  //   const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
  //     return response;
  //   }).catch((error) => {
  //     return error.response;
  //   });
  //   if (res.status === 200) {
  //     SuccessToastMessage(res.data.message, "success1");
  //     setRadarExternalInciter(radarExternalInciterInitialState);
  //     refRadarExternalInciter.current.value = null;
  //   } else if (res.status === 401) {
  //     ErrorToastMessage(res.data.error.csv_import[0], "failed");
  //     setRadarExternalInciter(radarExternalInciterInitialState);
  //     refRadarExternalInciter.current.value = null;
  //   } else {
  //     if (res.data.message !== undefined) {
  //       ErrorToastMessage(res.data.message, "failedasdasda");
  //       setRadarExternalInciter(radarExternalInciterInitialState);
  //       refRadarExternalInciter.current.value = null;
  //     }
  //   }
  // }

  /* Radar  Negative Area  */
  // const radarNegativeAreaInitialState = {
  //   isLoader: false,
  //   isDisabled: true,
  //   csv_import: null
  // }

  // const [radarNegativeArea, setRadarNegativeArea] = useState(radarNegativeAreaInitialState);
  // const changeImportRadarNegativeAreaCsv = (event) => {
  //   if (event.target.files[0] && event.target.files[0] !== undefined) {
  //     setRadarNegativeArea({ ...radarNegativeArea, ['csv_import']: event.target.files[0], ['isDisabled']: false });
  //   } else {
  //     setRadarNegativeArea({ ...radarNegativeArea, ['csv_import']: null, ['isDisabled']: true });
  //   }
  // }

  // const btnImportRadarNegativeArea = async () => {
  //   setRadarNegativeArea({ ...radarNegativeArea, ['isDisabled']: true, ['isLoader']: true });
  //   const formData = new FormData();
  //   formData.append(
  //     "csv_import",
  //     radarNegativeArea.csv_import,
  //     radarNegativeArea.csv_import.name
  //   );
  //   const api = `${importRadarNegativeAreaApi}`;
  //   const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
  //     return response;
  //   }).catch((error) => {
  //     return error.response;
  //   });
  //   if (res.status === 200) {
  //     SuccessToastMessage(res.data.message, "success1");
  //     setRadarNegativeArea(radarNegativeAreaInitialState);
  //     refRadarNegativeArea.current.value = null;
  //   } else if (res.status === 401) {
  //     ErrorToastMessage(res.data.error.csv_import[0], "failed");
  //     setRadarNegativeArea(radarNegativeAreaInitialState);
  //     refRadarNegativeArea.current.value = null;
  //   } else {
  //     if (res.data.message !== undefined) {
  //       ErrorToastMessage(res.data.message, "failedasdasda");
  //       setRadarNegativeArea(radarNegativeAreaInitialState);
  //       refRadarNegativeArea.current.value = null;
  //     }
  //   }
  // }

  /* Radar  Risky Area  */
  // const radarRiskyAreaInitialState = {
  //   isLoader: false,
  //   isDisabled: true,
  //   csv_import: null
  // }

  // const [radarRiskyArea, setRadarRiskyArea] = useState(radarRiskyAreaInitialState);
  // const changeImportRadarRiskyAreaCsv = (event) => {
  //   if (event.target.files[0] && event.target.files[0] !== undefined) {
  //     setRadarRiskyArea({ ...radarRiskyArea, ['csv_import']: event.target.files[0], ['isDisabled']: false });
  //   } else {
  //     setRadarRiskyArea({ ...radarRiskyArea, ['csv_import']: null, ['isDisabled']: true });
  //   }
  // }

  // const btnImportRadarRiskyArea = async () => {
  //   setRadarRiskyArea({ ...radarRiskyArea, ['isDisabled']: true, ['isLoader']: true });
  //   const formData = new FormData();
  //   formData.append(
  //     "csv_import",
  //     radarRiskyArea.csv_import,
  //     radarRiskyArea.csv_import.name
  //   );
  //   const api = `${importRadarRiskyAreaApi}`;
  //   const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
  //     return response;
  //   }).catch((error) => {
  //     return error.response;
  //   });
  //   if (res.status === 200) {
  //     SuccessToastMessage(res.data.message, "success1");
  //     setRadarRiskyArea(radarRiskyAreaInitialState);
  //     refRadarRiskyArea.current.value = null;
  //   } else if (res.status === 401) {
  //     ErrorToastMessage(res.data.error.csv_import[0], "failed");
  //     setRadarRiskyArea(radarRiskyAreaInitialState);
  //     refRadarRiskyArea.current.value = null;
  //   } else {
  //     if (res.data.message !== undefined) {
  //       ErrorToastMessage(res.data.message, "failedasdasda");
  //       setRadarRiskyArea(radarRiskyAreaInitialState);
  //       refRadarRiskyArea.current.value = null;
  //     }
  //   }
  // }

  /* Radar  Rink Leader  */
  // const radarRingLeaderInitialState = {
  //   isLoader: false,
  //   isDisabled: true,
  //   csv_import: null
  // }

  // const [radarRingLeader, setRadarRingLeader] = useState(radarRingLeaderInitialState);
  // const changeImportRadarRingLeaderCsv = (event) => {
  //   if (event.target.files[0] && event.target.files[0] !== undefined) {
  //     setRadarRingLeader({ ...radarRingLeader, ['csv_import']: event.target.files[0], ['isDisabled']: false });
  //   } else {
  //     setRadarRingLeader({ ...radarRingLeader, ['csv_import']: null, ['isDisabled']: true });
  //   }
  // }

  //  const btnImportRadarRingLeader = async () => {
  //   setRadarRingLeader({ ...radarRingLeader, ['isLoader']: true, ['isDisabled']: true });
  //   const formData = new FormData();
  //   formData.append(
  //     "csv_import",
  //     radarRingLeader.csv_import,
  //     radarRingLeader.csv_import.name
  //   );
  //   const api = `${importRadarRingLeaderApi}`;
  //   const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
  //     return response;
  //   }).catch((error) => {
  //     return error.response;
  //   });
  //   if (res.status === 200) {
  //     SuccessToastMessage(res.data.message, "success1");
  //     setRadarRingLeader(radarRingLeaderInitialState);
  //     refRadarRingLeader.current.value = null;
  //   } else if (res.status === 401) {
  //     ErrorToastMessage(res.data.error.csv_import[0], "failed");
  //     setRadarRingLeader(radarRingLeaderInitialState);
  //     refRadarRingLeader.current.value = null;
  //   } else {
  //     if (res.data.message !== undefined) {
  //       ErrorToastMessage(res.data.message, "failedasdasda");
  //       setRadarRingLeader(radarRingLeaderInitialState);
  //       refRadarRingLeader.current.value = null;
  //     }
  //   }
  // }

  /* Micrometer state master */
  const mmStateMasterInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [mmStateMaster, setmmStateMaster] = useState(mmStateMasterInitialState);
  const changeImportMmStateMasterCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setmmStateMaster({ ...mmStateMaster, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setmmStateMaster({ ...mmStateMaster, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportMmStateMaster = async () => {
    setmmStateMaster({ ...mmStateMaster, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      mmStateMaster.csv_import,
      mmStateMaster.csv_import.name
    );
    const api = `${importMmStateMasterApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setmmStateMaster(mmStateMasterInitialState);
      refMmStateMaster.current.value = null;
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setmmStateMaster(mmStateMasterInitialState);
      refMmStateMaster.current.value = null;
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setmmStateMaster(mmStateMasterInitialState);
        refMmStateMaster.current.value = null;
      }
    }
  }

  /* SRO CGRM start from here */
  const SROCGRMInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [SROCGRM, setSROCGRM] = useState(SROCGRMInitialState);
  const changeImportSROCGRMCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setSROCGRM({ ...SROCGRM, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setSROCGRM({ ...SROCGRM, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportSROCGRM = async () => {
    setSROCGRM({ ...SROCGRM, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      SROCGRM.csv_import,
      SROCGRM.csv_import.name
    );
    const api = `${importSROCGRMDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setSROCGRM(SROCGRMInitialState);
      refSROCGRM.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setSROCGRM(SROCGRMInitialState);
      refSROCGRM.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setSROCGRM(SROCGRMInitialState);
        refSROCGRM.current.value = null
      }
    }
  }

  /* SRO CGRM end here */

  /* SRO QAR start from here */
  const SROQARInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [SROQAR, setSROQAR] = useState(SROQARInitialState);
  const changeImportSROQARCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setSROQAR({ ...SROQAR, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setSROQAR({ ...SROQAR, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportSROQAR = async () => {
    setSROQAR({ ...SROQAR, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      SROQAR.csv_import,
      SROQAR.csv_import.name
    );
    const api = `${importSROQARDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setSROQAR(SROQARInitialState);
      refSROQAR.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setSROQAR(SROQARInitialState);
      refSROQAR.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setSROQAR(SROQARInitialState);
        refSROQAR.current.value = null
      }
    }
  }

  /* SRO QAR end here */

  /* SRO CB start from here */
  const SROCBInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [SROCB, setSROCB] = useState(SROCBInitialState);
  const changeImportSROCBCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setSROCB({ ...SROCB, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setSROCB({ ...SROCB, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportSROCB = async () => {
    setSROCB({ ...SROCB, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      SROCB.csv_import,
      SROCB.csv_import.name
    );
    const api = `${importSROCBDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setSROCB(SROCBInitialState);
      refSROCB.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setSROCB(SROCBInitialState);
      refSROCB.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setSROCB(SROCBInitialState);
        refSROCB.current.value = null
      }
    }
  }

  /* SRO CB end here */

  /* SRO EB1 start from here */
  const SROEB1InitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [SROEB1, setSROEB1] = useState(SROEB1InitialState);
  const changeImportSROEB1Csv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setSROEB1({ ...SROEB1, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setSROEB1({ ...SROEB1, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportSROEB1 = async () => {
    setSROEB1({ ...SROEB, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      SROEB1.csv_import,
      SROEB1.csv_import.name
    );
    const api = `${importSROCBDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setSROEB(SROEB1InitialState);
      refSROEB1.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setSROEB(SROEB1InitialState);
      refSROEB1.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setSROEB1(SROEB1InitialState);
        refSROEB1.current.value = null
      }
    }
  }

  /* SRO EB1 end here */

  /* SRO EB start from here */
  const SROEBInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [SROEB, setSROEB] = useState(SROEBInitialState);
  const changeImportSROEBCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setSROEB({ ...SROEB, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setSROEB({ ...SROEB, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportSROEB = async () => {
    setSROEB({ ...SROEB, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      SROEB.csv_import,
      SROEB.csv_import.name
    );
    const api = `${importSROEBDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setSROEB(SROEBInitialState);
      refSROEB.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setSROEB(SROEBInitialState);
      refSROEB.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setSROEB(SROEBInitialState);
        refSROEB.current.value = null
      }
    }
  }

  /* SRO EB end here */


  /* ALM start from here */
  const ALMInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [ALM, setALM] = useState(ALMInitialState);
  const changeImportALMCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setALM({ ...ALM, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setALM({ ...ALM, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportALM = async () => {
    setALM({ ...ALM, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      ALM.csv_import,
      ALM.csv_import.name
    );
    const api = `${importALMDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setALM(ALMInitialState);
      refALM.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setALM(ALMInitialState);
      refALM.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setALM(ALMInitialState);
        refALM.current.value = null
      }
    }
  }

  /* ALM end here */


  /* RBIMaster start from here */
  const RBIMasterInitialState = {
    isLoader: false,
    isDisabled: true,
    csv_import: null
  }

  const [RBIMaster, setRBIMaster] = useState(RBIMasterInitialState);
  const changeImportRBIMasterCsv = (event) => {
    if (event.target.files[0] && event.target.files[0] !== undefined) {
      setRBIMaster({ ...RBIMaster, ['csv_import']: event.target.files[0], ['isDisabled']: false });
    } else {
      setRBIMaster({ ...RBIMaster, ['csv_import']: null, ['isDisabled']: true });
    }
  }

  const btnImportRBIMaster = async () => {
    setRBIMaster({ ...RBIMaster, ['isDisabled']: true, ['isLoader']: true });
    const formData = new FormData();
    formData.append(
      "csv_import",
      RBIMaster.csv_import,
      RBIMaster.csv_import.name
    );
    const api = `${importRBIMasterDataApi}`;
    const res = await axios.post(`${BaseUrl}/${api}`, formData, { headers: authHeaders() }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
    if (res.status === 200) {
      SuccessToastMessage(res.data.message, "success1");
      setRBIMaster(RBIMasterInitialState);
      refRBIMaster.current.value = null
    } else if (res.status === 401) {
      ErrorToastMessage(res.data.error.csv_import[0], "failed");
      setRBIMaster(RBIMasterInitialState);
      refRBIMaster.current.value = null
    } else {
      if (res.data.message !== undefined) {
        ErrorToastMessage(res.data.message, "failedasdasda");
        setRBIMaster(RBIMasterInitialState);
        refRBIMaster.current.value = null
      }
    }
  }

  /* RBIMaster end here */

  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="Import CSV" icon={ImportExportIcon} />
        <SuccessFailedMessage />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Card style={{ marginBottom: "20px" }} >
              <CardContent className={classes.headingTitleBox} style={{ textAlign: "left" }}>
                <Typography variant="body1" color="text.secondary">
                  You can download the CSV format to import report with one click.
                </Typography>
              </CardContent>
            </Card>

            <Box sx={{ width: '100%', typography: 'body1' }}>


              {/* Master Import Start from Here */}

              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12}>
                  <Typography gutterBottom className={classes.headingText} variant="h3" component="div">
                    Master & Credit Bureau Master - Import <hr className={classes.headingHR}></hr>
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refMicrometerMaster}
                            autoFocus
                            onChange={changeImportMicrometerMasterCsv}
                          />
                          <Loader loader={micrometerMaster.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportMicrometerMaster}
                            disabled={micrometerMaster.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Micrometer - Master
                        </Typography>

                        <a href="/csv_format/Micrometer_CSV.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>

                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refMasterBorrowings}
                            autoFocus
                            onChange={changeImportMasterBorrowingsCsv}
                          />
                          <Loader loader={masterBorrowings.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportMasterBorrowings}
                            disabled={masterBorrowings.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Micrometer - Borrowings Master
                        </Typography>

                        <a href="/csv_format/Micrometer_Borrowings.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>

                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refMmStateMaster}
                            autoFocus
                            onChange={changeImportMmStateMasterCsv}
                          />
                          <Loader loader={mmStateMaster.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportMmStateMaster}
                            disabled={mmStateMaster.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Micrometer - State Master
                        </Typography>

                        <a href="/csv_format/Micrometer_State.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>


                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refRBIMaster}
                            autoFocus
                            onChange={changeImportRBIMasterCsv}
                          />
                          <Loader loader={RBIMaster.isLoader} size={40} />

                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportRBIMaster}
                            disabled={RBIMaster.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Micrometer - RBI Data
                        </Typography>
                        <a href="/csv_format/Micrometer_RBI_Data.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refALM}
                            autoFocus
                            onChange={changeImportALMCsv}
                          />
                          <Loader loader={ALM.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportALM}
                            disabled={ALM.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom className={classes.headingTitle} variant="h5" component="div">
                          Micrometer - ALM
                        </Typography>
                        <a href="/csv_format/Micrometer_ALM.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>

                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refCbState}
                            autoFocus
                            onChange={changeImportCbStateCsv}
                          />
                          <Loader loader={cbState.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportCbState}
                            disabled={cbState.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Credit Bureau Master - State
                        </Typography>
                        <a href="/csv_format/Credit_Bureau_Master_State.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                {/* credit bureau Master - District */}

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refCbDistrict}
                            autoFocus
                            onChange={changeImportCbDistrictCsv}
                          />
                          <Loader loader={cbDistrict.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportCbDistrict}
                            disabled={cbDistrict.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Credit Bureau Master - District
                        </Typography>
                        <a href="/csv_format/Credit_Bureau_Master_District.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

              </Grid>

              {/* Master Import End from Here */}

              {/* Radar Import Start from Here */}

              {/* <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12}>
                  <Typography gutterBottom className={classes.headingText} variant="h3" component="div">
                    Radar - Import <hr className={classes.headingHR}></hr>
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refRadarRingLeader}
                            autoFocus
                            onChange={changeImportRadarRingLeaderCsv}
                          />
                          <Loader loader={radarRingLeader.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportRadarRingLeader}
                            disabled={radarRingLeader.isDisabled}
                          >  Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Ring leader
                        </Typography>
                        <a href="/csv_format/rader_ring_leader_csv.csv" className={classes.download_text} download>
                              <Typography variant="body1" className={classes.download_text}>
                              Download the Sample format : Click Here
                              </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>


                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refRadarNegativeArea}
                            autoFocus
                            onChange={changeImportRadarNegativeAreaCsv}
                          />
                          <Loader loader={radarNegativeArea.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportRadarNegativeArea}
                            disabled={radarNegativeArea.isDisabled}
                          >
                            Upload
                           
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Negative area
                        </Typography>
                        <a href="/csv_format/rader_negative_area.csv" className={classes.download_text} download>
                              <Typography variant="body1" className={classes.download_text}>
                              Download the Sample format : Click Here
                              </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refRadarRiskyArea}
                            autoFocus
                            onChange={changeImportRadarRiskyAreaCsv}
                          />
                           <Loader loader={radarRiskyArea.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportRadarRiskyArea}
                            disabled={radarRiskyArea.isDisabled}
                          >
                            Upload
                           
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Risky area
                        </Typography>
                        <a href="/csv_format/rader_risky_area_csv.csv" className={classes.download_text} download>
                              <Typography variant="body1" className={classes.download_text}>
                              Download the Sample format : Click Here
                              </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refRadarExternalInciter}
                            autoFocus
                            onChange={changeImportRadarExternalInciterCsv}
                          />
                          <Loader loader={radarExternalInciter.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportRadarExternalInciter}
                            disabled={radarExternalInciter.isDisabled}
                          >
                            Upload
                           
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          External inciter
                        </Typography>
                        <a href="/csv_format/rader_external_inciter.csv" className={classes.download_text} download>
                              <Typography variant="body1" className={classes.download_text}>
                              Download the Sample format : Click Here
                              </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid> */}

              {/* Radar Import End from Here */}

              {/* SRO Import Start from Here */}

              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12}>
                  <Typography gutterBottom className={classes.headingText} variant="h3" component="div">
                    SRO - Import <hr className={classes.headingHR}></hr>
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refSROEB}
                            autoFocus
                            onChange={changeImportSROEBCsv}
                          />
                          <Loader loader={SROEB.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportSROEB}
                            disabled={SROEB.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          SRO - Employee Bureau
                        </Typography>
                        <a href="/csv_format/SRO_EB.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refSROEB1}
                            autoFocus
                            onChange={changeImportSROEB1Csv}
                          />
                          <Loader loader={SROEB1.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportSROEB1}
                            disabled={SROEB1.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          SRO - Credit Bureau
                        </Typography>
                        <a href="/csv_format/SRO_CB.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                {/*                 <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                        <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refSROCB}
                            autoFocus
                            onChange={changeImportSROCBCsv}
                          />
                           <Loader loader={SROCB.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportSROCB}
                            disabled={SROCB.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                        SRO - Credit Bureau
                        </Typography>
                        <a href="/csv_format/SRO_CB.csv" className={classes.download_text} download>
                              <Typography variant="body1" className={classes.download_text}>
                                      Download the Sample format : Click Here
                              </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid> */}

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refSROQAR}
                            autoFocus
                            onChange={changeImportSROQARCsv}
                          />
                          <Loader loader={SROQAR.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportSROQAR}
                            disabled={SROQAR.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          SRO - QAR
                        </Typography>
                        <a href="/csv_format/SRO_QAR.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refSROCGRM}
                            autoFocus
                            onChange={changeImportSROCGRMCsv}
                          />
                          <Loader loader={SROCGRM.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportSROCGRM}
                            disabled={SROCGRM.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          SRO - CGRM
                        </Typography>
                        <a href="/csv_format/SRO_CGRM.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>

              {/* SRO Import End from Here */}



              {/* Mudra Import Start from Here */}

              {/* <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12}>
                  <Typography gutterBottom className={classes.headingText} variant="h3" component="div">
                    Mudra & Miscellaneous - Import <hr className={classes.headingHR}></hr>
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            inputProps={{ accept: ".csv" }}
                            autoComplete="myFile"
                            inputRef={refMudraDistrictkWise}
                            autoFocus
                            onChange={changeImportMudraDistrictWiseCsv}
                          />
                          <Loader loader={mudraDistrictkWise.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportMudraDistrictkWise}
                            disabled={mudraDistrictkWise.isDisabled}
                          >
                            Upload

                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Mudra - District Wise
                        </Typography>
                        <a href="/csv_format/Mudra_District_Wise_Tables.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>


                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refMudraBankWise}
                            autoComplete="myFile"
                            autoFocus
                            onChange={changeImportMudraBankWiseCsv}
                          />
                          <Loader loader={mudraBankWise.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportMudraBankWise}
                            disabled={mudraBankWise.isDisabled}
                          >
                            Upload

                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Mudra - Bank Wise
                        </Typography>
                        <a href="/csv_format/Mudra_Bank_Wise_Tables.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refAssociateMaster}
                            autoFocus
                            onChange={changeImportAssociateMasterCsv}
                          />
                          <Loader loader={associateMaster.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportAssociateMaster}
                            disabled={associateMaster.isDisabled}
                          >
                            Upload

                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Members and Associate Master
                        </Typography>
                        <a href="/csv_format/Members_and_Associate_Master.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refContactDetails}
                            autoFocus
                            onChange={changeImportContactDetailsCsv}
                          />
                          <Loader loader={contactDetails.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportContactDetails}
                            disabled={contactDetails.isDisabled}
                          >
                            Upload

                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          Contact Details
                        </Typography>
                        <a href="/csv_format/Contact_Details.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refDRIState}
                            autoFocus
                            onChange={changeImportDRIStateCsv}
                          />
                          <Loader loader={DRIState.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportDRIState}
                            disabled={DRIState.isDisabled}
                          >
                            Upload

                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          DRI States
                        </Typography>
                        <a href="/csv_format/DRIState.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>


                <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }} >
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refDRIDistrict}
                            autoFocus
                            onChange={changeImportDRIDistrictCsv}
                          />
                          <Loader loader={DRIDistrict.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportDRIDistrict}
                            disabled={DRIDistrict.isDisabled}
                          >
                            Upload

                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography gutterBottom variant="h5" className={classes.headingTitle} component="div">
                          DRI District
                        </Typography>
                        <a href="/csv_format/DRIDistrict.csv" className={classes.download_text} download>
                          <Typography variant="body1" className={classes.download_text}>
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>

 
              <Grid xs={12} sm={12} md={3}>
                  <Card style={{ padding: "8px" }}>
                    <CardActionArea>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={12} md={8}>
                          <TextField
                            margin="normal"
                            variant="standard"
                            type="file"
                            required
                            fullWidth
                            id="myFile"
                            name="myFile"
                            autoComplete="myFile"
                            inputProps={{ accept: ".csv" }}
                            inputRef={refDRIMapData}
                            autoFocus
                             onChange={changeImportDRIMapDataCsv}
                          />
                          <Loader loader={DRIMapData.isLoader} size={40} />
                        </Grid>
                        <Grid xs={12} sm={12} md={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.Buttonbg}
                            sx={{ mt: 1, mb: 2 }}
                            onClick={btnImportDRIMapData}
                            disabled={DRIMapData.isDisabled}
                          >
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          className={classes.headingTitle}
                          component="div"
                        >
                          DRI Map Data
                        </Typography>
                        <a
                          href="/csv_format/dri_map_data.csv"
                          className={classes.download_text}
                          download
                        >
                          <Typography
                            variant="body1"
                            className={classes.download_text}
                          >
                            Download the Sample format : Click Here
                          </Typography>
                        </a>
                      </CardContent>
                    </CardActionArea>
                    <CardActions></CardActions>
                  </Card>
                </Grid>
              </Grid> */}



              {/* Mudra Import End from Here */}

            </Box>

          </Grid>


        </Grid>
      </Box>
    </>

  );
};

export default ImportTables;
