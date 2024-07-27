import React from "react";
import { Table } from "react-bootstrap";

function ComparisonTable({ tv1, tv2 }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Feature</th>
          <th>
            {tv1.brand} {tv1.model}
          </th>
          <th>
            {tv2.brand} {tv2.model}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Size</td>
          <td>{tv1.size}"</td>
          <td>{tv2.size}"</td>
        </tr>
        <tr>
          <td>Resolution</td>
          <td>{tv1.resolution}</td>
          <td>{tv2.resolution}</td>
        </tr>
        <tr>
          <td>HDR</td>
          <td>{tv1.hdr}</td>
          <td>{tv2.hdr}</td>
        </tr>
        {/* Add more rows for other features */}
      </tbody>
    </Table>
  );
}

export default ComparisonTable;
