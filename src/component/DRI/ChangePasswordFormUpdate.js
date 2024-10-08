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
import { authChangePassword } from "../Service/Login/AuthService";
import { useState, useEffect } from "react";
const useStyle = makeStyles((theme) => createStyles({}));

const ChangePasswordFormUpdate = () => {
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();
 
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoader(true);
    const body = {
    password: password,
    cpassword: cpassword,
    };
    let response = await authChangePassword(body);
    if (response.data.status === 200) {
      setLoader(false);
      SuccessToastMessage("Change Updated successfully", "success1");
      alert("Password has been successfully updated.");
      window.location.reload(true);
    } else {
      setLoader(false);
      SuccessFailedMessage("Unable to change password", "failed");
      window.location.reload(true);
    }
  };
  
  
  const classes = useStyle();
  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={12}>
          <div role="presentation">
            <Breadcrumb
              title="Change Password"
              icon={GrassIcon}
            />
          </div>
        </Grid>

        <Card style={{ padding: "8px", marginTop: "30px" }}>
          <CardActionArea>
          <Box component="form" noValidate onSubmit={(e) => handlePasswordChange(e)} sx={{ mt: 1 }}>
            <Grid xs={12} sm={12} md={12}>
              <TextField
                label="Password"
                style={{ width: "950px" }}
                name="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12}>
              <TextField
                label="Confirm Password"
                style={{ width: "950px" }}
                name="cpassword"
                variant="outlined"
                onChange={(e) => setCPassword(e.target.value)}
                value={cpassword}
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

export default ChangePasswordFormUpdate;
