import React from "react";
import {DataGrid, ColDef} from "@material-ui/data-grid";

export interface IDataTable {
  columns: ColDef[];
  data: any[];
  loading: boolean;
}

export default function DataTable(props: IDataTable) {
  return (
    <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={props.data} columns={props.columns} loading={props.loading} />
    </div>
  );
}
