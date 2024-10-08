import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useNavigate, redirect } from 'react-router-dom';
import { authLoginOTP } from '../Service/Login/AuthService';
import { CircularProgress } from '@mui/material';
import { SuccessFailedMessage, SuccessToastMessage, ErrorToastMessage } from '../common/SuccessFailedMessage';

import bgImage from '../../../src/newimages/Datareport.gif';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Grid item xs style={{ marginBottom: "10px", marginTop: "-20px" }}>
        <Link href="/" variant="body2">
          Back to login
        </Link>
      </Grid>

      {'Copyright © '}
      <Link color="inherit" href="https://mfinindia.org">
        Microfinance Industry Network.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#058283 !important"
    },
  }))
const theme = createTheme();
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  input: {
    display: 'none',
  },
  circularProgress: {
    marginLeft: 0,
    marginRight: theme.spacing.unit,
  },
});
export default function LoginOTP() {
  const classes = useStyle();
  const navigate = useNavigate();
  const [otp_number, setOTP] = useState("");
  const [loader, setLoader] = useState(false)
  var userdetails = JSON.parse(localStorage.getItem('user'));
  const handlClick = async (e) => {
    e.preventDefault()
    setLoader(true);
    const body = {
      otp_number: otp_number,
      user_id: userdetails.data.user.id
    }
    let response = await authLoginOTP(body)
    console.log("authOTPlogin", response);
    if (response.data.access_status === true) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("mobile_verify", true);
      setLoader(false);
      SuccessToastMessage("OTP Number has been successfully verified", "success1");
      navigate('/');
      navigate(0);
    } else {
      setLoader(false);
      alert("Invalid OTP Number");
      console.log("dadsadsdsd");
      ErrorToastMessage("Invalid OTP Number", "failed");
    }
  }
  return (
    <div className="form-body iofrm-layout">
      <div className="img-holder">
        <div className="info-holder">
          <img src={bgImage} alt="" />
        </div>
      </div>
      <div class="form-holder">
        <div class="form-content">
          <div class="form-items with-bg">
            <div class="website-logo-inside logo-normal">
              <a href="index.html">
                <div className="logo">
                  <img
                    className="logo-size"
                    src="https://datahub.mfinindia.org/MFIN_Logo_PNG.png"
                    alt=""
                  />
                </div>
              </a>
            </div>
            <h5 class="mb-3">Please verify the OTP number</h5>
            <form onSubmit={(e) => handlClick(e)} sx={{ mt: 1 }}>

              <input className='form-control' margin="normal"
                variant="outlined"
                required
                type='number'
                fullWidth
                id="otp_number"
                label="OTP Number"
                placeholder='Enter Your OTP Here'
                name="otp_number"
                autoComplete="otp_number"
                autoFocus
                value={otp_number}
                onChange={(e) => setOTP(e.target.value)} />


              <div class=" text-center">
                <Button
                  type="submit"
                  fullWidth className='login w-50 mt-2 '
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                //disabled={loader}

                >
                  Verify
                  {/* {
                  loader === true ? <CircularProgress false style={{ "color": "#fff", marginLeft: "10px" }} className={classes.circularProgress} size={20} /> : ''
                } */}

                </Button>
              </div>

              <a href="/"  >Back to login</a>
            </form>

            <p className="copyright">
              Copyright &copy;{' '}
              <a href="https://mfinindia.org/">Microfinance Industry Network. 2024.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}