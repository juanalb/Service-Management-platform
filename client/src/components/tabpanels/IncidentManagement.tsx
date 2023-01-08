import React, {useContext, useState} from "react";
import {
  Container,
  Button,
} from "@material-ui/core";
import DataTable from "../datatable/DataTable";
import { incidentColumns } from "../datatable/DataTable-constants";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import {incidentAPI} from "../../api/IncidentAPI";
import {AuthContext} from "../../context/AuthContext";


export default function IncidentManagement() {
  const [incidents, setIncidents] = useState([]);
  const { role, userId } = useContext(AuthContext);

    React.useEffect(() => {
      if(role === 'Service Desk Employee') {
          incidentAPI.getAllIncidents().then(res => {
              setIncidents(res.data.data)
          }).catch(e => {
              console.log(e)
          })
      } else if(role === 'Regular employee'){
          incidentAPI.getAllIncidentsByUserId(userId).then(res => {
              setIncidents(res.data.data)
          }).catch(e => {
              console.log(e)
          })
      }

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
