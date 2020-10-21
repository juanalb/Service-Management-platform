import React, { useState } from "react";
import {DataGrid, ColDef, ValueGetterParams, CellParams} from "@material-ui/data-grid";
import axios from "axios";
import {incidentColumns} from "./DataTable-constants";

export interface IDataTable {
  columns: ColDef[];
  data: any[];
  loading: boolean;
}

export default function DataTable(props: IDataTable) {
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
        <DataGrid rows={props.data} columns={props.columns} loading={props.loading} />
    </div>
  );
}
