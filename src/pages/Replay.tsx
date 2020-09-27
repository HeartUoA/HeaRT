import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import Header from "../components/Header";
import { Button, Typography } from "antd";
import "../styles/Replay.css";

const Replay: React.FC<RouteComponentProps> = (props) => {
  const playAgainForSameCourse = () => {
    // TODO: Need to pass in the course/game ID to replay for the same course (or is it stored in Redux/Context API?)
    props.history.push("/DisplayCards");
  };

  const playAgainForDifferentCourse = () => {
    // TODO: Change URL here for course information page
    // props.history.push("/DisplayCards");
  };

  const goToHomepage = () => {
    // TODO: Must check if user is logged in. If logged in, take user to dashboard. Else take user to homepage.
    props.history.push("/");
  };

  return (
    <div className="Replay">
      <Header />
      <div className="Replay-Content">
        <div className="Replay-Options-Panel">
          <Typography className="Success-Text">
            Your chart has been saved!
          </Typography>
          <Button className="Replay-Button" onClick={playAgainForSameCourse}>
            Play again for this course
          </Button>
          <Button
            className="Replay-Button"
            onClick={playAgainForDifferentCourse}
          >
            Play again for another course
          </Button>
          <Button className="Replay-Button" onClick={goToHomepage}>
            Return to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Replay);