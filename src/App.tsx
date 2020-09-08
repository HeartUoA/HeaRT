import React from "react";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/">
        <Homepage />
      </Route>
    </Router>
  );
};

export default App;
