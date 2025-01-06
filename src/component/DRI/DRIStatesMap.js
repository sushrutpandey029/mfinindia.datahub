import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import GrassIcon from '@mui/icons-material/Grass';
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import "date-fns";
import Breadcrumb from "../common/Breadcrumb";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import StateMapData from "./StateMapData";
import { BaseUrl } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import Tableau from './Tableau';
import InteractiveStateAndCityMap from "./InteractiveStateAndCityMap";

const useStyle = makeStyles((theme) => createStyles({}));

const DRIStatesMap = () => {
  const [GetIframInfo, setGetIframInfo] = useState("");
  const getIframeData = async () => {

    await axios
      .get(
        `${BaseUrl}/api/auth/get-dri-iframe`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setGetIframInfo(response.data.data[0].DRI_Frame);
      })
      .catch((error) => {
        console.log("err", error);
      });

  };
  useEffect(() => {
    getIframeData();
  });
  const classes = useStyle();
  console.log("Iframe", GetIframInfo);
  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <div role="presentation">
        <Breadcrumb title="District Risk Index (DRI)" icon={GrassIcon} />

      </div>
      <Grid xs={12} sm={12} md={12}>


        {/* <StateMapData /> */}
        {/* <Tableau
          GetIframInfo={GetIframInfo}
        /> */}

        <InteractiveStateAndCityMap/>
      </Grid>
    </Box>
  );
};

export default DRIStatesMap;
