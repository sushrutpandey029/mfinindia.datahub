import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import Grid from '@mui/material/Unstable_Grid2';
import { Dropdown, DropdownMenuItem } from '../Mudra/dropdown';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckIcon from "@mui/icons-material/Check";
import MenuItem from '@mui/material/MenuItem';
import {
    Button,
    Card,
    CardContent,
} from "@mui/material";
import "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Loader from "../common/Loader";

const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#058283 !important"
    },
    th:
    {
      fontWeight: "bold"
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
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
};

const DateFieldFilter = (props) => {
    const classes = useStyle();
    const currentDate = new Date();

    const graphFilterInitialState = {
        fromMonth: new Date(props.commonState.fromMonth),
        toMonth: new Date(props.commonState.toMonth),
        entities: props.commonState.entities,
        isLoader: false,
        isDisabled: false
    };

    const [graphFilter, setGraphFilter] = useState(graphFilterInitialState);

    const filterHandler = () => {
        props.sendStartEndDate(graphFilter);
    };

    const handleGraphFromDateChange = (date) => {
        setGraphFilter({ ...graphFilter, fromMonth: date });
    };

    const handleGraphToDateChange = (date) => {
        setGraphFilter({ ...graphFilter, toMonth: date });
    };

    const HandleEntities = (e) => {
        setGraphFilter({ ...graphFilter, entities: e.target.value });
    };

    // Only set the initial state when the component mounts
    useEffect(() => {
        setGraphFilter(graphFilterInitialState);
    }, []);

    return (
        <>
            <Grid xs={12} sm={12} md={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} mt={2}>
                            <Grid xs={12} sm={12} md={5}>
                                <FormControl variant="standard" sx={{ m: 2, minWidth: 490 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Entities</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="entities"
                                        value={graphFilter.entities}
                                        onChange={HandleEntities}
                                        label="Select Entities"
                                    >
                                        <MenuItem value={"Banks"}>Banks</MenuItem>
                                        <MenuItem value={"NBFC-MFI"}>NBFC-MFI</MenuItem>
                                        <MenuItem value={"Universe"}>Universe</MenuItem>
                                        <MenuItem value={"NBFCs"}>NBFCs</MenuItem>
                                        <MenuItem value={"Others"}>Others</MenuItem>
                                        <MenuItem value={"SFBs"}>SFBs</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid xs={12} sm={12} md={5}>
                                    <DatePicker
                                        margin="normal"
                                        variant="standard"
                                        openTo="year"
                                        error={false}
                                        minDateMessage=' '
                                        maxDateMessage=' '
                                        views={["year", "month"]}
                                        label="To Month/Year"
                                        fullWidth
                                        value={graphFilter.toMonth}
                                        onChange={handleGraphToDateChange}
                                        maxDate={currentDate}
                                        minDate={new Date("2017-01-01")}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                            <Grid xs={12} sm={12} md={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.Buttonbg}
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={props.commonState.isDisabled}
                                    onClick={filterHandler}
                                >
                                    Filter
                                    <Loader loader={props.commonState.isLoader} size={15} />
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default DateFieldFilter;
