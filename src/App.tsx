import React from "react";
import Homepage from "./pages/Homepage";
import DisplayCards from "./pages/DisplayCards";
import Preview from "./pages/Preview";
import Replay from "./pages/Replay";
import CreateCourse from "./pages/CreateCourse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import PrintCards from "./pages/PrintCards";
import { CookiesProvider } from "react-cookie";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          <Route path="/CreateCourse">
            <CreateCourse />
          </Route>
          <Route path="/DisplayCards">
            <DisplayCards />
          </Route>
          <Route path="/Preview">
            <Preview />
          </Route>
          <Route path="/Replay">
            <Replay />
          </Route>
          <Route path="/SignUp">
            <Signup />
          </Route>
          <Route path="/Course/:courseID">
            <Charts />
          </Route>
          <Route path="/PrintCards/:chartID">
            <PrintCards />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
};

export default App;
