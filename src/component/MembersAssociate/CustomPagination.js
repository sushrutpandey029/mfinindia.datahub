import { Grid, Select } from "@mui/material";
import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const CustomPagination = ({
  dataPerPage,
  totalData,
  paginate,
  currentPage,
  changeDataPerPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  let start = 1,
    end = pageNumbers.length;
  if (currentPage - 2 > 1) {
    start = currentPage - 2;
  }
  if (currentPage + 2 < pageNumbers.length) {
    end = currentPage + 2;
  }
  return (
    <>

      <Grid container>
      <Grid xl={10}>
      <Pagination>
        <Pagination.First
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {start !== 1 && <Pagination.Ellipsis />}
        {pageNumbers.slice(start - 1, end).map((number) => (
          <Pagination.Item
            key={number}
            onClick={() => paginate(number)}
            active={currentPage === number}
          >
            {number}
          </Pagination.Item>
        ))}
        {end !== pageNumbers.length && <Pagination.Ellipsis />}
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        />
        <Pagination.Last
          onClick={() => paginate(pageNumbers.length)}
          disabled={currentPage === pageNumbers.length}
        />
      </Pagination>
      </Grid>
        <Grid xl={2}>
          <FormControl>
            <Select
            style={{paddingBottom: "10px !important", paddingTop:"10px !important"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={changeDataPerPage}
              value={dataPerPage}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>

  );
};

export default CustomPagination;