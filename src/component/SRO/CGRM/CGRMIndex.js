import * as React from "react";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Dropdown, DropdownMenuItem } from "../../Mudra/dropdown";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NatureofCall from "./NatureofCall";
import ProductWiseCall from "./ProductWiseCall";
import CategoryWiseQuery from "./CategoryWiseQuery";
import CategoryWiseComplaint from "./CategoryWiseComplaint";
import CategoryWiseStatus from "./CategoryWiseStatus";
import ResulationTAT from "./ResulationTAT";
import ReportTable from "./ReportTable";

function RBIIndex() {
  const [open, setOpen] = useState(false);
  const downloadPdfMudraBankWise = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls",
    });
    pdf.save("mudra-bank-wise");
  };

  return (
    <>
      <Grid xs={6} sm={6} md={6}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <ReportTable />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid xs={6} sm={6} md={6}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <NatureofCall />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid xs={6} sm={6} md={6}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <ProductWiseCall />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid xs={6} sm={6} md={6}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <CategoryWiseQuery />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid xs={6} sm={6} md={6}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <CategoryWiseComplaint />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid xs={6} sm={6} md={6}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <CategoryWiseStatus />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid xs={6} sm={6} md={6}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <ResulationTAT />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default RBIIndex;
