import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import logo from "../assets/images/logo.svg";
import edit from "../assets/images/edit.svg";
import "../styles/DisplayCards.css";

export enum CardSide {
  Left,
  Right,
}

const initialValues = {
  leftText: "Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
  rightText:
    "Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
  leftEditing: false,
  rightEditing: false,
};

const DisplayCards: React.FC = () => {
  const [state, setState] = useState(initialValues);
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
          setState({
            ...state,
            leftEditing: !state.leftEditing,
            leftText: textElement.innerText,
          });
        } else {
          setState({ ...state, leftEditing: !state.leftEditing });
        }
        break;
      case CardSide.Right:
        textElement = document.getElementById("rightCardEdit");
        if (!!textElement) {
          setState({
            ...state,
            rightEditing: !state.rightEditing,
            rightText: textElement.innerText,
          });
        } else {
          setState({ ...state, rightEditing: !state.rightEditing });
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
              {state.leftEditing ? "Stop Editing Card" : "Edit Card Text"}
            </ReactTooltip>
            <img
              src={edit}
              className="Edit"
              alt="edit"
              data-tip
              data-for="leftEditTooltip"
              onClick={() => onEditClick(CardSide.Left)}
            />
            {state.leftEditing ? (
              <div
                id="leftCardEdit"
                className="TextInput"
                contentEditable="true"
                suppressContentEditableWarning={true}
              >
                {state.leftText}
              </div>
            ) : (
              <p className="Card-Text">{state.leftText}</p>
            )}
          </div>
          <div className="Cards">
            <ReactTooltip id="rightEditTooltip" place="top" effect="solid">
              {state.rightEditing ? "Stop Editing Card" : "Edit Card Text"}
            </ReactTooltip>
            <img
              src={edit}
              className="Edit"
              alt="edit"
              data-tip
              data-for="rightEditTooltip"
              onClick={() => onEditClick(CardSide.Right)}
            />
            {state.rightEditing ? (
              <div
                id="rightCardEdit"
                className="TextInput"
                contentEditable="true"
                suppressContentEditableWarning={true}
              >
                {state.rightText}
              </div>
            ) : (
              <p className="Card-Text">{state.rightText}</p>
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
