import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
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
          </div>
          <div className="Cards">
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
          </div>
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
  );
};

export default DisplayCards;
