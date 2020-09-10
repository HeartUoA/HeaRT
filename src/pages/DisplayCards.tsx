import React, { useState } from "react";

import { Card, Button, Typography, Layout } from "antd";

import logo from "../assets/images/logo.svg";
import "../styles/DisplayCards.css";

const initialValues = {
  text: "Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
};

const DisplayCards: React.FC = () => {
  const [state] = useState(initialValues);
  const onBackClick = () => {
    // TODO: Write code here to redirect to course info screen
  };

  const onSkipClick = () => {
    // TODO: Write code here to redirect to instructions screen
  };
  return (
    <div className="DisplayCards">
      <Layout.Header className="DisplayCards-Header">
        <div className="DisplayCards-Logo-Container">
          <img src={logo} className="Logo" alt="logo" />
          <Typography className="DisplayCards-Logo-Title">HeaRT</Typography>
        </div>
      </Layout.Header>

      <div className="Content">
        <div>
          <Typography className="Statement">Pick one statement</Typography>
          <div className="Cards-Container">
            <Card className="Card">
              <p className="Card-Text">{state.text}</p>
            </Card>
            <Card className="Card">
              <p className="Card-Text">{state.text}</p>
            </Card>
          </div>
        </div>
        <div className="Navigation">
          <Button
            type="primary"
            className="NavigationButton"
            onClick={onBackClick}
          >
            <Typography className="Navigation-Button-Text">Back</Typography>
          </Button>
          <Button
            type="primary"
            className="NavigationButton"
            onClick={onSkipClick}
          >
            <Typography className="Navigation-Button-Text">Skip</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisplayCards;
