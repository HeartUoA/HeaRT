import React, { useState, useEffect } from "react";

import { Card, Button, Typography, Tooltip, Progress } from "antd";
import Header from "../components/Header";

import edit from "../assets/images/edit.svg";
import save from "../assets/images/save.png";
import cancel from "../assets/images/cancel.png";
import "../styles/DisplayCards.css";
import "../styles/Navigation.css";

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

const CurrentDimension = 0;

const DisplayCards: React.FC = () => {
  const [leftState, setLeftState] = useState(initialLeftCard);
  const [rightState, setRightState] = useState(initialRightCard);

  useEffect(() => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then((res) =>
        setLeftState({
          text: res[CurrentDimension].Statement,
          isEditing: false,
        })
      );

    fetch("/api/cards")
      .then((res) => res.json())
      .then((res) =>
        setRightState({
          text: res[CurrentDimension + 1].Statement,
          isEditing: false,
        })
      );
  }, []);

  // const getRightCards = () => {
  //   fetch('/api/cards')
  //     .then(res => res.json())
  //     .then(res => setLeftState({
  //       text: res[0].Statement,
  //       isEditing: false,
  //     }));
  // };

  const onBackClick = () => {
    // TODO: Write code here to redirect to course info screen or to previous card
  };

  const onSkipClick = () => {
    // TODO: Write code here to redirect to the next card or another incomplete card
  };

  const onEditClick = (side: CardSide, cancel: boolean) => {
    let textElement;
    switch (side) {
      case CardSide.Left:
        textElement = document.getElementById("leftCardEdit");
        if (!!textElement && !cancel) {
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
        if (!!textElement && !cancel) {
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

  const progressMade = { completed: 8, total: 14 };

  return (
    <div className="DisplayCards">
      <Header />

      <div className="Content">
        <div>
          <Typography className="Statement">Pick one statement</Typography>
          <div className="Cards-Container">
            <Card className="Card">
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
                  onClick={() => onEditClick(CardSide.Left, false)}
                />
              </Tooltip>
              {leftState.isEditing ? (
                <>
                  <Tooltip title={"Cancel Editing"} mouseEnterDelay={0.05}>
                    <img
                      src={cancel}
                      className="Cancel"
                      alt="cancel"
                      onClick={() => onEditClick(CardSide.Left, true)}
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
            <Card className="Card">
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
                  onClick={() => onEditClick(CardSide.Right, false)}
                />
              </Tooltip>
              {rightState.isEditing ? (
                <>
                  <Tooltip title={"Cancel Editing"} mouseEnterDelay={0.05}>
                    <img
                      src={cancel}
                      className="Cancel"
                      alt="cancel"
                      onClick={() => onEditClick(CardSide.Right, true)}
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
        <Button
          type="primary"
          className="NavigationButton"
          onClick={onSkipClick}
        >
          <Typography className="Navigation-Button-Text">Skip</Typography>
        </Button>
      </div>
    </div>
  );
};

export default DisplayCards;
