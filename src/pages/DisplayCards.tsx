import React, { useState } from "react";

import { Card, Button, Typography, Progress } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";

import "../styles/DisplayCards.css";
import "../styles/Navigation.css";

export enum CardSide {
  Left,
  Right,
}

type Card = {
  text: string;
  isSelected: boolean;
};

const initialLeftCard: Card = {
  text:
    "(Left Card) Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
  isSelected: false,
};

const initialRightCard: Card = {
  text:
    "(Right Card) Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
  isSelected: false,
};

const tempDimension = {
  dimensionValue: "Dimension",
  scale: 100,
  userExplanation: "This is a user explanation.",
  isPreview: false,
};

const DisplayCards: React.FC = () => {
  const [leftState, setLeftState] = useState(initialLeftCard);
  const [rightState, setRightState] = useState(initialRightCard);

  const onBackClick = () => {
    // TODO: Write code here to redirect to course info screen or to previous card
  };

  const onSkipClick = () => {
    // TODO: Write code here to redirect to the next card or another incomplete card
  };

  const onNextClick = () => {
    // TODO: Write code here to redirect to the next card or another incomplete card
  };

  const onCardClick = (side: CardSide) => {
    switch (side) {
      case CardSide.Left:
        setLeftState({ ...leftState, isSelected: true });
        setRightState({ ...rightState, isSelected: false });
        setDimension({ ...dimension, scale: 0 });
        break;

      case CardSide.Right:
        setRightState({ ...rightState, isSelected: true });
        setLeftState({ ...leftState, isSelected: false });
        setDimension({ ...dimension, scale: 100 });
        break;

      default:
        break;
    }
  };

  const progressMade = { completed: 8, total: 14 };
  const [dimension, setDimension] = useState(tempDimension);
  let isCardSelected = leftState.isSelected || rightState.isSelected;

  return (
    <div className="DisplayCards">
      <Header />

      <div className="Content">
        <div>
          {isCardSelected ? (
            ""
          ) : (
            <Typography className="Statement">Pick one statement</Typography>
          )}
          <div className="Cards-Container">
            <Card
              className={`${isCardSelected ? "Card-Clicked" : "Card"} ${
                leftState.isSelected ? "Card-Selected" : ""
              }`}
              onClick={() => onCardClick(CardSide.Left)}
            >
              <p className="Card-Text">{initialLeftCard.text}</p>
            </Card>
            <Card
              className={`${isCardSelected ? "Card-Clicked" : "Card"} ${
                rightState.isSelected ? "Card-Selected" : ""
              }`}
              onClick={() => onCardClick(CardSide.Right)}
            >
              <p className="Card-Text">{initialRightCard.text}</p>
            </Card>
          </div>
          {isCardSelected ? <Dimension {...dimension} /> : ""}
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
