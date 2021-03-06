import React, { useState, useEffect, ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import * as QueryString from "query-string";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Card, Button, Typography, Tooltip, Progress, Spin, Modal } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";

import { CardSide } from "../types/card";
import {
  Dimension as DimensionType,
  createDimension,
  createBackendDimension,
} from "../types/dimension";

import { DEFAULT_COLOURS, getColours } from "../utils/cards";
import { API_DOMAIN, MINIMUM_REQUIRED } from "../config";

import edit from "../assets/images/edit.svg";
import save from "../assets/images/save.png";
import cancel from "../assets/images/cancel.png";

import "../styles/DisplayCards.css";
import "../styles/Footer.css";

const DEFAULT_PROGRESS = {
  completed: 0,
  total: 0,
};
// This page contains the main gameplay of the HeaRT game.
// Users can select statements which correspond with their course the most and justify their position and reasoning for their stance.
const DisplayCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const isPrevPagePreview = window.history.state?.state?.prevPage === "Preview";
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);

  const params = QueryString.parse(props.location.search);
  const [allDimensions, setAllDimensions] = useState<
    DimensionType[] | undefined
  >(undefined);
  const [retrievedResults, setRetrieved] = useState(false);

  const [dimensionIndex, setDimensionIndex] = useState(
    isPrevPagePreview && allDimensions ? allDimensions.length - 1 : 0
  );

  // Sets the colour of the cards initially depending on whether the dimension has already been completed
  const [colours, setColours] = useState(
    allDimensions && allDimensions[dimensionIndex].userSelectedSliderPos !== -1
      ? getColours(
          allDimensions[dimensionIndex].userSelectedSliderPos,
          allDimensions[dimensionIndex].type
        )
      : DEFAULT_COLOURS
  );
  // Determines the progress to display on the progress bar (dimensions completed)
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

  // Fetches dimensions for the chart upon component mount
  useEffect(() => {
    fetchDimensions();
  }, []);

  // Re-calculates all the initial state once the dimension have been retrieved from the backend
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

  // GET request to retrieve all the dimensions for the chart from the backend
  const fetchDimensions = async (): Promise<any> => {
    await fetch(`${API_DOMAIN}dimensions/forchart/${params.chartID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          props.history.push("/Dashboard");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        data &&
          setAllDimensions(
            data.map((dimension: any) => {
              return createDimension(dimension);
            })
          );
        setRetrieved(true); // Indicates that the dimensions have been successfully retrieved
      })
      .catch((e) => console.log(e));
  };

  // If user is not logged in, redirect to Login page
  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  // POST request to save the changes made to the current dimension
  const saveCurrentDimension = async (): Promise<void> => {
    const dimension = createBackendDimension(allDimensions![dimensionIndex]);
    await fetch(
      `${API_DOMAIN}dimensions/` + allDimensions![dimensionIndex].id,
      {
        method: "PUT",
        body: JSON.stringify(dimension),
        headers: {
          Authorization: `Bearer ${cookies["accessToken"]}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  // Reset the state to display the next/previous dimension in the chart
  const setNewDimension = (newIndex: number) => {
    setDimensionIndex(newIndex);
    setColours(
      allDimensions![newIndex].userSelectedSliderPos === -1
        ? DEFAULT_COLOURS
        : getColours(
            allDimensions![newIndex].userSelectedSliderPos,
            allDimensions![newIndex].type
          )
    );
  };

  // Saves the current dimension
  // If the current dimension is not the first one in the chart then view the previous dimension, otherwise go to the previous page
  const onBackClick = () => {
    if (dimensionIndex > 0) {
      saveCurrentDimension();
      setNewDimension(dimensionIndex - 1);
    } else {
      // Redirect back to appropriate page
      const from = window.history.state?.state?.from;
      if (from === "Charts" || from === "CreateChart" || isPrevPagePreview) {
        props.history.push(`/Course/${params.courseID}`);
      } else {
        props.history.push("/Dashboard");
      }
    }
  };

  // Saves the current dimension and goes to the next dimension if possible
  const onNextClick = () => {
    saveCurrentDimension();
    if (dimensionIndex < allDimensions!.length - 1) {
      // If the current dimension is not the last then displays next dimension in the chart.
      setNewDimension(dimensionIndex + 1);
    } else if (dimensionIndex === allDimensions!.length - 1) {
      // If it is the last and minimum required number of dimensions is completed then go to Preview.
      if (progress.completed >= MINIMUM_REQUIRED) {
        props.history.push(
          `/Preview?courseID=${params.courseID}&chartID=${params.chartID}`
        );
      } else {
        // If requirements not met then display error modal notifying dimension left to complete
        setShowIncompleteModal(true);
      }
    }
  };

  // Closes the error modal
  const handleOk = () => {
    setShowIncompleteModal(false);
  };

  // Sets the slider position based on the card selected and updates the progress
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

  // Makes the selected card's statement editable
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

  // Discards changes made to the editable card's statement
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

  // Saves the changes made to the editable card statement
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

  // Updates the dimension slider position in local state and the colours of the cards
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

  // Updates the user explanation for the dimension in local state
  const onUserExplanationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAllDimensions(
      allDimensions!.map((dimension, index) => {
        if (index === dimensionIndex) {
          return {
            ...dimension,
            userExplanation: event.target.value,
          };
        } else {
          return dimension;
        }
      })
    );
  };

  // Calculates the number of dimensions that are required to be completed to finish the chart
  const toCompleteDimensions = () => {
    let toComplete = MINIMUM_REQUIRED - progress.completed;
    return toComplete;
  };

  if (allDimensions) {
    return (
      <div className="DisplayCards">
        <Header />
        <Modal
          title="Incomplete Chart"
          centered
          visible={showIncompleteModal}
          footer={[
            <Button
              key="ok"
              type="primary"
              onClick={handleOk}
              className="Modal-Button"
            >
              Ok
            </Button>,
          ]}
        >
          <p>
            You must complete at least {MINIMUM_REQUIRED} dimensions to save
            your chart.
            <br />
            Please complete {toCompleteDimensions()} more dimensions.
          </p>
        </Modal>
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
            className={`Footer-Button ${
              dimensionIndex === 0 && "Wider-Button"
            }`}
            onClick={onBackClick}
          >
            {dimensionIndex === 0 ? "To Dashboard" : "Previous"}
          </Button>
          <div className="Progress">
            <Typography>
              Completed: {progress.completed}/{progress.total} (Required:{" "}
              {MINIMUM_REQUIRED})
            </Typography>
            <Progress
              className="Progress-Bar"
              strokeColor={
                progress.completed >= MINIMUM_REQUIRED
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
              status={
                progress.completed >= MINIMUM_REQUIRED ? "success" : "active"
              }
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
            {dimensionIndex === allDimensions.length - 1
              ? "Preview"
              : isCardSelected
              ? "Next"
              : "Skip"}
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
