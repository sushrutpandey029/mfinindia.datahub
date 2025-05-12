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
import Modal from '@mui/material/Modal';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useNavigate, redirect } from 'react-router-dom';
import { authLogin, authForgotPassword } from '../Service/Login/AuthService';
import { CircularProgress } from '@mui/material';
import { SuccessFailedMessage, SuccessToastMessage, ErrorToastMessage } from '../common/SuccessFailedMessage';
import bgImage from '../../../src/newimages/Datareport.gif';
import '../Login/Login.css';
import authHeaders from '../Service/AuthHeaders';
import { BaseUrl } from '../url/url';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mfinindia.org/">
        Microfinance Industry Network.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyle = makeStyles((theme) =>
  createStyles({

  }))



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function Login() {
  const classes = useStyle();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handlClick = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setLoader(true);
    const body = {
      email: email,
      password: password,
    }

    try {
      console.log("before response");
      const response = await authLogin(body)

      console.log("authlogin", response);
      console.log('login-response', response);

      if (response.data.status === true) {
        localStorage.setItem("login_screen", true);
        localStorage.setItem("access_token", response.data.data.access_token)
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoader(false);
        alert(response.data.message);
        //SuccessToastMessage(response.data.message, "success1");
        navigate('/login-otp');
        ///navigate(0);
      } else {
        // setLoader(false);
        console.log("aasasa", response.data.message);
        alert(response.data.message);
        // ErrorToastMessage("Invalid Email Address and Password.", "failed");
      }

    } catch (error) {
      console.log("Login Error", error);

      if (error.response) {
        if (error.response.data && error.response.data.access_status === false && error.response.data.status === 200) {
          alert(error.response.data.message);
        }
      }

      // if (error.response) {
      //   if (error.response.data && error.response.data.access_status === false && error.response.data.status === 200) {
      //     const userConfirmed = window.confirm(error.response.data.message + "\n\nClick OK to proceed or Cancel to abort");
      //     if (userConfirmed) {
      //       try {
      //         // Call your API here
      //         await axios.get(`${BaseUrl}/api/auth/loginLogout?user_id=${user_id}`,
      //           { headers: authHeaders() })
      //           .then((response) => {
      //             localStorage.setItem("access_token", "");
      //             localStorage.setItem("user", "");
      //             localStorage.setItem("loggedIn", "");
      //             localStorage.setItem("mobile_verify", "");
      //             localStorage.clear();
      //             window.location.assign("/");

      //             // window.location.reload(true);
      //             console.log('logout api call');
      //           }).catch((error) => {
      //             console.log('err', error);
      //           });

      //       } catch (apiError) {
      //         console.error("API call failed:", apiError);
      //       }
      //     }
      //   }
      // }
      // window.location.reload();
    }

  }

  const handleForgotClick = async (e) => {
    e.preventDefault()
    setLoader(true);
    const body = {
      email: email
    }
    let response = await authForgotPassword(body)
    //console.log("authlogin",response);
    if (response.data.status === true) {
      setLoader(false);
      alert(response.data.message);
      window.location.reload(true)
    } else {
      // setLoader(false);
      alert(response.data.message);
      window.location.reload(true)
    }
  }
  
  return (
    <div className="form-body iofrm-layout">
      <div className="img-holder">
        <div className="info-holder">
          <img src={bgImage} alt="" />
        </div>
      </div>
      <div className="form-holder">
        <div className="form-content">
          <div className="form-items with-bg">
            <div className="website-logo-inside logo-normal">
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
            <h3 className="font-md">MFIN Datahub</h3>
            <form onSubmit={(e) => handlClick(e)}>

              <input
                className="form-control"
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address/Login ID"
                name="email"
                placeholder='Enter Your Email / Login ID'
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form-control"
                margin="normal"
                variant="outlined"
                required
                fullWidth
                name="password"
                placeholder='Enter Your Password'
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="form-check d-flex">
                <div>
                  <Grid item xs>
                    <FormControlLabel
                      control={<Checkbox value="remember" className='form-check-input' color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                </div>
                <Link variant='body2' onClick={handleOpen} >
                  Forgot password?
                </Link>
              </div>
              <div className="text-center">
                <button type="submit"
                  fullWidth className='login '
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isDisabled}>
                  Sign In
                </button>
              </div>
            </form>
            <p className="copyright">
              Copyright &copy;{' '}
              <a href="https://mfinindia.org/">Microfinance Industry Network. 2024.</a>
            </p>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Forgot Password
          </Typography>

          <Box component="form" noValidate onSubmit={(e) => handleForgotClick(e)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.Buttonbg}
              sx={{ mt: 3, mb: 2 }}
            //disabled={loader}

            >
              Submit
            </Button>

          </Box>
        </Box>
      </Modal>
    </div>


  );
}