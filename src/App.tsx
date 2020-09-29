import React from "react";
import Homepage from "./pages/Homepage";
import DisplayCards from "./pages/DisplayCards";
import Preview from "./pages/Preview";
import Replay from "./pages/Replay";
import CreateCourse from "./pages/CreateCourse";
import Login from "./pages/Login";
<<<<<<< HEAD
import Dashboard from "./pages/Dashboard";
import { CookiesProvider } from "react-cookie";

=======
import PrintCards from "./pages/PrintCards";
>>>>>>> 2568001... feat(printcards.tsx/css): created the base structure of how the print cards will work
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
<<<<<<< HEAD
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
        </Switch>
      </Router>
    </CookiesProvider>
=======
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/CourseInfo">
          <CourseInfo />
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
        <Route path="/PrintCards">
          <PrintCards />
        </Route>
      </Switch>
    </Router>
>>>>>>> 2568001... feat(printcards.tsx/css): created the base structure of how the print cards will work
  );
};

export default App;
