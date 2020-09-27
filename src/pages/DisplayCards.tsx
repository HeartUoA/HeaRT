import React, { useState, ChangeEvent } from "react";

import { Card, Button, Typography, Tooltip, Progress } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";

import edit from "../assets/images/edit.svg";
import save from "../assets/images/save.png";
import cancel from "../assets/images/cancel.png";
import "../styles/DisplayCards.css";
import "../styles/Navigation.css";
import { updateDimension } from "../api/dimensions";

export enum CardSide {
  Left,
  Right,
}

type Card = {
  text: string;
  isSelected: boolean;
  isEditing: boolean;
};

const initialLeftCard: Card = {
  text:
    "(Left Card) Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
  isSelected: false,
  isEditing: false,
};

const initialRightCard: Card = {
  text:
    "(Right Card) Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
  isSelected: false,
  isEditing: false,
};

const tempDimension = {
  dimensionValue: "Dimension",
  scale: 100,
  userExplanation: "This is a user explanation.",
  isPreview: false,
  marks: {
    0: "Fixed",
    30: "A 3rd dimension",
    100: {
      style: {
        color: "#ef547f",
      },
      label: <strong>Active</strong>,
    },
  },
};

const tempColours = {
  leftCardColour: "#FFFFFF",
  rightCardColour: "#FFFFFF",
};

const DisplayCards: React.FC = () => {
  const [leftState, setLeftState] = useState(initialLeftCard);
  const [rightState, setRightState] = useState(initialRightCard);
  const [colours, setColours] = useState(tempColours);
  const [dimension, setDimension] = useState(tempDimension);
  const progressMade = { completed: 8, total: 14 };
  let isCardSelected = leftState.isSelected || rightState.isSelected;

  const onBackClick = () => {
    // TODO: Write code here to redirect to course info screen or to previous card
    updateDimension(dimension);
  };

  const onSkipClick = () => {
    // TODO: Write code here to redirect to the next card or another incomplete card
  };

  const onNextClick = () => {
    // TODO: Write code here to redirect to the next card or another incomplete card
    updateDimension(dimension);
  };

  const onCardClick = (side: CardSide) => {
    switch (side) {
      case CardSide.Left:
        setLeftState({ ...leftState, isSelected: true });
        setRightState({ ...rightState, isSelected: false });
        onDimensionChange(0);
        break;

      case CardSide.Right:
        setRightState({ ...rightState, isSelected: true });
        setLeftState({ ...leftState, isSelected: false });
        onDimensionChange(100);
        break;

      default:
        break;
    }
  };

  const onEditClick = (
    event: React.MouseEvent,
    side: CardSide,
    cancel: boolean
  ) => {
    event.stopPropagation();

    let textElement;
    switch (side) {
      case CardSide.Left:
        textElement = document.getElementById("leftCardEdit");
        if (!!textElement && !cancel) {
          setLeftState({
            text: textElement.innerText,
            isEditing: !leftState.isEditing,
            isSelected: leftState.isSelected,
          });
        } else {
          setLeftState({ ...leftState, isEditing: !leftState.isEditing });
        }
        break;
      case CardSide.Right:
        textElement = document.getElementById("rightCardEdit");
        if (!!textElement && !cancel) {
          setRightState({
            text: textElement.innerText,
            isEditing: !rightState.isEditing,
            isSelected: rightState.isSelected,
          });
        } else {
          setRightState({ ...rightState, isEditing: !rightState.isEditing });
        }
        break;
      default:
        break;
    }
  };

  const onDimensionChange = (value: number) => {
    // Change selected card to reflect slider values
    if (value < 50) {
      setLeftState({ ...leftState, isSelected: true });
      setRightState({ ...rightState, isSelected: false });
    } else {
      setRightState({ ...rightState, isSelected: true });
      setLeftState({ ...leftState, isSelected: false });
    }

    setDimension({ ...dimension, scale: value });
    setColours({
      leftCardColour: getLeftColour(value),
      rightCardColour: getRightColour(value),
    });
  };

  const onUserExplanationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDimension({ ...dimension, userExplanation: event.target.value });
  };

  function getLeftColour(value: number) {
    var hue = 344.7;
    var value = 87 + (13 / 100) * value;
    console.log("left" + value);
    return ["hsl(", hue, ",100%,", value, "%)"].join("");
  }

  function getRightColour(value: number) {
    var hue = 344.7;
    var value = 100 - (13 / 100) * value;
    console.log("right" + value);
    return ["hsl(", hue, ",100%,", value, "%)"].join("");
  }

  return (
    <div className="DisplayCards">
      <Header />
      <div className="Content">
        <div>
          {isCardSelected ? (
            <Typography className="Statement">
              Which statement describes SOFTENG761 best?
            </Typography>
          ) : (
            <Typography className="Statement">Pick one statement</Typography>
          )}
          <div className="Cards-Container">
            <Card
              className={`${isCardSelected ? "Card-Clicked" : "Card"} ${
                leftState.isSelected ? "Card-Selected" : ""
              }`}
              onClick={() => onCardClick(CardSide.Left)}
              style={{ backgroundColor: colours.leftCardColour }}
            >
              <Tooltip
                title={
                  leftState.isEditing ? "Save Edited Card" : "Edit Card Text"
                }
                mouseEnterDelay={0.05}
              >
                <img
                  src={leftState.isEditing ? save : edit}
                  className={leftState.isEditing ? "Save" : "Edit"}
                  alt="edit"
                  onClick={(event) => onEditClick(event, CardSide.Left, false)}
                />
              </Tooltip>
              {leftState.isEditing ? (
                <>
                  <Tooltip title={"Cancel Editing"} mouseEnterDelay={0.05}>
                    <img
                      src={cancel}
                      className="Cancel"
                      alt="cancel"
                      onClick={(event) =>
                        onEditClick(event, CardSide.Left, true)
                      }
                    />
                  </Tooltip>
                  <div
                    id="leftCardEdit"
                    className="TextInput"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {leftState.text}
                  </div>
                </>
              ) : (
                <p className="Card-Text">{leftState.text}</p>
              )}
            </Card>
            <Card
              className={`${isCardSelected ? "Card-Clicked" : "Card"} ${
                rightState.isSelected ? "Card-Selected" : ""
              }`}
              onClick={() => onCardClick(CardSide.Right)}
              style={{ backgroundColor: colours.rightCardColour }}
            >
              <Tooltip
                title={
                  rightState.isEditing ? "Save Edited Card" : "Edit Card Text"
                }
                mouseEnterDelay={0.05}
              >
                <img
                  src={rightState.isEditing ? save : edit}
                  className={rightState.isEditing ? "Save" : "Edit"}
                  alt="edit"
                  onClick={(event) => onEditClick(event, CardSide.Right, false)}
                />
              </Tooltip>
              {rightState.isEditing ? (
                <>
                  <Tooltip title={"Cancel Editing"} mouseEnterDelay={0.05}>
                    <img
                      src={cancel}
                      className="Cancel"
                      alt="cancel"
                      onClick={(event) =>
                        onEditClick(event, CardSide.Right, true)
                      }
                    />
                  </Tooltip>
                  <div
                    id="rightCardEdit"
                    className="TextInput"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {rightState.text}
                  </div>
                </>
              ) : (
                <p className="Card-Text">{rightState.text}</p>
              )}
            </Card>
          </div>
          {isCardSelected ? (
            <Dimension
              {...{
                dimension: dimension,
                sliderUpdate: onDimensionChange,
                userExplanationUpdate: onUserExplanationChange,
              }}
            />
          ) : (
            ""
          )}
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
        <div className="Progress">
          <Typography>
            Completed: {progressMade.completed}/{progressMade.total} (Required:
            8)
          </Typography>
          <Progress
            className="Progress-Bar"
            strokeColor={
              progressMade.completed >= 8
                ? {
                    from: "#32C5FF",
                    to: "#00D49B",
                  }
                : {
                    from: "#7491F2",
                    to: "#32C5FF",
                  }
            }
            trailColor="#C3C6D4"
            status={progressMade.completed >= 8 ? "success" : "active"}
            percent={(progressMade.completed / progressMade.total) * 100}
            showInfo={false}
            strokeWidth={20}
          />
        </div>
        {isCardSelected ? (
          <Button
            type="primary"
            className="NavigationButton"
            onClick={onNextClick}
          >
            <Typography className="Navigation-Button-Text">Next</Typography>
          </Button>
        ) : (
          <Button
            type="primary"
            className="NavigationButton"
            onClick={onSkipClick}
          >
            <Typography className="Navigation-Button-Text">Skip</Typography>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DisplayCards;
