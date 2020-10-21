import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import DataTable from "./components/datatable/DataTable";
import SimpleTabs from "./components/appbar/AppBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CreateUser } from "./pages/CreateUser";
import { CreateIncident } from "./pages/CreateIncident";
import { Login } from "./pages/Login";
import { Landing } from "./pages/Landing";
import AppBar from "./components/appbar/AppBar";

ReactDOM.render(
  <React.StrictMode>
    <AppBar />
    <Router>
      <Switch>
        <Route path="/create-user">
          <CreateUser />
        </Route>
        <Route path="/create-incident">
          <CreateIncident />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
