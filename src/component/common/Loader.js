import React from "react";
import { CircularProgress } from '@mui/material';
import { createTheme, } from '@mui/material/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
const theme = createTheme();
const styles = theme => ({
    circularProgress: {
        marginLeft: 0,
        marginRight: theme.spacing.unit,
    },

});
const useStyle = makeStyles()
const Loader = (props) => {
    const classes = useStyle();
    const { loader,size } = props;
    return (
        <>
            {
                loader === true ? <CircularProgress false style={{ "color": "#fff !important", marginLeft: "10px" }} className={classes.circularProgress} size={size} /> : ''
            }
        </>
    );
}

export default Loader;