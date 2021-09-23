import React, {useCallback, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import AppBar from "./components/appbar/AppBar";
import {CreateUser} from "./pages/CreateUser";
import {CreateIncident} from "./pages/CreateIncident";
import {Login} from "./pages/Login";
import {Landing} from "./pages/Landing";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

export function App() {
    const userLocalStorageDefault = '{"isAuth":false, "id":null}';
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user") || userLocalStorageDefault).isAuth);
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user") || userLocalStorageDefault).id);

    const setContextLogin = useCallback((userId, token, expirationDate) => {
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: userId,
                isAuth: true,
                expiration: tokenExpirationDate.toISOString()
            })
        );

        setAuth(true);
        setUserId(userId);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.common['x-access-token'] = `${token}`;
    }, []);

    const setContextLogout = useCallback(() => {
        setAuth(false)
        setUserId(null);
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = `Bearer `;
        axios.defaults.headers.common['x-access-token'] = ``;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth: auth,
                userId: userId,
                setContextLogin: setContextLogin,
                setContextLogout: setContextLogout
            }}
        >
            <Router>
                <AppBar/>
                <Switch>
                    <Route path="/login">
                        {auth ? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route path="/">
                        {auth ? <Landing /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/create-user">
                        {auth ? <CreateUser/> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/create-incident">
                        {auth ? <CreateIncident/> : <Redirect to="/login" />}
                    </Route>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}
