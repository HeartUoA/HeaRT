import React, { useState } from "react";
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
      <div className="DisplayCards-Header">
        <div className="DisplayCards-Logo-Container">
          <img src={logo} className="Logo" alt="logo" />
          <p className="DisplayCards-Logo-Title">HeaRT</p>
        </div>
      </div>

      <div className="Main-Body">
        <p className="Statement">Pick one statement</p>
        <div className="Selection">
          <div className="Cards">
            <p className="Card-Text">{state.text}</p>
          </div>
          <div className="Cards">
            <p className="Card-Text">{state.text}</p>
          </div>
        </div>
        <div className="Navigation">
          <div className="NavigationButtonL" onClick={onBackClick}>
            <p className="Navigation-Button-Text">Back</p>
          </div>
          <div className="NavigationButtonR" onClick={onSkipClick}>
            <p className="Navigation-Button-Text">Skip</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCards;
