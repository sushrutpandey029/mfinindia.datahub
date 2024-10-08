import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";
import { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Checkbox from "@mui/material/Checkbox";
import Modal from '@mui/material/Modal';
const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg:{
        backgroundColor:"#058283 !important"
      },
      th:
      {
      fontWeight:"bold"
      }
  })
);
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius:4,
    boxShadow: 24,
    p: 3,
  };
const AddContact = () => {
    const classes = useStyle();
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => alert();
    const handleClose1 = () => setOpen1(false);

    const [department, setDepartment] = useState('');
    const DepartmenthandleChange = (event) => {
        setDepartment(event.target.value);
    };
    return (
        <>
            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Contact information
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Institution Name"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Institution Short Name"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        {/* <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Lender Type "
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid> */}
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Entities"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Name"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                              //  required
                                fullWidth
                                id="email"
                                label="Department"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Designation"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                                required
                                fullWidth
                                id="email"
                                label="Mobile Number"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <TextField
                                margin="normal"
                                variant="standard"
                               // required
                                fullWidth
                                id="email"
                                label="Phone Number"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <FormControl variant="standard" sx={{ m: 2, minWidth: 330 }}>
                                <InputLabel id="demo-simple-select-standard-label">Status *</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={department}
                                    required
                                    onChange={DepartmenthandleChange}
                                    label="Status"
                                >
                                    <MenuItem value="">
                                        <em>Select</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Active</MenuItem>
                                    <MenuItem value={20}>Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.Buttonbg}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid xs={12} sm={12} md={2}>
                            <Button
                                type="submit"
                                color="error"
                                fullWidth
                                variant="contained"

                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cancel
                            </Button>
                        </Grid>

                    </Grid>

                </Box>
            </Modal>
        </>
    )
}

export default AddContact;