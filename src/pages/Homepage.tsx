import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Button, Typography } from "antd";
import logo from "../assets/images/logo.svg";
import "../styles/Homepage.css";

// This page allows the user to login to their account or make a new account if they do not already have one.
const Homepage: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);

  // If user is already logged in then redirect them to their dashboard
  useEffect(() => {
    if (cookies["accessToken"]) {
      props.history.push("/Dashboard");
    }
  }, [cookies]);

  const onLoginClick = () => {
    props.history.push("/Login");
  };

  const onSignUpClick = () => {
    props.history.push("/SignUp");
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
        <Button className="Button" onClick={onLoginClick}>
          Login
        </Button>
        <Button className="Button" onClick={onSignUpClick}>
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Homepage);
