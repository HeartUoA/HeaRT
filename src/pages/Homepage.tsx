import React from "react";
import logo from "../assets/images/logo.svg";
import "../styles/Homepage.css";

const Homepage: React.FC = () => {
  const onPlayClick = () => {
    // TODO: Write code here to redirect to course info screen
  };

  const onInstructionsClick = () => {
    // TODO: Write code here to redirect to instructions screen
  };

  return (
    <div className="Homepage">
      <div className="Homepage-Header">
        <div className="Logo-Container">
          <img src={logo} className="Logo" alt="logo" />
          <p className="Logo-Title">HeaRT</p>
        </div>
        <p className="App-Description">Hearing And Realising Teaching-voice</p>
      </div>
      <div className="Buttons-Container">
        <div className="Button" onClick={onPlayClick}>
          <p className="Button-Text">Play</p>
        </div>
        <div className="Button" onClick={onInstructionsClick}>
          <p className="Button-Text">Instructions</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
