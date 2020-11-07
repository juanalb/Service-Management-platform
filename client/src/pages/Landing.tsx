import React from "react";
import {Box, Tab, Tabs as MUITabs, Typography} from "@material-ui/core";
import Dashboard from "../components/tabpanels/Dashboard";
import IncidentManagement from "../components/tabpanels/IncidentManagement";
import UserManagement from "../components/tabpanels/UserManagement";
import styled from "styled-components";

interface ILanding {}

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

export function Landing(props: ILanding) {
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
        <Dashboard />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <IncidentManagement />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <UserManagement />
      </TabPanel>
    </>
  );
}
