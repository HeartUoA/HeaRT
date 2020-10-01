import React, { useState, ChangeEvent, useEffect } from "react";

import { Card, Typography, Tooltip } from "antd";
import Dimension from "../components/Dimension";
import { Dimension as DimensionType } from "../types/dimension";
import { CardSide } from "../types/card";
import { DEFAULT_COLOURS, getColours } from "../utils/cards";

import edit from "../assets/images/edit.svg";
import save from "../assets/images/save.png";
import cancel from "../assets/images/cancel.png";
import "../styles/DisplayCards.css";

interface PreviewDimensionProps {
  fullDimensionView: boolean;
  dimension: DimensionType;
  previewSliderPosChange: (value: number, dimensionKey: string) => void;
  saveDimensionFunction: (updatedDimension: DimensionType) => void;
  openSingleDimension: (key: string) => void;
  saveDimensionClicked: boolean;
}

const PreviewDimension: React.FC<PreviewDimensionProps> = (props, ref) => {
  const [currentDimension, setDimension] = useState<DimensionType>(
    props.dimension
  );
  const [leftState, setLeftState] = useState(currentDimension.leftCard);
  const [rightState, setRightState] = useState(currentDimension.rightCard);
  const [colours, setColours] = useState(
    currentDimension.userSelectedSliderPos === -1
      ? DEFAULT_COLOURS
      : getColours(currentDimension.userSelectedSliderPos)
  );

  useEffect(() => {
    if (props.saveDimensionClicked) {
      props.saveDimensionFunction({
        ...currentDimension,
        leftCard: leftState,
        rightCard: rightState,
      });
    }
  }, [props.saveDimensionClicked]);

  useEffect(() => {
    if (!props.fullDimensionView) {
      setDimension(props.dimension);
      setLeftState(props.dimension.leftCard);
      setRightState(props.dimension.rightCard);
      setColours(
        currentDimension.userSelectedSliderPos === -1
          ? DEFAULT_COLOURS
          : getColours(currentDimension.userSelectedSliderPos)
      );
    }
  }, [props.fullDimensionView]);

  const onCardClick = (side: CardSide) => {
    if (side === CardSide.Left) {
      onSliderPosChange(leftState.anchorSliderPos);
    } else if (side === CardSide.Right) {
      onSliderPosChange(rightState.anchorSliderPos);
    }
  };

  const onEditStatementClick = (event: React.MouseEvent, side: CardSide) => {
    event.stopPropagation();
    if (side === CardSide.Left) {
      setLeftState({ ...leftState, isEditing: true });
    } else if (side === CardSide.Right) {
      setRightState({ ...rightState, isEditing: true });
    }
  };

  const onCancelStatementClick = (event: React.MouseEvent, side: CardSide) => {
    if (side === CardSide.Left) {
      setLeftState({ ...leftState, isEditing: false });
    } else if (side === CardSide.Right) {
      setRightState({ ...rightState, isEditing: false });
    }
  };

  const onSaveStatementClick = (event: React.MouseEvent, side: CardSide) => {
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
    if (!props.fullDimensionView) {
      props.previewSliderPosChange(value, props.dimension.name);
    }
    setDimension({ ...currentDimension, userSelectedSliderPos: value });
    setColours(getColours(value));
  };

  const onUserExplanationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDimension({ ...currentDimension, userExplanation: event.target.value });
  };

  return (
    <div style={props.fullDimensionView ? { width: "100%" } : undefined}>
      {props.fullDimensionView && (
        <>
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
                      ? onSaveStatementClick(event, CardSide.Left)
                      : onEditStatementClick(event, CardSide.Left)
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
                      onClick={(event) =>
                        onCancelStatementClick(event, CardSide.Left)
                      }
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
                      ? onSaveStatementClick(event, CardSide.Right)
                      : onEditStatementClick(event, CardSide.Right)
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
                      onClick={(event) =>
                        onCancelStatementClick(event, CardSide.Right)
                      }
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
        </>
      )}
      <Dimension
        {...{
          dimension: props.fullDimensionView
            ? currentDimension
            : props.dimension,
          sliderUpdate: onSliderPosChange,
          userExplanationUpdate: onUserExplanationChange,
          isPreview: !props.fullDimensionView,
          openSingleDimension: props.openSingleDimension,
        }}
      />
    </div>
  );
};

export default PreviewDimension;
