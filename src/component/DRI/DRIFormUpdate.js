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
import GrassIcon from "@mui/icons-material/Grass";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  SuccessFailedMessage,
  SuccessToastMessage,
  ErrorToastMessage,
} from "../common/SuccessFailedMessage";
import "date-fns";
import TextField from "@mui/material/TextField";
import Breadcrumb from "../common/Breadcrumb";
import { BaseUrl } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import { authUpdateDriMap } from "../Service/Login/AuthService";
import { useState, useEffect } from "react";
const useStyle = makeStyles((theme) => createStyles({}));

const DRIFormUpdate = () => {
  const [loader, setLoader] = useState(false);
  const [GetIframInfo, setGetIframInfo] = useState("");
  const navigate = useNavigate();
  const getIframeData = async () => {
    await axios
      .get(`${BaseUrl}/api/auth/get-dri-iframe`, { headers: authHeaders() })
      .then((response) => {
        setGetIframInfo(response.data.data[0].DRI_Frame);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
  const handlDriMapClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    const body = {
    DRI_Frame: GetIframInfo,
    };
    let response = await authUpdateDriMap(body);
    console.log("DRI", response);
    if (response.data.success_status === true) {
      setLoader(false);
      SuccessToastMessage("DRI Updated successfully", "success1");
      alert("DRI iframe has been successfully updated.");
    } else {
      setLoader(false);
      ErrorToastMessage("Unable to update DRI Map", "failed");
    }
  };
  useEffect(() => {
     getIframeData();
  },[]);
  const classes = useStyle();
  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={12}>
          <div role="presentation">
            <Breadcrumb
              title="Update District Risk Index (DRI)"
              icon={GrassIcon}
            />
          </div>
        </Grid>

        <Card style={{ padding: "8px", marginTop: "30px" }}>
          <CardActionArea>
          <Box component="form" noValidate onSubmit={(e) => handlDriMapClick(e)} sx={{ mt: 1 }}>
            <Grid xs={12} sm={12} md={12}>
              <TextField
                label="Dri iframe"
                multiline
                rows={10}
                cols={10}
                style={{ width: "950px" }}
                name="DRI_Frame"
                variant="outlined"
                onChange={(e) => setGetIframInfo(e.target.value)}
                value={GetIframInfo}
              />
            </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
            <Grid xs={12} sm={12} md={2}>
              {" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.Buttonbg}
                style={{ width: "100px" }}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
};

export default DRIFormUpdate;
