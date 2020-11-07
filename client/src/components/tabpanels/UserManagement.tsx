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

export default function UserManagement() {
  const [users, setUsers] = useState([]);

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

  return (
    <Container maxWidth="lg">
      <Link to="/create-user">
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
          Create User
        </Button>
      </Link>
      <DataTable
        columns={userColumns}
        data={users}
        loading={users.length <= 0}
      />
    </Container>
  );
}
