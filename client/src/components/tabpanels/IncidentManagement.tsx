import React, { useState } from "react";
import {
  Container,
  Button,
} from "@material-ui/core";
import DataTable from "../datatable/DataTable";
import { incidentColumns } from "../datatable/DataTable-constants";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: any;
//   value: any;
// }

export default function IncidentManagement() {
  const [incidents, setIncidents] = useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/incident/all`)
      .then(res => {
        setIncidents(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Link to="/create-incident">
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
          Create Incident
        </Button>
      </Link>
      <DataTable
        columns={incidentColumns}
        data={incidents}
        loading={incidents.length <= 0}
      />
    </Container>
  );
}
