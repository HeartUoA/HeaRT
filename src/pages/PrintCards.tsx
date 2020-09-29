import React, { useState } from "react";

import { Button, Input, Typography } from "antd";
import Header from "../components/Header";
import "../styles/PrintCards.css";

const PrintCards: React.FC = (props) => {
  const onBackClick = () => {
    // TODO: Write code here to redirect back to create account page
    // props.history.push("URL-HERE")
  };
  return (
    <div className="PrintCards">
      <div className="Header">
        <Header></Header>
      </div>
      <div className="PrintCardsContainer">
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
          <div className="rectangle">
            <p>5</p>
          </div>
          <div className="rectangle">
            <p>6</p>
          </div>
          <div className="rectangle">
            <p>7</p>
          </div>
          <div className="rectangle">
            <p>8</p>
          </div>
          <div className="rectangle">
            <p>9</p>
          </div>
          <div className="rectangle">
            <p>10</p>
          </div>
          <div className="rectangle">
            <p>11</p>
          </div>
          <div className="rectangle">
            <p>12</p>
          </div>
          <div className="rectangle">
            <p>13</p>
          </div>
          <div className="rectangle">
            <p>14</p>
          </div>
        </div>
      </div>
      <div className="BackButtonDiv">
        <Button type="primary" className="Back-Button" onClick={onBackClick}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default PrintCards;
