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
 import {authChangePhone} from "../Service/Login/AuthService";
 import { useState, useEffect } from "react";
const useStyle = makeStyles((theme) => createStyles({}));

const ChangePhoneForm = () => {
  var userdetails =  JSON.parse(localStorage.getItem("user"));
  console.log('phone-userdetails',userdetails);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    phone:'',
    cphone:''
  });

  
  const handleChange = async(e) => {
    e.preventDefault();
    setValues({...values,[e.target.name]: e.target.value})
  }

  const handlePhoneChange = async (e) => {
    e.preventDefault();
   
    var formData = new FormData();
   

    try{
        formData.append("phone",values.phone);
        formData.append("cphone",values.cphone);
        formData.append("user_id",userdetails.data.user.id);

        let response = await authChangePhone(formData);
        if(response && response.data.status === 200) {
          alert(response.data.message);
          window.location.reload(true);
        }
        console.log('phone-resp',response);
    }catch(err){
        console.log('phone-err',err);
        if(err.response) {
          alert(err.response.data.error.phone);
        }
    }
   

    
  }

  const classes = useStyle();
  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={12}>
          <div role="presentation">
            <Breadcrumb
              title="Change Phone"
              icon={GrassIcon}
            />
          </div>
        </Grid>

        <Card style={{ padding: "8px", marginTop: "30px" }}>
          <CardActionArea>
          <Box component="form" noValidate   sx={{ mt: 1 }}>
            <Grid xs={12} sm={12} md={12}>
              <TextField
                label="Phone"
                style={{ width: "950px" }}
                name="phone"
                variant="outlined"
                onChange={handleChange}
               />
            </Grid>
            <Grid xs={12} sm={12} md={12}>
              <TextField
                label="Confirm Phone"
                style={{ width: "950px" }}
                name="cphone"
                variant="outlined"
                onChange={handleChange}
               />
            </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
            <Grid xs={12} sm={12} md={2}>
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.Buttonbg}
                style={{ width: "100px" }}
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handlePhoneChange(e)}
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

export default ChangePhoneForm;