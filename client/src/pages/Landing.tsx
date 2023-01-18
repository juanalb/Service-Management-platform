import React, {useContext} from "react";
import {Box, Tab, Tabs as MUITabs} from "@material-ui/core";
import Dashboard from "../components/tabpanels/Dashboard";
import IncidentManagement from "../components/tabpanels/IncidentManagement";
import UserManagement from "../components/tabpanels/UserManagement";
import styled from "styled-components";
import {SeverityTypes, Snackbar} from "../components/snackbar/Snackbar";
import {useLocation} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

// TODO: Hmm I want to try something, make this landing page load either <Login/> or <Dashboard/>
//       and show a sexy "in-between" screen for when the app is deciding where to route the user to.
interface ILanding {
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
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
    const { role } = useContext(AuthContext);
    const { state } = useLocation() as { state: { tab: number, fromOtherPage: boolean, message: string, severity: SeverityTypes }};
    const [tab, setTab] = React.useState(state ? state.tab : 0 );
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: "",
        severity: SeverityTypes.INFO,
        autoHideDuration: 3000
    });


    React.useEffect(() => {
        handleSnackbarMessage()
    }, [state])

    function handleSnackbarMessage(): void{
        if (state) {
            setSnackbar({
                ...snackbar,
                open: state.fromOtherPage,
                message: state.message,
                severity: state.severity
            })

            if(state.fromOtherPage){
                setTimeout(() =>
                    setSnackbar(prevState => {
                        return {
                            ...prevState,
                            open: false
                        }
                    }), 3010)
                window.history.replaceState({}, document.title)
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    return (
        <>
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="Incident Management"/>
                { role === 'Service Desk Employee' && <Tab label="Dashboard"/> }
                { role === 'Service Desk Employee' && <Tab label="User Management"/> }
            </Tabs>
            <TabPanel value={tab} index={0}>
                <IncidentManagement/>
            </TabPanel>

            <TabPanel value={tab} index={1}>
                <Dashboard/>
            </TabPanel>

            <TabPanel value={tab} index={2}>
                <UserManagement/>
            </TabPanel>
            <Snackbar {...snackbar} />
        </>
    );
}
