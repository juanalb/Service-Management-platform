import React, { useState } from "react";
import {DataGrid, ColDef, ValueGetterParams, CellParams} from "@material-ui/data-grid";
import axios from "axios";

const columns: ColDef[] = [
  { field: "_id", hide: true },
  { field: "subject", headerName: "Subject", width: 180},
  { field: "type", headerName: "Incident Type", width: 180},
  { field: "reportDate", headerName: "Report Date", width: 180},
  { field: "deadline", headerName: "Due Date"},
  { field: "priority", headerName: "Priority"},
  // { field: "isResolved", headerName: "Resolved", valueFormatter: ((params: CellParams) => params.value ? params.value.toString() : "unknown")}
  { field: "isResolved", headerName: "Resolved"}
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];

export default function DataTable() {
  const [state, setState] = useState({ data: [] });

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/incident/all`)
      .then((res) => {
        setState({ data: res.data.data });
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  
  return (
    <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={state.data} columns={columns} pageSize={5} loading={state.data.length <= 0} />
    </div>
  );
}
