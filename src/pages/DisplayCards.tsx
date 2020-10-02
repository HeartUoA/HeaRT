import React, { useState, useEffect, ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import { API_DOMAIN } from "../config";

import { Card, Button, Typography, Tooltip, Progress, Spin } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";
import { Chart, createChart } from "../types/chart";
import { CardSide } from "../types/card";
import { DEFAULT_COLOURS, getColours } from "../utils/cards";

import edit from "../assets/images/edit.svg";
import save from "../assets/images/save.png";
import cancel from "../assets/images/cancel.png";
import "../styles/DisplayCards.css";
import "../styles/Footer.css";
import { createBackendDimension } from "../types/dimension";

const DEFAULT_PROGRESS = {
  completed: 0,
  total: 0,
};

interface ParamTypes {
  courseID: string;
}
const DisplayCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const isPrevPagePreview = window.history.state?.state?.prevPage === "Preview";

  const { courseID } = useParams<ParamTypes>();
  const [chart, setChart] = useState<Chart | undefined>(undefined);

  const [dimensionIndex, setDimensionIndex] = useState(
    isPrevPagePreview && chart ? chart.dimensions.length - 1 : 0
  );

  const [colours, setColours] = useState(
    chart && chart.dimensions[dimensionIndex].userSelectedSliderPos !== -1
      ? getColours(
          chart.dimensions[dimensionIndex].userSelectedSliderPos,
          chart.dimensions[dimensionIndex].type
        )
      : DEFAULT_COLOURS
  );
  const [progress, setProgress] = useState(
    chart
      ? {
          completed: chart.dimensions.filter(
            (dim: { userSelectedSliderPos: number }) =>
              dim.userSelectedSliderPos !== -1
          ).length,
          total: chart.dimensions.length,
        }
      : DEFAULT_PROGRESS
  );
  const isCardSelected =
    chart && chart.dimensions[dimensionIndex].userSelectedSliderPos !== -1;

  useEffect(() => {
    fetchDimensions();
  }, []);

  useEffect(() => {
    if (chart) {
      setDimensionIndex(isPrevPagePreview ? chart.dimensions.length - 1 : 0);
      setColours(
        chart.dimensions[dimensionIndex].userSelectedSliderPos !== -1
          ? getColours(
              chart.dimensions[dimensionIndex].userSelectedSliderPos,
              chart.dimensions[dimensionIndex].type
            )
          : DEFAULT_COLOURS
      );
      setProgress({
        completed: chart.dimensions.filter(
          (dim: { userSelectedSliderPos: number }) =>
            dim.userSelectedSliderPos !== -1
        ).length,
        total: chart.dimensions.length,
      });
    }
  }, [chart]);

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

    setChart(createChart(responseChart));
  };

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  const saveCurrentDimension = async (): Promise<void> => {
    // TODO: Need to change this to individual PUT request for each dimension?
    if (chart) {
      const dimension = createBackendDimension(
        chart.dimensions[dimensionIndex]
      );

      const response = await fetch(
        `${API_DOMAIN}dimensions/` + chart.dimensions[dimensionIndex].id,
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
    }
  };

  const setNewDimension = (newIndex: number) => {
    if (chart) {
      setDimensionIndex(newIndex);
      setColours(
        chart.dimensions[newIndex].userSelectedSliderPos === -1
          ? DEFAULT_COLOURS
          : getColours(
              chart.dimensions[newIndex].userSelectedSliderPos,
              chart.dimensions[dimensionIndex].type
            )
      );
    }
  };

  const onBackClick = () => {
    if (chart && dimensionIndex > 0) {
      saveCurrentDimension();
      setNewDimension(dimensionIndex - 1);
    }
  };

  const onNextClick = () => {
    if (chart) {
      saveCurrentDimension();
      if (dimensionIndex < chart.dimensions.length - 1) {
        setNewDimension(dimensionIndex + 1);
      } else if (dimensionIndex === chart.dimensions.length - 1) {
        if (progress.completed >= 8) {
          props.history.push("/Preview");
        } else {
          // Display modal to say at least 8 dimensions must be completed
        }
      }
    }
  };

  const onCardClick = (side: CardSide) => {
    if (
      chart &&
      chart.dimensions[dimensionIndex].userSelectedSliderPos === -1
    ) {
      setProgress({ ...progress, completed: progress.completed + 1 });
    }

    if (chart && side === CardSide.Left) {
      onSliderPosChange(
        chart.dimensions[dimensionIndex].leftCard.anchorSliderPos
      );
    } else if (chart && side === CardSide.Right) {
      onSliderPosChange(
        chart.dimensions[dimensionIndex].rightCard.anchorSliderPos
      );
    }
  };

  const onEditClick = (event: React.MouseEvent, side: CardSide) => {
    event.stopPropagation();
    if (chart && side === CardSide.Left) {
      setChart({
        ...chart,
        dimensions: chart.dimensions.map((dimension, index) => {
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
        }),
      });
    } else if (chart && side === CardSide.Right) {
      setChart({
        ...chart,
        dimensions: chart.dimensions.map((dimension, index) => {
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
        }),
      });
    }
  };

  const onCancelClick = (side: CardSide) => {
    if (chart && side === CardSide.Left) {
      setChart({
        ...chart,
        dimensions: chart.dimensions.map((dimension, index) => {
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
        }),
      });
    } else if (chart && side === CardSide.Right) {
      setChart({
        ...chart,
        dimensions: chart.dimensions.map((dimension, index) => {
          if (index === dimensionIndex) {
            return {
              ...dimension,
              rightCard: {
                ...dimension.rightCard,
                isEditing: false,
              },
            };
          } else {
            return dimension;
          }
        }),
      });
    }
  };

  const onSaveClick = (side: CardSide) => {
    let textElement = document.getElementById(
      side === CardSide.Left ? "leftCardEdit" : "rightCardEdit"
    );
    if (chart && side === CardSide.Left) {
      setChart({
        ...chart,
        dimensions: chart.dimensions.map((dimension, index) => {
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
        }),
      });
    } else if (chart && side === CardSide.Right) {
      setChart({
        ...chart,
        dimensions: chart.dimensions.map((dimension, index) => {
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
        }),
      });
    }
  };

  const onSliderPosChange = (value: number) => {
    if (chart) {
      setChart({
        ...chart,
        dimensions: chart.dimensions.map((dimension, index) => {
          if (index === dimensionIndex) {
            return {
              ...dimension,
              userSelectedSliderPos: value,
            };
          } else {
            return dimension;
          }
        }),
      });
      setColours(getColours(value, chart.dimensions[dimensionIndex].type));
    }
  };

  const onUserExplanationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (chart) {
      setChart({
        ...chart,
        dimensions: chart.dimensions.map((dimension, index) => {
          if (index === dimensionIndex) {
            return {
              ...dimension,
              userExplanation: event.target.value,
            };
          } else {
            return dimension;
          }
        }),
      });
    }
  };

  if (chart) {
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
                  if (!chart.dimensions[dimensionIndex].leftCard.isEditing) {
                    onCardClick(CardSide.Left);
                  }
                }}
                style={{ backgroundColor: colours.leftCardColour }}
              >
                <Tooltip
                  title={
                    chart.dimensions[dimensionIndex].leftCard.isEditing
                      ? "Save Edited Card"
                      : "Edit Card Text"
                  }
                  mouseEnterDelay={0.05}
                >
                  <img
                    src={
                      chart.dimensions[dimensionIndex].leftCard.isEditing
                        ? save
                        : edit
                    }
                    className={
                      chart.dimensions[dimensionIndex].leftCard.isEditing
                        ? "Save"
                        : "Edit"
                    }
                    alt="edit"
                    onClick={(event) =>
                      chart.dimensions[dimensionIndex].leftCard.isEditing
                        ? onSaveClick(CardSide.Left)
                        : onEditClick(event, CardSide.Left)
                    }
                  />
                </Tooltip>
                {chart.dimensions[dimensionIndex].leftCard.isEditing ? (
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
                      {chart.dimensions[dimensionIndex].leftCard.statement}
                    </div>
                  </>
                ) : (
                  <p className="Card-Text">
                    {chart.dimensions[dimensionIndex].leftCard.statement}
                  </p>
                )}
              </Card>
              <Card
                className="Card"
                onClick={() => {
                  if (!chart.dimensions[dimensionIndex].rightCard.isEditing) {
                    onCardClick(CardSide.Right);
                  }
                }}
                style={{ backgroundColor: colours.rightCardColour }}
              >
                <Tooltip
                  title={
                    chart.dimensions[dimensionIndex].rightCard.isEditing
                      ? "Save Edited Card"
                      : "Edit Card Text"
                  }
                  mouseEnterDelay={0.05}
                >
                  <img
                    src={
                      chart.dimensions[dimensionIndex].rightCard.isEditing
                        ? save
                        : edit
                    }
                    className={
                      chart.dimensions[dimensionIndex].rightCard.isEditing
                        ? "Save"
                        : "Edit"
                    }
                    alt="edit"
                    onClick={(event) =>
                      chart.dimensions[dimensionIndex].rightCard.isEditing
                        ? onSaveClick(CardSide.Right)
                        : onEditClick(event, CardSide.Right)
                    }
                  />
                </Tooltip>
                {chart.dimensions[dimensionIndex].rightCard.isEditing ? (
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
                      {chart.dimensions[dimensionIndex].rightCard.statement}
                    </div>
                  </>
                ) : (
                  <p className="Card-Text">
                    {chart.dimensions[dimensionIndex].rightCard.statement}
                  </p>
                )}
              </Card>
            </div>
            {isCardSelected ? (
              <Dimension
                {...{
                  dimension: chart.dimensions[dimensionIndex],
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
    // TODO: Loading page
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
