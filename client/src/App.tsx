import React, {useCallback, useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import AppBar from "./components/appbar/AppBar";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import { Routes } from "./Routes";
import { userAPI } from "./api/UserAPI";

export function App() {
    const [auth, setAuth] = useState(false);
    const [userId, setUserId] = useState<string>("");
    const [role, setRole] = useState<string>("");

    React.useEffect(() => {
        userAPI.isAuthenticated().then((res) => {
            setAuth(res.data.isAuth)
            setUserId(res.data.userId)
            setRole(res.data.role)
        })
    }, []);

    const setContextLogin = useCallback((userId, token, role, expirationDate) => {
        sessionStorage.setItem(
            'user',
            JSON.stringify({
                id: userId,
                isAuth: true,
                role,
            })
        );

        setAuth(true);
        setUserId(userId);
        setRole(role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.common['x-access-token'] = `${token}`;
    }, []);

    const setContextLogout = useCallback(() => {
        setAuth(false)
        setUserId("");
        setRole("");
        sessionStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = `Bearer `;
        axios.defaults.headers.common['x-access-token'] = ``;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth: auth,
                userId: userId,
                role: role,
                setContextLogin: setContextLogin,
                setContextLogout: setContextLogout
            }}
        >
            <Router>
                <AppBar />
                <Routes />
            </Router>
        </AuthContext.Provider>
    );
}
