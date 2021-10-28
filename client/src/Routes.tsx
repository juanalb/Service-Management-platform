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

                <ProtectedRoute path={"/create-incident"} component={<CreateIncident/>}/>
                <ProtectedRoute path={"/create-user"} component={<CreateUser/>}/>
                {/* TODO: Refactor to /dashboard */}
                <ProtectedRoute path={"/"} component={<Landing/>}/>
            </Switch>
        </>
    );
}

export function ProtectedRoute({path, component}: { path: string, component: ReactNode }) {
    const authContext = useContext(AuthContext);

    return (
        <Route path={path}>
            {authContext.auth ? component : <Redirect to="/login"/>}
        </Route>
    );
}
