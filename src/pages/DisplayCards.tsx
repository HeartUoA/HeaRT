import React, { useState, useEffect, ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";

import { API_DOMAIN } from "../config";

import { Card, Button, Typography, Tooltip, Progress } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";
import { Dimension as DimensionType } from "../types/dimension";
import { createChart } from "../types/chart";

import edit from "../assets/images/edit.svg";
import save from "../assets/images/save.png";
import cancel from "../assets/images/cancel.png";
import "../styles/DisplayCards.css";
import "../styles/Footer.css";

import charts from "../dummyData/charts";

interface ParamTypes {
  courseID: string;
}

export enum CardSide {
  Left,
  Right,
}

const defaultColours = {
  leftCardColour: "#FFFFFF",
  rightCardColour: "#FFFFFF",
};

const DisplayCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const { courseID } = useParams<ParamTypes>();

  // TODO: This needs to be changed later to use data from the backend
  const fetchDimensions = async (): Promise<any> => {
    const responseChart = await fetch(
      `${API_DOMAIN}course/` + courseID + `/chart`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies["accessToken"]}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((responseChart) => responseChart.json())
      .then((data) => {
        return data;
      });

    console.log(responseChart);

    return responseChart.dimensions;
  };

  fetchDimensions();

  // (async () => {
  //   console.log(await fetchDimensions());
  // })()

  const allDimensions = charts[0].dimensions;

  const [dimensionIndex, setDimensionIndex] = useState(0);
  const [currentDimension, setDimension] = useState<DimensionType>(
    allDimensions[dimensionIndex]
  );

  const [leftState, setLeftState] = useState(currentDimension.leftCard);
  const [rightState, setRightState] = useState(currentDimension.rightCard);
  const [colours, setColours] = useState(
    currentDimension.userSelectedSliderPos === -1
      ? defaultColours
      : getColours(currentDimension.userSelectedSliderPos)
  );
  const [progress, setProgress] = useState({
    completed: allDimensions.filter(
      (dim: { userSelectedSliderPos: number }) =>
        dim.userSelectedSliderPos !== -1
    ).length,
    total: allDimensions.length,
  });
  const isCardSelected = currentDimension.userSelectedSliderPos !== -1;

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  const saveCurrentDimension = () => {
    // TODO: Need to change this to individual POST request for each dimension?
    allDimensions[dimensionIndex] = {
      ...currentDimension,
      leftCard: leftState,
      rightCard: rightState,
    };
  };

  const setNewDimension = (newIndex: number) => {
    setDimensionIndex(newIndex);
    setDimension(allDimensions[newIndex]);
    setLeftState(allDimensions[newIndex].leftCard);
    setRightState(allDimensions[newIndex].rightCard);
    setColours(
      allDimensions[newIndex].userSelectedSliderPos === -1
        ? defaultColours
        : getColours(allDimensions[newIndex].userSelectedSliderPos)
    );
  };

  function getColours(value: number) {
    const hue = 344.7;
    const leftValue = 87 + (13 / 100) * value;
    const leftColour = ["hsl(", hue, ",100%,", leftValue, "%)"].join("");

    const rightValue = 100 - (13 / 100) * value;
    const rightColour = ["hsl(", hue, ",100%,", rightValue, "%)"].join("");

    return {
      leftCardColour: leftColour,
      rightCardColour: rightColour,
    };
  }

  const onBackClick = () => {
    if (dimensionIndex > 0) {
      saveCurrentDimension();
      setNewDimension(dimensionIndex - 1);
    }
  };

  const onNextClick = () => {
    saveCurrentDimension();
    if (dimensionIndex < allDimensions.length - 1) {
      setNewDimension(dimensionIndex + 1);
    } else if (dimensionIndex === allDimensions.length - 1) {
      if (progress.completed >= 8) {
        props.history.push("/Preview");
      } else {
        // Display modal to say at least 8 dimensions must be completed
      }
    }
  };

  const onCardClick = (side: CardSide) => {
    if (currentDimension.userSelectedSliderPos === -1) {
      setProgress({ ...progress, completed: progress.completed + 1 });
    }

    if (side === CardSide.Left) {
      onSliderPosChange(leftState.anchorSliderPos);
    } else if (side === CardSide.Right) {
      onSliderPosChange(rightState.anchorSliderPos);
    }
  };

  const onEditClick = (event: React.MouseEvent, side: CardSide) => {
    event.stopPropagation();
    if (side === CardSide.Left) {
      setLeftState({ ...leftState, isEditing: true });
    } else if (side === CardSide.Right) {
      setRightState({ ...rightState, isEditing: true });
    }
  };

  const onCancelClick = (event: React.MouseEvent, side: CardSide) => {
    if (side === CardSide.Left) {
      setLeftState({ ...leftState, isEditing: false });
    } else if (side === CardSide.Right) {
      setRightState({ ...rightState, isEditing: false });
    }
  };

  const onSaveClick = (event: React.MouseEvent, side: CardSide) => {
    let textElement = document.getElementById(
      side === CardSide.Left ? "leftCardEdit" : "rightCardEdit"
    );
    if (textElement && side === CardSide.Left) {
      setLeftState({
        ...leftState,
        statement: textElement.innerText,
        isEditing: false,
      });
    } else if (textElement && side === CardSide.Right) {
      setRightState({
        ...rightState,
        statement: textElement.innerText,
        isEditing: false,
      });
    }
  };

  const onSliderPosChange = (value: number) => {
    setDimension({ ...currentDimension, userSelectedSliderPos: value });
    setColours(getColours(value));
  };

  const onUserExplanationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDimension({ ...currentDimension, userExplanation: event.target.value });
  };

  return (
    <div className="DisplayCards">
      <Header />
      <div className="Cards-Content">
        <div style={{ width: "100%" }}>
          <Typography className="Statement">
            Which statement best describes the course?
          </Typography>
          <div className="Cards-Container">
            <Card
              className="Card"
              onClick={() => {
                if (!leftState.isEditing) {
                  onCardClick(CardSide.Left);
                }
              }}
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
                  onClick={(event) =>
                    leftState.isEditing
                      ? onSaveClick(event, CardSide.Left)
                      : onEditClick(event, CardSide.Left)
                  }
                />
              </Tooltip>
              {leftState.isEditing ? (
                <>
                  <Tooltip title={"Cancel Editing"} mouseEnterDelay={0.05}>
                    <img
                      src={cancel}
                      className="Cancel"
                      alt="cancel"
                      onClick={(event) => onCancelClick(event, CardSide.Left)}
                    />
                  </Tooltip>
                  <div
                    id="leftCardEdit"
                    className="TextInput"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {leftState.statement}
                  </div>
                </>
              ) : (
                <p className="Card-Text">{leftState.statement}</p>
              )}
            </Card>
            <Card
              className="Card"
              onClick={() => {
                if (!rightState.isEditing) {
                  onCardClick(CardSide.Right);
                }
              }}
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
                  onClick={(event) =>
                    rightState.isEditing
                      ? onSaveClick(event, CardSide.Right)
                      : onEditClick(event, CardSide.Right)
                  }
                />
              </Tooltip>
              {rightState.isEditing ? (
                <>
                  <Tooltip title={"Cancel Editing"} mouseEnterDelay={0.05}>
                    <img
                      src={cancel}
                      className="Cancel"
                      alt="cancel"
                      onClick={(event) => onCancelClick(event, CardSide.Right)}
                    />
                  </Tooltip>
                  <div
                    id="rightCardEdit"
                    className="TextInput"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {rightState.statement}
                  </div>
                </>
              ) : (
                <p className="Card-Text">{rightState.statement}</p>
              )}
            </Card>
          </div>
          {isCardSelected ? (
            <Dimension
              {...{
                dimension: currentDimension,
                sliderUpdate: onSliderPosChange,
                userExplanationUpdate: onUserExplanationChange,
                isPreview: false,
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="Footer">
        <Button
          type="primary"
          className="Footer-Button"
          onClick={onBackClick}
          disabled={dimensionIndex <= 0}
        >
          Back
        </Button>
        <div className="Progress">
          <Typography>
            Completed: {progress.completed}/{progress.total} (Required: 8)
          </Typography>
          <Progress
            className="Progress-Bar"
            strokeColor={
              progress.completed >= 8
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
            status={progress.completed >= 8 ? "success" : "active"}
            percent={(progress.completed / progress.total) * 100}
            showInfo={false}
            strokeWidth={20}
          />
        </div>
        <Button type="primary" className="Footer-Button" onClick={onNextClick}>
          {isCardSelected ? "Next" : "Skip"}
        </Button>
      </div>
    </div>
  );
};

export default withRouter(DisplayCards);
