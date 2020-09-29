import React from "react";

import { Button, Input, Typography } from "antd";

import Header from "../components/Header";
import "../styles/PrintCards.css";

const PrintCards: React.FC = (props) => {
  const onConfirmClick = () => {
    // TODO: Write code here to try logging in (if successful - dashboard, if error then display error)
  };

  const onSignupClick = () => {
    // TODO: Write code here to redirect back to create account page
    // props.history.push("URL-HERE")
  };

  return (
    <div className="PrintCards">
      <Header></Header>
      <div className="PrintCardsContent">
        <div className="rectangle">
          <p>1</p>
        </div>
        <div className="rectangle">
          <p>2</p>
        </div>
        <div className="rectangle">
          <p>3</p>
        </div>
        <div className="rectangle">
          <p>4</p>
        </div>
      </div>
      <div className="PrintCardsContentRight">
        <div className="rectangle">
          <p>5</p>
        </div>
        <div className="rectangle">
          <p>6</p>
        </div>
        <div className="rectangle">
          <p>6</p>
        </div>
        <div className="rectangle">
          <p>6</p>
        </div>
        <div className="rectangle">
          <p>6</p>
        </div>
        <div className="rectangle">
          <p>6</p>
        </div>
        <div className="rectangle">
          <p>6</p>
        </div>
        <div className="rectangle">
          <p>6</p>
        </div>
        <div className="rectangle">
          <p>6</p>
        </div>
      </div>
    </div>
  );
};

export default PrintCards;
