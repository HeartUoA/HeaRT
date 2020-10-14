import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { Typography, Layout, Button, Modal } from "antd";

import logo from "../assets/images/logo.svg";
import "../styles/Header.css";
import { withRouter, RouteComponentProps } from "react-router-dom";

// A component reused heavily throughout the app allowing users to return to the homepage and log out.
const Header: React.FC<RouteComponentProps> = (props) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [showExitModal, setShowExitModal] = useState(false);

  // Unsets the cookie to log the user out of their account
  const onLogoutClick = () => {
    setCookie("accessToken", "");
    props.history.push("/");
  };

  // Redirects the user back to the homepage given they are logged in and should not lose any progress
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

  // Modal button click function that discards users changes and redirects user to dashboard
  const handleOk = () => {
    setShowExitModal(false);
    props.history.push("/Dashboard");
  };

  // Closes the discard changes modal
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
