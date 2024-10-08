import { createStyles, makeStyles } from "@material-ui/styles";
import { Button, Card, CardActionArea } from "@mui/material";
import * as React from "react";
import {useState, useEffect } from "react";
import "./Feedback.css";
 import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
// import Breadcrumb from "../common/Breadcrumb";
import Breadcrumb from "../common/Breadcrumb";
import GrassIcon from "@mui/icons-material/Grass";
import TextField from "@mui/material/TextField";
import { uploadDataApi } from "../url/url";
import axios from "axios";
 
const useStyle = makeStyles((theme) => createStyles({}));

const Feedback = ({ isOpen, closeModal }) => {

  // const location = useLocation(); // Get current URL from React Router
  // const [url, setUrl] = useState(window.location.href);

  const [values, setValues] = useState({
    user_id: "",
    user_name: "",
    user_phone: "",
    user_email: "",
    // page_url: window.location.href,
    // page_url: url,
    user_message: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var userdetails = await JSON.parse(localStorage.getItem("user"));
    var formdata = new FormData();

    try {
      formdata.append("user_id", userdetails.data.user.id);
      formdata.append("user_name", userdetails.data.user.name);
      formdata.append("user_phone", userdetails.data.user.mobile_number);
      formdata.append("user_email", userdetails.data.user.email);
      formdata.append("page_url", values.page_url);
      formdata.append("user_message", values.user_message);
      console.log('page_url',values.page_url);
      console.log("formdata", formdata);
      const response = await axios.post(
       ` ${uploadDataApi}/send-feedback`,
        formdata
      );
      console.log("response", response);
      alert("Data stored and has been send successfully");
      window.location.reload(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  const classes = useStyle();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
       const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);

       return () => {
        document.body.classList.remove('no-scroll');
        document.body.removeChild(backdrop);
      };
    }
  }, [isOpen]);

   

   

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none", marginTop: "3%" }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
             Feedback
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* <Box sx={{ flexGrow: 1 }}  className="container-main">
            <Grid container spacing={1}>
            <Grid xs={12} sm={12} md={12}>
                <div role="presentation">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><a href="/">Home</a></li>
                      <li class="breadcrumb-item active" aria-current="page">Feedback</li>
                      <li className="close-button" onClick={''}> <i class="bi bi-x-lg"></i>  </li>
                  </ol>
                  </nav>
          
                </div>

              </Grid> */}
            {/* <Card style={{ padding: "8px" }}  >
          <CardActionArea   > */}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid xs={12} sm={12} md={12}>
                <TextField
                  label="URL"
                  style={{ width: "100%",marginBottom:'0.5rem' }}
                  name="page_url"
                  variant="outlined"
                  value={window.location.href}
                  // value={url}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} sm={12} md={12}>
                <TextField
                  label="Feedback"
                  style={{  width: "100%",marginBottom:'0.5rem'}}
                  name="user_message"
                  variant="outlined"
                  placeholder="feedback words (min : 50  , max:150)"
                  onChange={handleChange}
                />
              </Grid>
             
              <Grid xs={12} sm={12} md={5}></Grid>
            </Box>
            
            
          </div>
          <div className="modal-footer">
            
            <button
                    type="submit"
                    
                    className="submit"
                    // style={{ width: "100px", backgroundColor: "green" }}
                    // sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
            {/* <button type="button" className="btn btn-primary">
              Save changes
            </button> */}
          </div>
        </div>
      </div>
    </div>

   
  );
};


export default Feedback;