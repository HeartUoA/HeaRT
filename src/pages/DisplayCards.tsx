import React, { useState } from "react";

import { Card, Button, Typography, Layout, Progress } from "antd";
import Header from "../components/Header";

import "../styles/DisplayCards.css";
import "../styles/Navigation.css";

const initialValues = {
  text: "Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
};

const DisplayCards: React.FC = () => {
  const [state] = useState(initialValues);

  const onBackClick = () => {
    // TODO: Write code here to redirect to course info screen or to previous card
  };

  const onSkipClick = () => {
    // TODO: Write code here to redirect to the next card or another incomplete card
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
              <p className="Card-Text">{state.text}</p>
            </Card>
            <Card className="Card">
              <p className="Card-Text">{state.text}</p>
            </Card>
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
              Completed: {progressMade.completed}/{progressMade.total}{" "}
              (Required: 8)
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
    </div>
  );
};

export default DisplayCards;
