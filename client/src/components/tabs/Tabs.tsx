import React, { useState } from "react";
import {
  Container,
  Tabs as MUITabs,
  Tab,
  Typography,
  Button,
  Box,
  Grid
} from "@material-ui/core";
import DataTable from "../datatable/DataTable";
import styled from "styled-components";
import { incidentColumns, userColumns } from "../datatable/DataTable-constants";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { CircularCard } from "../circularprogress/CircularProgress";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Tabs = styled(MUITabs)`
  [class*="flexContainer"] {
    justify-content: center;
  }
`;

export default function SimpleTabs() {
  const [auth, setAuth] = useState(null);
  const [users, setUsers] = useState([]);
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

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/all`)
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Dashboard" />
        <Tab label="Incident Management" />
        <Tab label="User Management" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CircularCard
                title="Unresolved incidents"
                subtitle="All tickets currently open"
                total={0}
                value={0}
                unResolved={0}
              />
            </Grid>
            <Grid item xs={6}>
              <CircularCard
                title="Incidents past deadline"
                subtitle="These tickets need your immediate attention"
                total={0}
                value={0}
              />
            </Grid>
          </Grid>
        </Container>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Container maxWidth="lg">
          <Link to="/create-incident">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              Create Incident
            </Button>
          </Link>
          <DataTable
            columns={incidentColumns}
            data={incidents}
            loading={incidents.length <= 0}
          />
        </Container>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Container maxWidth="lg">
          <Link to="/create-user">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              Create User
            </Button>
          </Link>
          <DataTable
            columns={userColumns}
            data={users}
            loading={users.length <= 0}
          />
        </Container>
      </TabPanel>
    </>
  );
}
