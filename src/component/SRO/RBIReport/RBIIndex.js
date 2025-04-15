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


function RBIIndex(props) {
  const [open, setOpen] = useState(false);


  var rbiHouseholdData = props.rbiHouseholdData;
  console.log("rbiHouseholdData", rbiHouseholdData);
  if (!rbiHouseholdData || !rbiHouseholdData.Indebtedness) return <p>No data available</p>;

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
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
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
              <Table striped bordered hover style={{ marginTop: "30px", textAlign: "left" }}>
                {(props.rbiIndexData)}
                {/* <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Parameters</th>
                  <th>Mar-22</th>
                  <th>Dec-22</th>
                  <th>Mar-23</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>  
                  <td style={{width:"60%"}}>Total Asset Size (Rs. Cr)</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>2</td> 
                  <td  style={{width:"60%"}}>On-balance sheet outstanding microfinance loans (Rs. Cr)</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>3</td> 
                  <td  style={{width:"60%"}}>Microfinance loans as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>4</td> 
                  <td  style={{width:"60%"}}>Average Ticket Size (Rs)</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>5</td> 
                  <td  style={{width:"60%"}}>Off-BS microfinance loan portfolio (Rs. Cr) </td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>6</td> 
                  <td  style={{width:"60%"}}>Business correspondent</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>7</td> 
                  <td  style={{width:"60%"}}>Securitised portfolio</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>8</td> 
                  <td  style={{width:"60%"}}>Assigned portfolio</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>9</td> 
                  <td  style={{width:"60%"}}>Gross NPA as a % of on-balance sheet microfinance loans</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>

                <tr>
                  <td>10</td>
                  <td  style={{width:"60%"}}>Net NPA as a % of on-balance sheet microfinance loans</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>

                <tr>
                  <td>11</td>  
                  <td  style={{width:"60%"}}>Promoter equity as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>

                <tr>
                  <td>12</td>  
                  <td  style={{width:"60%"}}>FDI equity as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>13</td>  
                  <td  style={{width:"60%"}}>Others equity as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>14</td>  
                  <td  style={{width:"60%"}}>AIFIs as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>15</td>  
                  <td  style={{width:"60%"}}>Banks as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>16</td>  
                  <td  style={{width:"60%"}}>Non Bank Entities as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>17</td>  
                  <td  style={{width:"60%"}}>External commercial borrowing as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>18</td>  
                  <td  style={{width:"60%"}}>Others as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>19</td>  
                  <td  style={{width:"60%"}}>Term loan as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>20</td>  
                  <td  style={{width:"60%"}}>Debentures as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>21</td>  
                  <td  style={{width:"60%"}}>Subordinated Debt as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>22</td>  
                  <td  style={{width:"60%"}}>Commercial Papers as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                  <td>23</td>  
                  <td  style={{width:"60%"}}>Any other (specify) as a % of total assets</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
              </tbody> */}
              </Table>
              <Table striped bordered hover style={{ marginTop: "30px", textAlign: "left" }}>
                {(props.rbiYOYData)}
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
                  <td  style={{width:"60%"}}>Net Profit (Rs. in crore) </td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>2</td> 
                  <td  style={{width:"60%"}}>Return on Assets (%)</td>
                  <td>00.0</td>
                  <td>00.0</td>
                  <td>00.0</td>
                </tr>
                <tr>
                <td>3</td> 
                  <td  style={{width:"60%"}}>Return on Equity (%)</td>
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

      <Grid xs={12} sm={12} md={12}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                style={{ textAlign: "left", fontSize: "18px", color: "#bd2f03" }}
                component="div"
              >
                Household Income and Indebtedness data </Typography>

              {/* <Table striped bordered hover style={{ marginTop: "30px", textAlign: "left" }}>
                
                <thead>
                  <tr>
                    
                    <th>Indebtedness</th>
                    <th>HH Income</th>
                    <th>{"< Rs. 50,000"}</th>
                    <th>{">=  Rs. 50,000 to < Rs. 1 lakh"} </th>
                    <th>{">= Rs. 1 lakh to < Rs. 1.5 lakh"}</th>
                    <th>{">= Rs. 1.5 lakh to < Rs. 2 lakh"}</th>
                    <th>{">= Rs. 2 lakh to < Rs. 2.5 lakh"}</th>
                    <th>{">= Rs. 2.5 lakh to <= Rs. 3 lakh"}</th>
                  </tr>

                </thead>
                <tbody>
                  <tr>
                   
                    <td>{"< 20%"}</td>
                    <td>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_LRs50000"]}</td>
                    <td>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs50000to1Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs1LaktoLRs1p5Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs1p5LaktoLRs2lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs2laktoLRs2p5Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs2p5LaktoLRs3Lak"]}</td>
                  </tr>
                  <tr>
                    <td>{">= 20% to < 30%"}</td>
                    <td>0%</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_LRs50000"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_GRs1LaktoLRs1p5Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_GRs1p5LaktoLRs2Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_GRs2LaktoLR2p5Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_GRs2p5LaktoLRs3Lak"]}</td>
                    
                  </tr>
                  <tr>
                    <td>{">= 30% to < 40%"}</td>
                    <td>0%</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_LRs50000"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_GRs1LaktoLRs1p5Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_GRs1p5LaktoLRs2Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_GRs2LaktoLRs2p5Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_GRs2p5LaktoLRs3Lak"]}</td>
                  </tr>
                  <tr>
                    <td>{">= 40% to <= 50%"}</td>
                    <td>0%</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_LR50000"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_GRs1LaktoLRs1p5Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_GRs1p5LaktoLRs2Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_GRs2LaktoLRs2p5Lak"]}</td>
                    <td>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_GRs2p5LaktoLRs3Lak"]}</td>
                  </tr>

                </tbody>
              </Table> */}

              <Table striped bordered hover style={{ marginTop: "30px", textAlign: "left" }}>

                <thead>
                  <tr>
                    <th rowSpan={2} style={{ textAlign: "center", verticalAlign: "middle" }}>Indebtedness</th>
                    <th colSpan={6} style={{textAlign:"center"}}>HH Income</th>

                  </tr>
                  <tr>
                    <th>{"< Rs. 50,000"}</th>
                    <th>{">=  Rs. 50,000 to < Rs. 1 lakh"} </th>
                    <th>{">= Rs. 1 lakh to < Rs. 1.5 lakh"}</th>
                    <th>{">= Rs. 1.5 lakh to < Rs. 2 lakh"}</th>
                    <th>{">= Rs. 2 lakh to < Rs. 2.5 lakh"}</th>
                    <th>{">= Rs. 2.5 lakh to <= Rs. 3 lakh"}</th>
                  </tr>

                </thead>
                <tbody>
                  <tr>
                    <td>{"< 20%"}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_LRs50000"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs50000to1Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs1LaktoLRs1p5Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs1p5LaktoLRs2lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs2laktoLRs2p5Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness["< 20%"]["L20P_GRs2p5LaktoLRs3Lak"]}</td>
                  </tr>
                  <tr>
                    <td>{">= 20% to < 30%"}</td>
                    <td style={{ textAlign: "right" }}>0%</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_LRs50000"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_GRs1LaktoLRs1p5Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_GRs1p5LaktoLRs2Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_GRs2LaktoLR2p5Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 20% to < 30%"]["G20ptoL30p_GRs2p5LaktoLRs3Lak"]}</td>

                  </tr>
                  <tr>
                    <td>{">= 30% to < 40%"}</td>
                    <td style={{ textAlign: "right" }}>0%</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_LRs50000"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_GRs1LaktoLRs1p5Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_GRs1p5LaktoLRs2Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_GRs2LaktoLRs2p5Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 30% to < 40%"]["G30ptoL40p_GRs2p5LaktoLRs3Lak"]}</td>
                  </tr>
                  <tr>
                    <td>{">= 40% to <= 50%"}</td>
                    <td style={{ textAlign: "right" }}>0%</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_LR50000"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_GRs1LaktoLRs1p5Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_GRs1p5LaktoLRs2Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_GRs2LaktoLRs2p5Lak"]}</td>
                    <td style={{ textAlign: "right" }}>{rbiHouseholdData.Indebtedness[">= 40% to <= 50%"]["G40ptoL50p_GRs2p5LaktoLRs3Lak"]}</td>
                  </tr>

                </tbody>
              </Table>


            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default RBIIndex;
