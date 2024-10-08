import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

function Highlights(props) {
    return (
      <Table striped bordered hover>
       {props.overViewHighLights}
      </Table>
    );
  }
  
  export default Highlights;
