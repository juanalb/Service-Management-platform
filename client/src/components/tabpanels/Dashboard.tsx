import React from "react";
import {
  Container,
  Grid
} from "@material-ui/core";
import { CircularCard } from "../circularprogress/CircularProgress";
import axios from "axios";
import { incidentAPI } from "../../api/IncidentAPI";

export default function Dashboard() {
    const [progress, setProgress] = React.useState(0);
    const [unResolved, setUnResolved] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [incidentsPastDeadline, setIncidentsPastDeadline] = React.useState(0);

    React.useEffect(() => {
        axios.all([incidentAPI.getAllIncidents(), incidentAPI.getAllUnsresolvedIncidents(), incidentAPI.getIncidentsPastDeadline()]).then(
            axios.spread(function(incidentResponse, unResolvedResponse, pastDeadlineResponse) {
                setTotal(incidentResponse.data.data.length);
                setUnResolved(unResolvedResponse.data.data.length);
                setIncidentsPastDeadline(pastDeadlineResponse.data.data.length);
            })
        )
    }, []);

    React.useEffect(() => {
        const treshold = (unResolved / total) * 100;
        const timer = setInterval(() => {
            setProgress(prevProgress =>
                prevProgress >= treshold ? treshold : prevProgress + 10
            );
        }, 10);
        return () => {
            clearInterval(timer);
        };
    }, [total, unResolved])

  return (
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <CircularCard
              title="Unresolved incidents"
              subtitle="All tickets currently open"
              total={total}
              value={progress}
              unResolved={unResolved}
            />
          </Grid>
          <Grid item xs={6}>
            <CircularCard
              title="Incidents past deadline"
              subtitle="These tickets need your immediate attention"
              total={incidentsPastDeadline}
              value={100}
            />
          </Grid>
        </Grid>
      </Container>
  );
}
