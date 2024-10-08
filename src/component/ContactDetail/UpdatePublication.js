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
import {Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
 import { useState, useEffect } from "react";
import { setDate } from "date-fns";
const useStyle = makeStyles((theme) => createStyles({}));

const UpdatePublication = () => {

  const {state} = useLocation();
  
  const [title , setTitle  ] = useState(state.title);
  const [heading , setHeading ] = useState(state.heading);
  const [uplodedate,setUplodedate  ] = useState(state.date);
  const [uploadpdf ,setUploadpdf  ] = useState(state.pdf);
  const [uploadimage ,setUploadimage  ] = useState(state.image);
  const [content ,setContent  ] = useState(state.content);
  const [fieldError, setFieldError] = useState(false);
   
  let {id} = useParams();
  const navigate = useNavigate();
  
  

  const classes = useStyle();

  const handleUpdate = async (e) => {
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
 
       const response = await axios.post('https://api.mfinindia.org/api/auth/updatepublication/'+id,formData,
        { 
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      alert('data updated successfully');
      // window.location.reload(true);
      navigate('/publicationlist');
      console.log('response : ', response);
    }catch(err){
        console.log('err',err);
        setFieldError(true);
    }
      
  }
  return (
 
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={12}>
          <div role="presentation">
            <Breadcrumb
              title="Update Publication"    
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
                defaultValue={state.title}
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
                />
             
            </Grid>
            <Grid xs={12} sm={12} md={12}>
             
                
                 <label for="heading"  style={{marginRight:'975px', color:'red' }}>
                    <b>Heading </b>
                </label>
                <select  style={{ width: "950px" }} class="form-control" id="heading"
                     onChange={(e) => setHeading(e.target.value)} 
                     defaultValue={state.heading}>
                    <option value=''>select one</option>
                    <option value='micrometer'>MicroMeter</option>
                    <option value='micromirror'>MicroMirror </option>
                    <option value='micromatter'>MicroMatter </option>
                    <option value='otherpublications'>Other Publications </option>
                </select>
             
              
            </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
          
            <Grid xs={12} sm={12} md={12}>  
             
                  <label for="date" class="form-label"  style={{marginLeft: '-59rem', color:'red' }}>
                    <b>Upload Date </b>
                </label>          
            <input
              type="date"
              name="date"
              id="date"
              style={{ width: "950px" }}
              variant="outlined"
              class="form-control"
              // value={state.date}
              defaultValue={state.date}
              onChange={(e) => setUplodedate(e.target.value)}
              />
               {/* <div style={{marginLeft: '-53rem'}}>
                <p>Current date : {state.date}</p>
              </div> */}
             </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
            <Grid xs={12} sm={12} md={12}>  
                  <label for="file"  style={{marginLeft: '-57rem', color:'red' }}>
                    <b>Upload File (.pdf) </b>
                </label>            
            <input
              type="file"
              name="file"
              id="file"
              style={{ width: "950px" }}
              variant="outlined"
              class="form-control"
              multiple
              onChange={(e) => setUploadpdf(e.target.files[0])}
              // defaultValue={state.pdf}
             />
              <div style={{marginLeft: '-49rem'}}>
                <p>current pdf : 
                 <iframe  src={'https://api.mfinindia.org/public/'+state.pdf}
                 alt="" height='50rem' width='125rem' />
                
                </p>
              </div>
             </Grid>
            <Grid xs={12} sm={12} md={5}></Grid>
            <Grid xs={12} sm={12} md={12}>  
            <label for="image"  style={{marginLeft: '-58rem', color:'red' }}>
                    <b>Upload Image </b>
                </label>             
            <input
              type="file"
              name="image"
              id="image"
              style={{ width: "950px" }}
              variant="outlined"
              class="form-control"
              multiple
              onChange={(e) => setUploadimage(e.target.files[0])}
               />
               <div style={{marginLeft: '-47rem'}}>
                <p>current image :  
                  <img src={`https://api.mfinindia.org/public/`+state.image} alt=""
                   height='45rem' width={'80rem'}/>
                </p>
              </div>
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
              defaultValue={state.content}
              onChange={(e) => setContent(e.target.value)}
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
                onClick={(e) => handleUpdate(e)}
              >
                Update 
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

export default UpdatePublication;
