import React, { ChangeEvent } from "react";

import { Card, Slider, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../styles/Dimension.css";

import { Dimension as DimensionType } from "../types/dimension";

interface DimensionProps {
  dimension: DimensionType; // The type of the dimension (either Practice or Beliefs)
  sliderUpdate: (value: number) => void; // Function to update the slider position for the dimension
  userExplanationUpdate?: (event: ChangeEvent<HTMLTextAreaElement>) => void; // Function to update the user explanation for the dimension
  isPreview: boolean; // Whether the Dimension component is in "Preview" mode or "Display Cards" mode
  openSingleDimension?: (key: string) => void; // Function to open a "Preview" mode dimension in "Full View" (allowing user to make changes to their explanation)
}

// A component used in both DisplayCards and Preview pages, containing the dimension name, slider and user explanation text area.
// Components within the Dimension component are rendered conditionally depending on whether in "Preview" or "Full View" mode.
const Dimension: React.FC<DimensionProps> = (props: DimensionProps) => {
  // Open the "Preview" mode dimension individually in a "Full View" (allowing user to make changes to their explanation)
  const redirectToFullDimensionView = () => {
    if (props.openSingleDimension) {
      props.openSingleDimension(props.dimension.id);
    }
  };

  return (
    <Card className={props.isPreview ? "Card-Preview" : "Card-Dimension"}>
      <p
        className={`Dimension-Name-Text ${props.isPreview && "Clickable"}`}
        onClick={props.isPreview ? redirectToFullDimensionView : undefined}
      >
        {props.dimension.name}
      </p>
      <Slider
        className="Slider"
        value={props.dimension.userSelectedSliderPos}
        onChange={(value: number) => props.sliderUpdate(value)}
        marks={props.dimension.marks}
        tooltipVisible={false}
        included={false}
      />
      {props.isPreview ? (
        <Typography className="User-Explanation">
          {props.dimension.userExplanation
            ? '"' + props.dimension.userExplanation + '"'
            : ""}
        </Typography>
      ) : (
        <TextArea
          className="User-Explanation-Edit"
          value={props.dimension.userExplanation}
          onChange={props.userExplanationUpdate}
          placeholder="Explain your reasoning for your stance here..."
          rows={3}
        />
      )}
      <Typography className="Dimension-Type-Text">
        Type: {props.dimension.type}
      </Typography>
    </Card>
  );
};

export default Dimension;
