import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { Typography, Layout, Button, Modal } from "antd";

import logo from "../assets/images/logo.svg";
import "../styles/Header.css";
import { withRouter, RouteComponentProps } from "react-router-dom";

const Header: React.FC<RouteComponentProps> = (props) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [showExitModal, setShowExitModal] = useState(false);

  const onLogoutClick = () => {
    setCookie("accessToken", "");
    props.history.push("/");
  };

  const onLogoClick = () => {
    // If the user is NOT logged in, it should redirect them to the homepage
    if (!cookies["accessToken"]) {
      props.history.push("/");
    } else {
      // If the user is logged in and playing a game, it should show a confirmation dialog
      if (
        props.match.path === "/DisplayCards" ||
        props.match.path === "/Preview"
      ) {
        setShowExitModal(true);
      } else {
        props.history.push("/Dashboard");
      }
    }
  };

  const handleOk = () => {
    setShowExitModal(false);
    props.history.push("/Dashboard");
  };

  const handleCancel = () => {
    setShowExitModal(false);
  };

  return (
    <Layout.Header className="Header">
      <div className="Logo-Container" onClick={onLogoClick}>
        <img src={logo} className="Logo" alt="logo" />
        <Typography className="Logo-Title-Header">HeaRT</Typography>
      </div>
      {cookies["accessToken"] && (
        <div className="Logout">
          <Button className="Logout-Button" onClick={onLogoutClick}>
            Logout
          </Button>
        </div>
      )}
      <Modal
        title="Leave Game"
        centered
        visible={showExitModal}
        footer={[
          <Button
            key="cancel"
            type="primary"
            onClick={handleCancel}
            className="Modal-Button"
          >
            Cancel
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={handleOk}
            className="Modal-Button"
          >
            Continue
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to return to the dashboard?{" "}
          {props.match.path === "/Preview" &&
            "Any changes made in preview will be lost."}
        </p>
      </Modal>
    </Layout.Header>
  );
};

export default withRouter(Header);
