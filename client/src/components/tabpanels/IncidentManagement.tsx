import React, {useContext, useState} from "react";
import {
    Container,
    Button, TextField,
} from "@material-ui/core";
import DataTable from "../datatable/DataTable";
import { incidentColumns } from "../datatable/DataTable-constants";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import {incidentAPI} from "../../api/IncidentAPI";
import {AuthContext} from "../../context/AuthContext";
import {IUser} from "../../../../server/lib/modules/user/model";
import {IIncident, IncidentResponse} from "../../../../server/lib/modules/incident/model";


export default function IncidentManagement() {
  const [incidents, setIncidents] = useState([]);
  const [shownIncidents, setShownIncidents] = useState([]);
  const [searchPrompt, setSearchPrompt] = useState<string>();
  const { role, userId } = useContext(AuthContext);


  React.useEffect(() => {
      if(role === 'Service Desk Employee') {
          incidentAPI.getAllIncidents().then(res => {
              setIncidents(res.data.data)
              setShownIncidents(res.data.data)
          }).catch(e => {
              console.log(e)
          })
      } else if(role === 'Regular Employee') {
          incidentAPI.getAllIncidentsByUserId(userId).then(res => {
              setIncidents(res.data.data)
              setShownIncidents(res.data.data)
          }).catch(e => {
              console.log(e)
          })
      }
  }, []);

    React.useEffect(() => {
        if(searchPrompt === ''){
            setShownIncidents(incidents);
            return;
        }

        const filteredIncidents = filterByEmail();
        setShownIncidents(filteredIncidents);
    }, [searchPrompt]);

    function filterByEmail() {
        if(!searchPrompt){
            return [];
        }

        return incidents.filter((incident: IncidentResponse) => {
            const searchString = searchPrompt.toLowerCase().replace(/\s+/g, ''); // removes all whitespace
            const email = incident.reportedBy.email.toLowerCase();

            return email.includes(searchString);
        })
    }

    const handleSearchTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPrompt(event.target.value);
    };

  return (
    <Container maxWidth="lg">
      <Link to="/create-incident">
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
          Create Incident
        </Button>
      </Link>
        { role === 'Service Desk Employee' &&
            <TextField id="user-search" label="Search user by name or mail" onChange={handleSearchTextFieldChange} />
        }
      <DataTable
        columns={incidentColumns}
        data={shownIncidents}
        loading={incidents.length <= 0}
      />
    </Container>
  );
}
