import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Breadcrumb from "../common/Breadcrumb";
import axios from "axios";
import GrassIcon from "@mui/icons-material/Grass";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "react-bootstrap/Table";
import CustomPagination from "../MembersAssociate/CustomPagination";
import { useNavigate } from "react-router-dom";
import { uploadDataApi } from "../url/url";
import "./PublicationList.css";
import DataTable from "react-data-table-component"; 
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import 'datatables.net-bs5';
// import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';


const PublicationList = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // const tableRef = useRef(null);
   
  const navigate = useNavigate();  

  const columns = [
    {
      name: 'Sr',
      cell: (row, index) => index + 1,
      center: true
     },
    // {
    //   name: 'Id ',
    //   selector: row => row.id,
    //   center: true
    //  },
    {
      name: 'Image ',
      cell: row => (
        <img
          src={`https://api.mfinindia.org/public/${row.image}`}
          alt="img"
          style={{ height: '50px', width: '90px' }}
        />
      ),
      center: true
     },
    {
      name: 'Heading ',
      selector: row => row.p_heading,
      center: true
     },
    {
      name: 'Title ',
      selector: row => row.p_title,
      center: true
     },
    {
      name: ' Pdf',
      cell: row => (
        <iframe
        src={`https://api.mfinindia.org/public/${row.pdf_file}`}
        alt="pdf"
        height="50rem"
        width="125rem"
      />
      ),
      center: true
     },
    {
      name: ' Date',
      selector: row => row.date,
     center: true
     },
    {
      name: 'Edit ',
      cell: row => (
        <Button
          onClick={() =>
            navigate(`/updatepublication/${row.id}`, {
              state: {
                title: row.p_title,
                heading: row.p_heading,
                content: row.Content,
                pdf: row.pdf_file,
                image: row.image,
                date: row.date,
                synopsis: row.synopsis,
              },
            })
          }
          variant="outlined"
          color="primary"
          // endIcon={<ModeEditIcon />}
        >
          Edit
        </Button>
      ),
      center: true
     },
    {
      name: 'Delete ',
      cell: row => (
        <Button
          variant="outlined"
          color="error"
          // endIcon={<DeleteIcon />}
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </Button>
      ),
      center: true
     },
  ];
   

 
  const fetchDataList = async () => {
    try {
      const response = await axios.get(`${uploadDataApi}/datapublicationlist`);
      setData(response.data.data);
      console.log("publication-list-response", response);
      const initialData = data.filter(
        (item) => item.p_heading === "micrometer"
      );
      setFilterData(initialData);
    } catch (err) {
      console.log("err", err);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`${uploadDataApi}/delete/${id}`);
  //     fetchDataList(); // Refresh the list after deletion
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this publication?");
    if (confirmDelete) {
      try {
        await axios.delete(`${uploadDataApi}/delete/${id}`);
        fetchDataList(); // Refresh the list after deletion
      } catch (err) {
        console.log("err", err);
      }
    }
  };


  
  const handleMicroMeterList = () => {
    const filterList = data.filter((item) => item.p_heading === "micrometer");
    setFilterData(filterList);
    console.log("m-meter", filterList);
  };

  const handleMicroMirrorList = () => {
    const filterList = data.filter((item) => item.p_heading === "micromirror");
    setFilterData(filterList);
     console.log("m-mirror", filterList);
  };

  const handleMicroMatterList = () => {
    const filterList = data.filter((item) => item.p_heading === "micromatter");
    setFilterData(filterList);
    console.log('micromatter',filterList);
  }

  const handleOtherPublicationsList = () => {
    const filterList = data.filter((item) => item.p_heading === "otherpublications");
    setFilterData(filterList);
    console.log('other-publication', filterList);
  }

  useEffect(() => {
    fetchDataList();
  }, []);

  useEffect(() => {
    handleMicroMeterList();
  }, [data]);

  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container justifyContent={"space-between"} spacing={2}>
        <Grid xs={12} sm={12} md={12}>
          <Breadcrumb title="Publication List" icon={GrassIcon} />
        </Grid>

        {/* button grid start here */}
        <Grid container md={12} justifyContent={"space-between"} spacing={2}>
          <Grid item xs={8} sm={8} md={8} container>
            <Grid item xs={6} sm={4} md={3}>
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                onClick={handleMicroMeterList}
              >
                MicroMeter
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                onClick={handleMicroMirrorList}
              >
                MicroMirror
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                onClick={handleMicroMatterList}
              >
                MicroMatter
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                onClick={handleOtherPublicationsList}
              >
                Other Publication
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              onClick={() => navigate("/uploadpublication")}
            >
              Add Publication
            </Button>
          </Grid>
        </Grid>

        {/* button grid end here */}

        <Card style={{ marginBottom: "20px", width: "100%" }}>
          <CardContent>

            <DataTable 
              columns={columns}
             data={filterData}
             pagination
            />

           
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default PublicationList;