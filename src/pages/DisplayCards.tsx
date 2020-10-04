import React, { useState, useEffect, ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import * as QueryString from "query-string";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Card, Button, Typography, Tooltip, Progress, Spin } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";

import { CardSide } from "../types/card";
import {
  Dimension as DimensionType,
  createDimension,
} from "../types/dimension";

import { DEFAULT_COLOURS, getColours } from "../utils/cards";
import { API_DOMAIN } from "../config";

import edit from "../assets/images/edit.svg";
import save from "../assets/images/save.png";
import cancel from "../assets/images/cancel.png";

import "../styles/DisplayCards.css";
import "../styles/Footer.css";

const DEFAULT_PROGRESS = {
  completed: 0,
  total: 0,
};

const DisplayCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const isPrevPagePreview = window.history.state?.state?.prevPage === "Preview";

  const params = QueryString.parse(props.location.search);
  const [allDimensions, setAllDimensions] = useState<
    DimensionType[] | undefined
  >(undefined);
  const [retrievedResults, setRetrieved] = useState(false);

  const [dimensionIndex, setDimensionIndex] = useState(
    isPrevPagePreview && allDimensions ? allDimensions.length - 1 : 0
  );

  const [colours, setColours] = useState(
    allDimensions && allDimensions[dimensionIndex].userSelectedSliderPos !== -1
      ? getColours(
          allDimensions[dimensionIndex].userSelectedSliderPos,
          allDimensions[dimensionIndex].type
        )
      : DEFAULT_COLOURS
  );
  const [progress, setProgress] = useState(
    allDimensions
      ? {
          completed: allDimensions.filter(
            (dim: { userSelectedSliderPos: number }) =>
              dim.userSelectedSliderPos !== -1
          ).length,
          total: allDimensions.length,
        }
      : DEFAULT_PROGRESS
  );
  const isCardSelected =
    allDimensions && allDimensions[dimensionIndex].userSelectedSliderPos !== -1;

  useEffect(() => {
    fetchDimensions();
  }, []);

  useEffect(() => {
    if (retrievedResults && allDimensions) {
      const newIndex = isPrevPagePreview ? allDimensions.length - 1 : 0;
      setDimensionIndex(newIndex);
      setColours(
        allDimensions[newIndex].userSelectedSliderPos !== -1
          ? getColours(
              allDimensions[newIndex].userSelectedSliderPos,
              allDimensions[newIndex].type
            )
          : DEFAULT_COLOURS
      );
      setProgress({
        completed: allDimensions.filter(
          (dim: { userSelectedSliderPos: number }) =>
            dim.userSelectedSliderPos !== -1
        ).length,
        total: allDimensions.length,
      });
      setRetrieved(false);
    }
  }, [retrievedResults]);

  const fetchDimensions = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}dimensions/forchart/${params.chartID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((responseChart) => responseChart.json())
      .then((data) => {
        setAllDimensions(
          data.map((dimension: any) => {
            return createDimension(dimension);
          })
        );
        setRetrieved(true);
      });
  };

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  const saveCurrentDimension = async (): Promise<void> => {
    // TODO: Fix this PUT request
    // const dimension = createBackendDimension(
    //   chart!.dimensions[dimensionIndex]
    // );
    // const response = await fetch(
    //   `${API_DOMAIN}dimensions/` + chart!.dimensions[dimensionIndex].id,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(dimension),
    //     headers: {
    //       Authorization: `Bearer ${cookies["accessToken"]}`,
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );
  };

  const setNewDimension = (newIndex: number) => {
    setDimensionIndex(newIndex);
    setColours(
      allDimensions![newIndex].userSelectedSliderPos === -1
        ? DEFAULT_COLOURS
        : getColours(
            allDimensions![newIndex].userSelectedSliderPos,
            allDimensions![dimensionIndex].type
          )
    );
  };

  const onBackClick = () => {
    if (dimensionIndex > 0) {
      saveCurrentDimension();
      setNewDimension(dimensionIndex - 1);
    } else {
      // TODO: Redirect back to reason of play field once implemented
      props.history.push(`/Course/${params.courseID}`);
    }
  };

  const onNextClick = () => {
    saveCurrentDimension();
    if (dimensionIndex < allDimensions!.length - 1) {
      setNewDimension(dimensionIndex + 1);
    } else if (dimensionIndex === allDimensions!.length - 1) {
      if (progress.completed >= 8) {
        props.history.push(
          `/Preview?courseID=${params.courseID}&chartID=${params.chartID}`
        );
      } else {
        // Display modal to say at least 8 dimensions must be completed
      }
    }
  };

  const onCardClick = (side: CardSide) => {
    if (allDimensions![dimensionIndex].userSelectedSliderPos === -1) {
      setProgress({ ...progress, completed: progress.completed + 1 });
    }

    if (side === CardSide.Left) {
      onSliderPosChange(
        allDimensions![dimensionIndex].leftCard.anchorSliderPos
      );
    } else if (side === CardSide.Right) {
      onSliderPosChange(
        allDimensions![dimensionIndex].rightCard.anchorSliderPos
      );
    }
  };

  const onEditClick = (event: React.MouseEvent, side: CardSide) => {
    event.stopPropagation();
    if (side === CardSide.Left) {
      setAllDimensions(
        allDimensions!.map((dimension, index) => {
          if (index === dimensionIndex) {
            return {
              ...dimension,
              leftCard: {
                ...dimension.leftCard,
                isEditing: true,
              },
            };
          } else {
            return dimension;
          }
        })
      );
    } else if (side === CardSide.Right) {
      setAllDimensions(
        allDimensions!.map((dimension, index) => {
          if (index === dimensionIndex) {
            return {
              ...dimension,
              rightCard: {
                ...dimension.rightCard,
                isEditing: true,
              },
            };
          } else {
            return dimension;
          }
        })
      );
    }
  };

  const onCancelClick = (side: CardSide) => {
    if (side === CardSide.Left) {
      setAllDimensions(
        allDimensions!.map((dimension, index) => {
          if (index === dimensionIndex) {
            return {
              ...dimension,
              leftCard: {
                ...dimension.leftCard,
                isEditing: false,
              },
            };
          } else {
            return dimension;
          }
        })
      );
    } else if (side === CardSide.Right) {
      setAllDimensions(
        allDimensions!.map((dimension, index) => {
          if (index === dimensionIndex) {
            return {
              ...dimension,
              rightCard: {
                ...dimension.rightCard,
                isEditing: true,
              },
            };
          } else {
            return dimension;
          }
        })
      );
    }
  };

  const onSaveClick = (side: CardSide) => {
    let textElement = document.getElementById(
      side === CardSide.Left ? "leftCardEdit" : "rightCardEdit"
    );
    if (side === CardSide.Left) {
      setAllDimensions(
        allDimensions!.map((dimension, index) => {
          if (index === dimensionIndex && textElement) {
            return {
              ...dimension,
              leftCard: {
                ...dimension.leftCard,
                statement: textElement.innerText,
                isEditing: false,
              },
            };
          } else {
            return dimension;
          }
        })
      );
    } else if (side === CardSide.Right) {
      setAllDimensions(
        allDimensions!.map((dimension, index) => {
          if (index === dimensionIndex && textElement) {
            return {
              ...dimension,
              rightCard: {
                ...dimension.rightCard,
                statement: textElement.innerText,
                isEditing: false,
              },
            };
          } else {
            return dimension;
          }
        })
      );
    }
  };

  const onSliderPosChange = (value: number) => {
    setAllDimensions(
      allDimensions!.map((dimension, index) => {
        if (index === dimensionIndex) {
          return {
            ...dimension,
            userSelectedSliderPos: value,
          };
        } else {
          return dimension;
        }
      })
    );
    setColours(getColours(value, allDimensions![dimensionIndex].type));
  };

  const onUserExplanationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAllDimensions(
      allDimensions!.map((dimension, index) => {
        if (index === dimensionIndex) {
          return {
            ...dimension,
            serExplanation: event.target.value,
          };
        } else {
          return dimension;
        }
      })
    );
  };

  if (allDimensions) {
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
                className={`Card ${
                  allDimensions[dimensionIndex].type === "Practice"
                    ? "Pink"
                    : "Blue"
                }`}
                onClick={() => {
                  if (!allDimensions[dimensionIndex].leftCard.isEditing) {
                    onCardClick(CardSide.Left);
                  }
                }}
                style={{ backgroundColor: colours.leftCardColour }}
              >
                <Tooltip
                  title={
                    allDimensions[dimensionIndex].leftCard.isEditing
                      ? "Save Edited Card"
                      : "Edit Card Text"
                  }
                  mouseEnterDelay={0.05}
                >
                  <img
                    src={
                      allDimensions[dimensionIndex].leftCard.isEditing
                        ? save
                        : edit
                    }
                    className={
                      allDimensions[dimensionIndex].leftCard.isEditing
                        ? "Save"
                        : "Edit"
                    }
                    alt="edit"
                    onClick={(event) =>
                      allDimensions[dimensionIndex].leftCard.isEditing
                        ? onSaveClick(CardSide.Left)
                        : onEditClick(event, CardSide.Left)
                    }
                  />
                </Tooltip>
                {allDimensions[dimensionIndex].leftCard.isEditing ? (
                  <>
                    <Tooltip title={"Cancel Editing"} mouseEnterDelay={0.05}>
                      <img
                        src={cancel}
                        className="Cancel"
                        alt="cancel"
                        onClick={(event) => onCancelClick(CardSide.Left)}
                      />
                    </Tooltip>
                    <div
                      id="leftCardEdit"
                      className="TextInput"
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                    >
                      {allDimensions[dimensionIndex].leftCard.statement}
                    </div>
                  </>
                ) : (
                  <p className="Card-Text">
                    {allDimensions[dimensionIndex].leftCard.statement}
                  </p>
                )}
              </Card>
              <Card
                className={`Card ${
                  allDimensions[dimensionIndex].type === "Practice"
                    ? "Pink"
                    : "Blue"
                }`}
                onClick={() => {
                  if (!allDimensions[dimensionIndex].rightCard.isEditing) {
                    onCardClick(CardSide.Right);
                  }
                }}
                style={{ backgroundColor: colours.rightCardColour }}
              >
                <Tooltip
                  title={
                    allDimensions[dimensionIndex].rightCard.isEditing
                      ? "Save Edited Card"
                      : "Edit Card Text"
                  }
                  mouseEnterDelay={0.05}
                >
                  <img
                    src={
                      allDimensions[dimensionIndex].rightCard.isEditing
                        ? save
                        : edit
                    }
                    className={
                      allDimensions[dimensionIndex].rightCard.isEditing
                        ? "Save"
                        : "Edit"
                    }
                    alt="edit"
                    onClick={(event) =>
                      allDimensions[dimensionIndex].rightCard.isEditing
                        ? onSaveClick(CardSide.Right)
                        : onEditClick(event, CardSide.Right)
                    }
                  />
                </Tooltip>
                {allDimensions[dimensionIndex].rightCard.isEditing ? (
                  <>
                    <Tooltip title={"Cancel Editing"} mouseEnterDelay={0.05}>
                      <img
                        src={cancel}
                        className="Cancel"
                        alt="cancel"
                        onClick={(event) => onCancelClick(CardSide.Right)}
                      />
                    </Tooltip>
                    <div
                      id="rightCardEdit"
                      className="TextInput"
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                    >
                      {allDimensions[dimensionIndex].rightCard.statement}
                    </div>
                  </>
                ) : (
                  <p className="Card-Text">
                    {allDimensions[dimensionIndex].rightCard.statement}
                  </p>
                )}
              </Card>
            </div>
            {isCardSelected ? (
              <Dimension
                {...{
                  dimension: allDimensions[dimensionIndex],
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
          <Button
            type="primary"
            className="Footer-Button"
            onClick={onNextClick}
          >
            {isCardSelected ? "Next" : "Skip"}
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="DisplayCards">
        <Header />
        <div className="Loading-Spinner">
          <Spin size="large" />
        </div>
      </div>
    );
  }
};

export default withRouter(DisplayCards);
