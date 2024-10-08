import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import {
    Typography,
} from "@mui/material";
const Breadcrumb = (props) => {
    return (
        <>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        to="/"
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Home
                    </Link>
                    {
                        props.second && props.second===true?(<Link
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                           to={props.secondUrl}
                        >
                            <props.icon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {props.secondTitle}
                        </Link>):''
                    }
                    
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <props.icon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {props.title}
                    </Typography>
                </Breadcrumbs>
            </div>
        </>
    )
}
export default Breadcrumb;