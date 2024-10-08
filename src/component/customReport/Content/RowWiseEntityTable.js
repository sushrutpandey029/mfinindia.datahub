import React, { useEffect, useState } from "react";
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

const RowWiseEntityTable = (props) => {
    return (
        <Table striped bordered hover id={"table-to-xls"}>
            {
                props.checkRecord > 1 ?<><thead>
                <tr>
                    {
                        props.cbRowWiseColumn.map((v) => {
                            return (<th>{v}</th>)
                        })
                    }
                </tr>
            </thead>
            <tbody>
                { parse(props.cbRowWiseData) }
            </tbody></> : <tbody>No Record Found</tbody>
            }

        </Table>
    )
}
export default RowWiseEntityTable;