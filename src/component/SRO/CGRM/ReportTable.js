import React from "react";

const ReportTable = ({ ReportData }) => {
  const data = ReportData;

  if (!data) return <p>Loading...</p>;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Indicators</th>
            <th scope="col">Satin</th>
            <th scope="col">MFIN - CGRM aggregate data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unique Calls received during the quarter</td>
            <td style={{ textAlign: "right" }}>{data.member_data.unique_calls || 0}</td>
            <td style={{ textAlign: "right" }}>{data.aggregate_data.unique_calls || 0}</td>
          </tr>
          <tr>
            <td>Complaints received during the quarter</td>
            <td style={{ textAlign: "right" }}>{data.member_data.complaints_received || 0}</td>
            <td style={{ textAlign: "right" }}>{data.aggregate_data.complaints_received || 0}</td>
          </tr>
          <tr>
            <td>Average TAT of complaints resolved during the quarter (days)</td>
            <td style={{ textAlign: "right" }}>{data.member_data.average_tat.toFixed(2) || 0}</td>
            <td style={{ textAlign: "right" }}>{data.aggregate_data.average_tat.toFixed(2) || 0}</td>
          </tr>
          <tr>
            <td>Pending Complaints as on end of Q4 FY 20-21</td>
            <td style={{ textAlign: "right" }}>{data.member_data.pending_complaints || 0}</td>
            <td style={{ textAlign: "right" }}>{data.aggregate_data.pending_complaints || 0}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;