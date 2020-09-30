import React from "react";
import { useCookies } from "react-cookie";

import { Typography, Layout, Button } from "antd";

import logo from "../assets/images/logo.svg";
import "../styles/Header.css";
import { withRouter, RouteComponentProps } from "react-router-dom";

const Header: React.FC<RouteComponentProps> = (props) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const onLogoutClick = () => {
    setCookie("accessToken", "");
    props.history.push("/");
  };

  const onLogoClick = () => {
    console.log("Click");
    // If the user is NOT logged in, it should redirect them to the homepage
    if (!cookies["accessToken"]) {
      props.history.push("/");
    } else {
      // If the user is logged in, it should redirect them to the dashboard
      props.history.push("/Dashboard");
    }
  };

  return (
    <Layout.Header className="Header">
      <div className="Logo-Container" onClick={onLogoClick}>
        <img src={logo} className="Logo" alt="logo" />
        <Typography className="Logo-Title-Header">HeaRT</Typography>
      </div>
      {!!cookies["accessToken"] && (
        <Button onClick={onLogoutClick}>Logout</Button>
      )}
    </Layout.Header>
  );
};

export default withRouter(Header);
