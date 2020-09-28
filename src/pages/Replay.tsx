import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie"

import Header from "../components/Header";
import { Button, Typography } from "antd";
import "../styles/Replay.css";

const Replay: React.FC<RouteComponentProps> = (props) => {
  const [ cookies ] = useCookies(['accessToken']);

  useEffect(() => {
    if (!cookies['accessToken']) {
      props.history.push("/Login");
    }
  }, [cookies]);

  const playAgainForSameCourse = () => {
    // TODO: Need to pass in the course/game ID to replay for the same course (or is it stored in Redux/Context API?)
    props.history.push("/DisplayCards");
  };

  const goToDashboard = () => {
    props.history.push("/Dashboard");
  };

  return (
    <div className="Replay">
      <Header />
      <div className="Replay-Content">
        <div className="Replay-Options-Panel">
          <Typography className="Success-Text">
            Your chart has been saved!
          </Typography>
          <div className="Replay-Buttons-Container">
            <Button className="Replay-Button" onClick={playAgainForSameCourse}>
              Play again for this course
            </Button>
            <Button className="Replay-Button" onClick={goToDashboard}>
              Return to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Replay);
