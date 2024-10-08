import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { purple } from '@mui/material/colors';
import './NoPermission.css'
export default function NoPermission() {
  return (
<Box className="nopermission">
<Grid container spacing={2} mt={2}>
<Grid xs={12} sm={12} md={12}>   
<Typography variant="h1">403 - ACCESS DENIED</Typography> 
<Divider style={{margin:"auto",width:"50%"}} />
<Typography variant="h2">You are not authorized.</Typography> 
<Typography variant="h3">🚫🚫🚫🚫</Typography> 
<Typography variant="h6">You tried to access a page you did not have prior authorization for.</Typography> 
</Grid>
</Grid>
</Box>
  );
}