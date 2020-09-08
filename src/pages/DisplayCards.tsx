import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import "../styles/DisplayCards.css";

const initialValues = {
  text: "Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
};

const DisplayCards: React.FC = () => {
  const [state] = useState(initialValues);

  return (
    <div className="DisplayCards">
      <div className="DisplayCards-Header">
        <div className="Logo-Container">
          <img src={logo} className="Logo" alt="logo" />
          <p className="Logo-Title">HeaRT</p>
        </div>
      </div>
      <p className="Statement">Pick one statement</p>
      <div className="Selection">
        <div className="Cards">
          <p className="Card-Text">{state.text}</p>
        </div>
        <div className="Cards">
          <p className="Card-Text">{state.text}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayCards;
