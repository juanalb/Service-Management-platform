import React, {ReactNode, useContext } from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {CreateUser} from "./pages/CreateUser";
import {CreateIncident} from "./pages/CreateIncident";
import {Login} from "./pages/Login";
import {Landing} from "./pages/Landing";
import { AuthContext } from "./context/AuthContext";

export function Routes() {
    const authContext = useContext(AuthContext);

    return (
            <>
                <Switch>
                    <Route path="/login">
                        {authContext.auth ? <Redirect to="/" /> : <Login />}
                    </Route>
                    {/* Refactor to /dashboard */}
                    <ProtectedRoute path={"/"} component={<Landing/>} />
                    <ProtectedRoute path={"/create-incident"} component={<CreateIncident/>} />
                    <ProtectedRoute path={"/create-user"} component={<CreateUser/>} />
                </Switch>
            </>
    );
}

export function ProtectedRoute({path, component}: {path: string, component: ReactNode}){
    const authContext = useContext(AuthContext);

    return (
        <Route path={path}>
            {authContext.auth ? component : <Redirect to="/login" />}
        </Route>
    );
}
