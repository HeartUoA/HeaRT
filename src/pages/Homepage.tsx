import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Button, Typography } from "antd";
import logo from "../assets/images/logo.svg";
import "../styles/Homepage.css";

type RouterProps = RouteComponentProps;

const Homepage: React.FC<RouteComponentProps> = (props) => {
  const onPlayClick = () => {
    props.history.push("/DisplayCards");
  };

  const onInstructionsClick = () => {
    // TODO: Change code here to redirect to instructions screen (add URL)
    // props.history.push("URL-HERE");
  };

  return (
    <div className="Homepage">
      <div className="Homepage-Header">
        <div className="Logo-Container">
          <img src={logo} className="Logo-Image" alt="logo" />
          <Typography className="Logo-Title">HeaRT</Typography>
        </div>
        <Typography className="App-Description">
          Hearing And Realising Teaching-voice
        </Typography>
      </div>
      <div className="Buttons-Container">
        <Button className="Button" onClick={onPlayClick}>
          <Typography className="Button-Text">Play</Typography>
        </Button>
        <Button type="default" className="Button" onClick={onInstructionsClick}>
          <Typography className="Button-Text">Instructions</Typography>
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Homepage);
