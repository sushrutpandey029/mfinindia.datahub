import * as React from "react";
import {
  Card,
  Button,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
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
function CBMonthlySbmsnTable(props) {
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
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                style={{ textAlign: "left", fontSize: "18px", color: "#bd2f03" }}
                component="div"
              >
                Monthly Submission - Member Level <span style={{ float: "right", marginRight: "10px" }}>
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
              <Table striped bordered hover style={{ marginTop: "30px" }}>
                {(props.memberRecords)}
              </Table>

            </CardContent>
          </CardActionArea>
        </Card>
        <Typography
          gutterBottom
          variant="h5"
          style={{ textAlign: "left", fontSize: "16px", color: "#000" }}
          component="div"
        >
          <strong>Note: </strong>MFIN directs its members to submit/update data to the credit bureaus, latest by 07th of the subsequent month with submission of atleast 20 daily files in a month.


        </Typography>
      </Grid>

      <Grid xs={12} sm={12} md={12}>
        <Card style={{ paddingBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                style={{ textAlign: "left", fontSize: "18px", color: "#bd2f03" }}
                component="div"
              >
                Monthly Submission - Industry Level

                <span style={{ float: "right", marginRight: "10px" }}>
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
              <Table striped bordered hover style={{ marginTop: "30px" }}>
                {(props.industryRecords)}
              </Table>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default CBMonthlySbmsnTable;
