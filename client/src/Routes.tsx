import React, {ReactNode, useContext} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {CreateUser} from "./pages/CreateUser";
import {CreateIncident} from "./pages/CreateIncident";
import {Login} from "./pages/Login";
import {Landing} from "./pages/Landing";
import {AuthContext} from "./context/AuthContext";
import {PasswordResetCreatePassword, PasswordResetEnterMail} from "./components/forms/PasswordResetForms";
import {LoginForm} from "./components/forms/LoginForm";

export function Routes() {
    const authContext = useContext(AuthContext);

    return (
        <>
            <Switch>
                <Route path="/login">
                    {/* TODO: refactor so that the Login wrapper is inside the LoginForm, PasswordResetEnterMail and PasswordResetCreatePassword*/}
                    {authContext.auth ? <Redirect to="/"/> :
                        <Login title={"Welcome to the Service Desk Platform by the Garden Group"}><LoginForm/></Login>}
                </Route>

                <Route exact path="/password-reset">
                    <Login title={"Forgot your password? No worries, let's find your account"}><PasswordResetEnterMail/></Login>
                </Route>

                <Route exact path="/password-reset/:userId/:token">
                    <Login title={"Create a new password"}>
                        <PasswordResetCreatePassword/>
                    </Login>
                </Route>

                <ProtectedRoute path={"/create-incident"} component={<CreateIncident/>} grantedRoles={["Service Desk Employee", "Regular Employee"]}/>
                <ProtectedRoute path={"/create-user"} component={<CreateUser/>} grantedRoles={["Service Desk Employee"]}/>
                {/* TODO: Refactor to /dashboard */}
                <ProtectedRoute path={"/"} component={<Landing/>} grantedRoles={["Service Desk Employee", "Regular Employee"]}/>
            </Switch>
        </>
    );
}

export function ProtectedRoute({path, component, grantedRoles}: { path: string, component: ReactNode, grantedRoles: string[] }) {
    const authContext = useContext(AuthContext);

    if(!authContext.auth){
        return <Redirect to="/login"/>;
    } else {
        return (
            <Route path={path}>
                {grantedRoles.includes(authContext.role) ? component : <div>No access with role: ${authContext.role}</div>}
            </Route>
        );
    }
}
