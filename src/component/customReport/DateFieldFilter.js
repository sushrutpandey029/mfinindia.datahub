import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import Grid from '@mui/material/Unstable_Grid2';
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
    //console.log("props",props)
    const classes = useStyle();
    const filterHandler = () => {
        //console.log("props",props);
        props.sendStartEndDate(graphFilter)
    }
    const graphFilterInitialState = {
        fromMonth: new Date(props.commonState.fromMonth),
        toMonth: new Date(props.commonState.toMonth),
        isLoader: false,
        isDisabled: false
    }
    const [graphFilter, setGraphFilter] = useState(graphFilterInitialState);
    const handleGraphFromDateChange = (date) => {
        setGraphFilter({ ...graphFilter, ['fromMonth']: date })
    };
    const handleGraphToDateChange = (date) => {
        setGraphFilter({ ...graphFilter, ['toMonth']: date })
    };
    useEffect(()=>{
        setGraphFilter(graphFilterInitialState);
    },[props])

    return (
        <>
            <Grid xs={12} sm={12} md={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} mt={2}>

                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid xs={12} sm={12} md={5}>
                                    <DatePicker
                                        margin="normal"
                                        variant="standard"
                                        openTo="year"
                                        views={["year", "month"]}
                                        label="From Month/Year"
                                        fullWidth
                                        value={graphFilter.fromMonth}
                                        onChange={handleGraphFromDateChange}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid xs={12} sm={12} md={10}>
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

    )
}
export default DateFieldFilter;