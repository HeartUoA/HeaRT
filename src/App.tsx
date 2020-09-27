import React from "react";
import Homepage from "./pages/Homepage";
import DisplayCards from "./pages/DisplayCards";
import Preview from "./pages/Preview";
import Replay from "./pages/Replay";
import CreateCourse from "./pages/CreateCourse";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
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
      </Switch>
    </Router>
  );
};

export default App;
