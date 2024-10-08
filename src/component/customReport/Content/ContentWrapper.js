import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const ContentWrapper = (props) => {
    const {id,name,description,link} = props.contents
    return (
        <Grid xs={12} sm={12} md={3}>
            <Card>
                <CardContent>
                    <Typography variant="h5" className="icon-service" component="div">
                        <SummarizeIcon className="icon-font" />
                    </Typography>
                    <Typography gutterBottom variant="h5" className="icon-heading" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" className="icon-heading-des" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={link} className="customButton"><RemoveRedEyeIcon /> View Report</Link>
                </CardActions>
            </Card>
        </Grid>
    )
}
export default ContentWrapper;