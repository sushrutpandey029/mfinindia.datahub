import React from "react";
import Table from 'react-bootstrap/Table'
import parse from 'html-react-parser'
import ReactHTMLTableToExcel from "react-html-table-to-excel-3"
import jsPDF from "jspdf";
import "jspdf-autotable"
const downloadPdfCustomReport = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      html: "#table-to-xls"
    });
    pdf.save("customreportexcelpdf")
  }

const RowWiseTimelineTable = (props) => {
    return (
        <Table striped bordered hover id={"table-to-xls"}>
            {
                props.checkRecord>1?parse(props.cbColumnWiseData):<tbody>No Record Found</tbody>
            }
        </Table>
    )
}
export default RowWiseTimelineTable;