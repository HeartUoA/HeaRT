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
  fullDimensionView: boolean; // Whether the current dimension is in "Preview" mode or "Full View" mode
  dimension: DimensionType; // The type of the dimension (either Practice or Beliefs)
  previewSliderPosChange: (value: number, dimensionKey: string) => void; // Function to update the slider position of the dimension
  saveDimensionFunction: (updatedDimension: DimensionType) => void; // Function to save the changes made to a dimension in local state
  openSingleDimension: (key: string) => void; // Function to view a dimension in "Full View" mode instead of Preview mode
  saveDimensionClicked: boolean; // Boolean indicating whether save has been clicked in the parent component to trigger saving the dimension in local state
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
      : getColours(
          currentDimension.userSelectedSliderPos,
          currentDimension.type
        )
  );

  // Saves the current dimension in local state if the "Save" button is clicked in the parent component (only triggered if the dimension is in "Full View" mode)
  useEffect(() => {
    if (props.saveDimensionClicked) {
      props.saveDimensionFunction({
        ...currentDimension,
        leftCard: leftState,
        rightCard: rightState,
      });
    }
  }, [props.saveDimensionClicked]);

  // Resets the dimension back to its original state after exiting from "Full View" mode back to "Preview" mode
  useEffect(() => {
    if (!props.fullDimensionView) {
      setDimension(props.dimension);
      setLeftState(props.dimension.leftCard);
      setRightState(props.dimension.rightCard);
      setColours(
        currentDimension.userSelectedSliderPos === -1
          ? DEFAULT_COLOURS
          : getColours(
              currentDimension.userSelectedSliderPos,
              currentDimension.type
            )
      );
    }
  }, [props.fullDimensionView]);

  // Updates the slider position for the dimension in local state (and the card colours)
  const onCardClick = (side: CardSide) => {
    if (side === CardSide.Left) {
      onSliderPosChange(leftState.anchorSliderPos);
    } else if (side === CardSide.Right) {
      onSliderPosChange(rightState.anchorSliderPos);
    }
  };

  // Makes the card's statement editable
  const onEditStatementClick = (event: React.MouseEvent, side: CardSide) => {
    event.stopPropagation();
    if (side === CardSide.Left) {
      setLeftState({ ...leftState, isEditing: true });
    } else if (side === CardSide.Right) {
      setRightState({ ...rightState, isEditing: true });
    }
  };

  // Discards the changes made to the card's statement and disables editing
  const onCancelStatementClick = (event: React.MouseEvent, side: CardSide) => {
    if (side === CardSide.Left) {
      setLeftState({ ...leftState, isEditing: false });
    } else if (side === CardSide.Right) {
      setRightState({ ...rightState, isEditing: false });
    }
  };

  // Saves the changes made to the card's statement in local state and disables editing
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

  // Updates the slider position for the dimension locally and the colour of the cards based on the slider position and dimesnion type
  const onSliderPosChange = (value: number) => {
    if (!props.fullDimensionView) {
      props.previewSliderPosChange(value, props.dimension.name);
    }
    setDimension({ ...currentDimension, userSelectedSliderPos: value });
    setColours(getColours(value, currentDimension.type));
  };

  // Updates the user explanation for the dimension in local state
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
