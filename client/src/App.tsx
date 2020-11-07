import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AppBar from "./components/appbar/AppBar";
import { CreateUser } from "./pages/CreateUser";
import { CreateIncident } from "./pages/CreateIncident";
import { Login } from "./pages/Login";
import { Landing } from "./pages/Landing";

export function App() {
  const [auth, setAuth] = React.useState(false);

  return (
    <Router>
      <AppBar />
      { auth ?
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
            :
          <Redirect to="/login" />
      }
    </Router>
  );
}
