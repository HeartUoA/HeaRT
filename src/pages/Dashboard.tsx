import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "antd";

import Header from "../components/Header";
import Instructions from "../components/Instructions";
import "../styles/Dashboard.css";

const Dashboard: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  const onInstructionsClick = () => {
    setShowInstructions(!showInstructions);
  };

  const createNewCourse = () => {
    props.history.push("/CreateCourse");
  };

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
