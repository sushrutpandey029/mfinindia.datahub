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
import PortfolioQualityRBILine from './PortfolioQualityRBILine';
import CostBorrowingInterestRatesRBI from './CostBorrowingInterestRatesRBI';
import { VerticalAlignCenter } from "@material-ui/icons";

function RBIOthersIndex(props) {
   const [open, setOpen] = useState(false);
   console.log("pqindex",props.rbiOthersPQ);
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
              Quarterly Data reporting for RBI <span style={{ float: "right", marginRight: "10px" }}>
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
                            buttonText="Excel Format"/>
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
              {(props.rbiOthersData)}
              {/* <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Parameters ((YOY change))</th>
                  <th>Mar-22</th>
                  <th>Dec-22</th>
                  <th>Mar-23</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>  
                  <td style={{width:"60%"}}>Income earned from on-balance sheet microfinance loan portfolio as a % of total income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>2</td> 
                  <td  style={{width:"60%"}}>Income earned from off-balance sheet microfinance loan portfolio as a % of total income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>3</td> 
                  <td  style={{width:"60%"}}>Income earned from non-credit financial products as a % of total income</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>4</td> 
                  <td  style={{width:"60%"}}>Income earned from non-credit non-financial products as a % of total income </td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
               
              </tbody> */}
            </Table>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>

      <Grid xs={6} sm={6} md={6}>          
      <Card style={{ paddingBottom: "20px",marginBottom:"20px" }}>
        <CardActionArea>
          <CardContent>
           <CostBorrowingInterestRatesRBI apiData={props.rbiOthersCOB} />
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>

      <Grid xs={6} sm={6} md={6}>          
      <Card style={{ paddingBottom: "20px",marginBottom:"20px" }}>
        <CardActionArea>
          <CardContent>
          <PortfolioQualityRBILine data={props.rbiOthersPQ}/>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>

     
    </>
  );
}

export default RBIOthersIndex;
