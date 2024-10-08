import React from "react";
import Home from "../Home/Home";
import ImportTables from "../ImportTables/ImportTables";
import MicrofinanceUniverse from "../MicrofinanceUniverse/MicrofinanceUniverse";
import ContactDetail from "../ContactDetail/ContactDetail";
import MDistrictWise from "../Mudra/MDistrictWise";
import MBankWise from "../Mudra/MBankWise";
import Micrometer from "../Micrometer/Micrometer";
import Mfinmembersmodule from "../Micrometer/mfin_members_module";
import GlpTrendsGrowth from "../MicrofinanceUniverse/Details/GlpTrendsGrowth";
import UniqueBorrowersAccountsTrend from "../MicrofinanceUniverse/Details/UniqueBorrowersAccountsTrend";
import DisbursementTrend from "../MicrofinanceUniverse/Details/DisbursementTrend";
import ParAnalysis from "../MicrofinanceUniverse/Details/ParAnalysis";
import ParBucketAnalysis from "../MicrofinanceUniverse/Details/ParBucketAnalysis";
import CustomHistoricalGLP from "../customReport/CustomHistoricalGLP";
import CustomPARAnalysis from "../customReport/CustomPARAnalysis";
import CustomDPDBucket from "../customReport/CustomDPDBucket";
import CustomDisbursementAmount from "../customReport/CustomDisbursementAmount";
import CustomDisbursementAccount from "../customReport/CustomDisbursementAccount";
import CustomUniversePortfolio from "../customReport/CustomUniversePortfolio";
import CustomUniversePAR from "../customReport/CustomUniversePAR";

import CustomizeReport from "../customReport/CustomizeReport";
import MembersAssociateList from "../MembersAssociate/MembersAssociateList";
import RolePermission from "../Role/RolePermission";
import AdminUsers from "../Admin/AdminUsers";
import DRIStatesMap from "../DRI/DRIStatesMap";
import SroMaster from "../SRO/SroMaster";
import UploadPublication from "../ContactDetail/UploadPublication";
import PublicationList from "../ContactDetail/PublicationList";
import DataPublicationCard from "../ContactDetail/DataPublicationCard";
import ComparisonModule from "../Home/ComparisonModule/ComparisonModule";

export const RolePermissionList= [
  {
    key: "Home",
    subkey: [],
    checked: true,
    linkName:"/",
    componentName:<Home />
  },
  {
    key: "Microfinance Universe",
    subkey: ["ABCD", "DEFG"],
    checked: true,
    linkName:"/micro-finance-universe",
    componentName:<MicrofinanceUniverse />
  },
  {
    key: "MFIN Members",
    subkey: [],
    checked: true,
    linkName:"/mfinmembersmodule",
    componentName:<Mfinmembersmodule />
  },
  {
    key: "Custom Report",
    subkey: [],
    checked: true,
    linkName:"/customize-report",
    componentName:<CustomizeReport />
  },

  {
    key: "Import CSV",
    subkey: [],
    checked: true,
    linkName:"/import-csv",
    componentName:<ImportTables />
  },

  {
    key: "Publication",
    subkey: [],
    checked: true,
    linkName:"/uploadpublication",
    componentName:<UploadPublication />
  },
  {
    key: "Data Publication Card",
    subkey: [],
    checked: true,
    linkName:"/datapublicationcard",
    componentName:<DataPublicationCard />
  },

  {
    key: "DRI",
    subkey: [],
    checked: true,
    linkName:"/dri-states",
    componentName:<DRIStatesMap />
  },

  {
    key: "Mudra",
    subkey: [],
    checked: true,
    linkName:"/mudra",
    componentName:<MDistrictWise />
  },

  // {
  //   key: "Radar",
  //   subkey: [],
  //   checked: true,
  //   linkName:"/radar",
  //   componentName:<DRIStatesMap />
  // },

  {
    key: "SRO",
    subkey: [],
    checked: true,
    linkName:"/sro",
    componentName:<SroMaster />
  },
  
  {
    key: "Members and Associate",
    subkey: [],
    checked: true,
    linkName:"/members-associate",
    componentName:<MembersAssociateList />
  },
  {
    key: "Contact Details",
    subkey: [],
    checked: true,
    linkName:"/contacts",
    componentName:<ContactDetail />
  },
  {
    key: "Role & Permission",
    subkey: [],
    checked: true,
    linkName:"/role-permission",
    componentName:<RolePermission />
  },
  {
    key: "Admin Account",
    subkey: [],
    checked: true,
    linkName:"/adminUsers",
    componentName:<AdminUsers />
  },
  {
    key: "Benchmarks",
    subkey: [],
    checked: true,
    linkName:"/comparison-report",
    componentName:<ComparisonModule />
  },
  {
    key: "Publication List",
    subkey: [],
    checked: true,
    linkName:"/publicationlist",
    componentName:<PublicationList />
  },
]
//export default RolePermissionList;