import * as React from "react";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3"
import jsPDF from "jspdf";
import "jspdf-autotable"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Dropdown, DropdownMenuItem } from '../../Mudra/dropdown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function CBMonthlySbmsnCICTable(props) {
  const [open, setOpen] = useState(false);
  const downloadPdfMudraBankWise = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls"
    });
    pdf.save("mudra-bank-wise")
  }

  return (
    <>

     <Grid xs={12} sm={12} md={12}>          
      <Card style={{ paddingBottom: "20px",marginBottom:"20px" }}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              style={{ textAlign: "left", fontSize: "18px", color: "#bd2f03" }}
              component="div"
            >
              QAR <span style={{ float: "right", marginRight: "10px" }}>
                  <Dropdown
                    keepOpen
                    open={open}
                    trigger={<Button style={{ borderBottom: "2px solid", color: "#000000" }} endIcon={<ArrowDropDownIcon />}>
                      Download
                    </Button>}
                    menu={[
                      <DropdownMenuItem>
                        <Button style={{ color: "#000000" }} endIcon={<FileDownloadIcon />}>
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="htmlToExcel"
                            table="table-to-xls"
                            filename="custom-report-export-excel"
                            filetype="xls"
                            sheet="Mudra Bank Wise Report"
                            buttonText="Excel Format" />
                        </Button>
                      </DropdownMenuItem>,
                      <DropdownMenuItem>
                        <Button onClick={downloadPdfMudraBankWise} style={{ color: "#000000" }} endIcon={<PictureAsPdfIcon />}>
                          PDF Format
                        </Button>
                      </DropdownMenuItem>,
                    ]}
                  />
                  </span>
            </Typography>
            <Table striped bordered hover style={{marginTop:"30px",textAlign:"left"}}>
            {(props.QARParametersRecords)} 
                {/*  <thead><tr>
                  <th>Parameters</th>
                  <th>April 2018</th>
                  <th>March 2018</th>
                  <th>Feb 2018</th>
                </tr>
                <tr>
                  <th>QAR Requirements</th>
                  <th>Valume | Value</th>
                  <th>Valume | Value</th>
                  <th>Valume | Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{width:"60%"}}>Date of monthly submission to CICs</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td  style={{width:"60%"}}>If all weekly files were submitted to CICs (Yes/No)</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td  style={{width:"60%"}}>How many unique daily files were submitted in a month</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td  style={{width:"60%"}}>Number of active accounts submitted in a monthly file to CICs (on balance sheet)</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td  style={{width:"60%"}}>Loan accounts disbursed during the period (on balance sheet) </td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td  style={{width:"60%"}}>Loans disbursed crossing the norm of annual household income of ₹3 lacs</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td  style={{width:"60%"}}>Loans disbursed meeting the norm of 3L HHI and crossing 50% as the ratio of monthly loan repayment obligations to monthly income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td  style={{width:"60%"}}>Loans disbursed meeting the norm of 3L HHI and crossing 51-60% as the ratio of monthly loan repayment obligations to monthly income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td  style={{width:"60%"}}>Loans disbursed meeting the norm of 3L HHI and crossing 61-70% as the ratio of monthly loan repayment obligations to monthly income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>

                <tr>
                  <td  style={{width:"60%"}}>Loans disbursed meeting the norm of 3L HHI and crossing 71-80% as the ratio of monthly loan repayment obligations to monthly income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>

                <tr>
                  <td  style={{width:"60%"}}>Loans disbursed meeting the norm of 3L HHI and crossing 81-90% as the ratio of monthly loan repayment obligations to monthly income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>

                <tr>
                  <td  style={{width:"60%"}}>Loans disbursed meeting the norm of 3L HHI and crossing 91-100% as the ratio of monthly loan repayment obligations to monthly income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr> </tbody> */}
                
              
            </Table>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
    </>
  );
}

export default CBMonthlySbmsnCICTable;
