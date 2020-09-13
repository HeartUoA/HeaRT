import React from "react";

import { Typography, Layout } from "antd";

import logo from "../assets/images/logo.svg";
import "../styles/Header.css";

const Header: React.FC = () => {
  return (
    <Layout.Header className="Header">
      <div className="Logo-Container">
        <img src={logo} className="Logo" alt="logo" />
        <Typography className="Logo-Title-Header">HeaRT</Typography>
      </div>
    </Layout.Header>
  );
};

export default Header;
