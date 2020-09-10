import React from "react";
import { Link } from "react-router-dom";

import { Button, Typography } from "antd";
import logo from "../assets/images/logo.svg";
import "../styles/Homepage.css";

const Homepage: React.FC = () => {
  const onPlayClick = () => {
    // TODO: Write code here to redirect to course info screen
  };

  const onInstructionsClick = () => {
    // TODO: Write code here to redirect to instructions screen
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
        <Link to="/DisplayCards">
          <Button className="Button" onClick={onPlayClick}>
            <Typography className="Button-Text">Play</Typography>
          </Button>
        </Link>
        <Button type="default" className="Button" onClick={onInstructionsClick}>
          <Typography className="Button-Text">Instructions</Typography>
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
