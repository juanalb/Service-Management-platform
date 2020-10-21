import React, { useState } from "react";
import { AppBar as MUIAppBar, Toolbar as MUIToolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Toolbar = styled(MUIToolbar)`
  justify-content: space-between;
`;

export default function AppBar() {
    const [auth, setAuth] = useState(null);

    return (
        <MUIAppBar position="static">
            <Toolbar>
                <Typography variant="h6">GG: Service Desk Platform</Typography>
                {auth === null ? (
                    <Button color="inherit">Login</Button>
                ) : (
                    <Button color="inherit">Logout</Button>
                )}
            </Toolbar>
        </MUIAppBar>
    );
}
