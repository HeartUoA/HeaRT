import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Button, Typography } from "antd";
import logo from "../assets/images/logo.svg";
import "../styles/Homepage.css";

const Homepage: React.FC<RouteComponentProps> = (props) => {
  const [ cookies ] = useCookies(['accessToken']);

  useEffect(() => {
    if (cookies['accessToken']) {
      props.history.push("/Dashboard");
    }
  }, []);

  const onLoginClick = () => {
    props.history.push("/Login");
  };

  const onSignUpClick = () => {
    // TODO: Change line below and enter corresponding URL to redirect to Sign Up page
    // props.history.push("/SignUp");
  }

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
          <Typography className="Button-Text">Login</Typography>
        </Button>
        <Button type="default" className="Button" onClick={onSignUpClick}>
          <Typography className="Button-Text">Sign up</Typography>
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Homepage);
