import React, { useState } from "react";
import { withRouter, RouteComponentProps} from "react-router-dom";

import { Button } from "antd";

import Header from "../components/Header";
import Instructions from "../components/Instructions"
import "../styles/Dashboard.css";

const Dashboard: React.FC<RouteComponentProps> = (props) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const onInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const createNewCourse = () => {
    props.history.push("/CreateCourse");
  }

  return (
    <div className="Dashboard">
      <Header />
      <Instructions visible={showInstructions} hide={onInstructionsClick} />
      <div className="Dashboard-Content">
        <Button onClick={onInstructionsClick}>How to play</Button>
        <Button onClick={createNewCourse}>Create new course</Button>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
