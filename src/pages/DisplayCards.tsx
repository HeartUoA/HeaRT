import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import { Card, Button, Typography, Layout } from "antd";

import logo from "../assets/images/logo.svg";
import edit from "../assets/images/edit.svg";
import "../styles/DisplayCards.css";

export enum CardSide {
  Left,
  Right,
}

type Card = {
  text: string;
  isEditing: boolean;
};

const initialLeftCard: Card = {
  text:
    "(Left Card) Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
  isEditing: false,
};

const initialRightCard: Card = {
  text:
    "(Right Card) Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
  isEditing: false,
};

const DisplayCards: React.FC = () => {
  const [leftState, setLeftState] = useState(initialLeftCard);
  const [rightState, setRightState] = useState(initialRightCard);
  const onBackClick = () => {
    // TODO: Write code here to redirect to course info screen
  };

  const onSkipClick = () => {
    // TODO: Write code here to redirect to instructions screen
  };

  const onEditClick = (side: CardSide) => {
    var textElement;
    switch (side) {
      case CardSide.Left:
        textElement = document.getElementById("leftCardEdit");
        if (!!textElement) {
          setLeftState({
            text: textElement.innerText,
            isEditing: !leftState.isEditing,
          });
        } else {
          setLeftState({ ...leftState, isEditing: !leftState.isEditing });
        }
        break;
      case CardSide.Right:
        textElement = document.getElementById("rightCardEdit");
        if (!!textElement) {
          setRightState({
            text: textElement.innerText,
            isEditing: !rightState.isEditing,
          });
        } else {
          setRightState({ ...rightState, isEditing: !rightState.isEditing });
        }
        break;
      default:
        break;
    }
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
              <ReactTooltip id="leftEditTooltip" place="top" effect="solid">
                {leftState.isEditing ? "Stop Editing Card" : "Edit Card Text"}
              </ReactTooltip>
              <img
                src={edit}
                className="Edit"
                alt="edit"
                data-tip
                data-for="leftEditTooltip"
                onClick={() => onEditClick(CardSide.Left)}
              />
              {leftState.isEditing ? (
                <div
                  id="leftCardEdit"
                  className="TextInput"
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                >
                  {leftState.text}
                </div>
              ) : (
                <p className="Card-Text">{leftState.text}</p>
              )}
            </Card>
            <Card className="Card">
              <ReactTooltip id="rightEditTooltip" place="top" effect="solid">
                {rightState.isEditing ? "Stop Editing Card" : "Edit Card Text"}
              </ReactTooltip>
              <img
                src={edit}
                className="Edit"
                alt="edit"
                data-tip
                data-for="rightEditTooltip"
                onClick={() => onEditClick(CardSide.Right)}
              />
              {rightState.isEditing ? (
                <div
                  id="rightCardEdit"
                  className="TextInput"
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                >
                  {rightState.text}
                </div>
              ) : (
                <p className="Card-Text">{rightState.text}</p>
              )}
            </Card>
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
    </div>
  );
};

export default DisplayCards;
