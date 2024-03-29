import React, {useContext} from "react";
import {AppBar as MUIAppBar, Toolbar as MUIToolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import {userAPI} from "../../api/UserAPI";

const Toolbar = styled(MUIToolbar)`
  justify-content: space-between;
`;

export default function AppBar() {
    const authContext = useContext(AuthContext);
    const history = useHistory();

    function handleLogoutClick() {
        userAPI.logout()
        authContext.setContextLogout();
        history.push("/login")
    }

    return (
        <MUIAppBar position="static">
            <Toolbar>
                <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                    <Typography variant="h6">GG: Service Desk Platform</Typography>
                </Link>
                {authContext.auth ? (
                    <>
                        <Typography variant={"caption"}>Role: {authContext.role}</Typography>
                        <Button color="inherit" onClick={() => handleLogoutClick()}>Logout</Button>
                    </>
                ) : (
                    <Button color="inherit">Login</Button>
                )}
            </Toolbar>
        </MUIAppBar>
    );
}
