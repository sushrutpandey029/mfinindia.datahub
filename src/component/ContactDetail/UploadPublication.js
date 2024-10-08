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
import { uploadDataApi} from "../url/url"
 
const useStyle = makeStyles((theme) => createStyles({}));

const UploadPublication = () => {

   const [title , setTitle  ] = useState("");
  const [heading , setHeading ] = useState("");
  const [ uplodedate,setUplodedate  ] = useState("");
  const [uploadpdf ,setUploadpdf  ] = useState("");
  const [uploadimage ,setUploadimage  ] = useState("");
  const [content ,setContent  ] = useState("");
  const [fieldError, setFieldError] = useState(false);
  
  const navigate = useNavigate();
 
  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      // const formimage = new FormData();
      formData.append('title',title);
      formData.append('heading',heading);
      formData.append('uplodedate',uplodedate);
      formData.append('content',content);
      formData.append('uploadpdf',uploadpdf);
      formData.append('uploadimage',uploadimage);
 
       const response = await axios.post('https://api.mfinindia.org/api/auth/upload-datapublication',formData,
        { 
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      alert('data submitted successfully');
      window.location.reload(true);
      console.log('response : ', response);
    }catch(err){
        console.log('err',err);
        setFieldError(true);
    }  
  }

  const classes = useStyle();
  return (
 
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={12}>
          <div role="presentation">
            <Breadcrumb
              title="Data Publication"    
              icon={GrassIcon}
            />
          </div>
        </Grid>

        <Card style={{ padding: "8px", marginTop: "30px" }}>
          <CardActionArea>
          <Box component="form" noValidate   sx={{ mt: 1 }}>
            <div>
            {
               fieldError && <p style={{color:"red"}}><b>All fields are required</b></p>
             }
            </div>
            
            <Grid xs={12} sm={12} md={12}>
            <label for="title"  style={{marginRight:'1000px', color:'red' }}>
                    <b>Title </b>
                </label>
                <input
                type="text"
                name="title"
                id="title"
                style={{ width: "950px" }}
                class="form-control"
                placeholder="title"
                // onChange={(e) => setSubmitData({...submitData, title : e.target.value}) }
                onChange={(e) => setTitle(e.target.value)}
                />
             
            </Grid>
            <Grid xs={12} sm={12} md={12}>
                <label for="heading"  style={{marginRight:'975px', color:'red' }}>
                    <b>Heading </b>
                </label>
                <select  style={{ width: "950px" }} class="form-control"
                  name="heading" id="heading"
                  // onChange={(e) => setSubmitData({...submitData, heading : e.target.value}) }
                  onChange={(e) => setHeading(e.target.value)}
                  >
                    <option value=''>select one</option>
                    <option value='micrometer'>MicroMeter</option>
                    <option value='micromirror'>MicroMirror </option>
                    <option value='micromatter'>MicroMatter </option>
                    <option value='otherpublications'>Other Publications </option>
                </select>
            </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
          
            <Grid xs={12} sm={12} md={12}>  
                  <label for="uplodedate" class="form-label"  style={{marginLeft: '-59rem', color:'red' }}>
                    <b> Upload Date </b>
                </label>          
            <input
              type="date"
              name="uplodedate"
              id="uplodedate"
              style={{ width: "950px" }}
              variant="outlined"
              class="form-control"
              // onChange={(e) => setSubmitData({...submitData, uplodedate : e.target.value}) }
              onChange={(e) => setUplodedate(e.target.value)}
              />
             </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
            <Grid xs={12} sm={12} md={12}>  
                  <label for="uploadpdf"  style={{marginLeft: '-57rem', color:'red' }}>
                    <b>Upload File (.pdf) </b>
                </label>            
            <input
              type="file"
              name="uploadpdf"
              id="uploadpdf"
              style={{ width: "950px" }}
              variant="outlined"
              class="form-control"
              multiple
              // onChange={(e) => setSubmitData({...submitData, uploadpdf : e.target.files[0]}) }
              onChange={(e) => setUploadpdf(e.target.files[0])}
              />
             </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
            <Grid xs={12} sm={12} md={12}>  
            <label for="uploadimage"  style={{marginLeft: '-58rem', color:'red' }}>
                    <b>Upload Image </b>
                </label>             
            <input
              type="file"
              name="uploadimage"
              id="uploadimage"
              style={{ width: "950px" }}
              variant="outlined"
              class="form-control"
              multiple
              // onChange={(e) => setSubmitData({...submitData, uploadimage : e.target.files[0]}) }
              onChange={(e) => setUploadimage(e.target.files[0])}
              />
            </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
            <Grid xs={12} sm={12} md={12}>  
            <label for="content"  style={{marginRight: '968px', color:'red' }}>
                    <b>Content </b>
                </label>             
            <textarea
              type="text"
              name="content"
              id="content"
              style={{ width: "950px" }}
              variant="outlined"
              class="form-control"
              placeholder="content"
              // onChange={(e) => setSubmitData({...submitData, content : e.target.value}) }
              onChange={(e) =>  setContent(e.target.value)}
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
                onClick={(e) => handleSubmit(e)}
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

export default UploadPublication;



// "message": "Data inserted successfully",
// "data": {
//     "p_heading": "data_heading",
//     "p_title": "datapublication",
//     "date": "12-05-2024",
//     "pdf_file": "pdf_files/1722942680.pdf",
//     "image": "images/1722942680.jpg",
//     "Content": "data_content",
//     "updated_at": "2024-08-06T11:11:20.000000Z",
//     "created_at": "2024-08-06T11:11:20.000000Z",
//     "id": 4
// }