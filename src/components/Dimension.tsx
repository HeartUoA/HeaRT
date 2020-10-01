import React, { ChangeEvent } from "react";

import { Card, Slider, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../styles/Dimension.css";

import { Dimension as DimensionType } from "../types/dimension";

interface DimensionProps {
  dimension: DimensionType;
  sliderUpdate?: (value: number) => void;
  userExplanationUpdate?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  isPreview: boolean;
}

const Dimension: React.FC<DimensionProps> = (props: DimensionProps) => {
  return (
    <Card className={props.isPreview ? "Card-Preview" : "Card-Dimension"}>
      <p className="Dimension-Name-Text">{props.dimension.name}</p>
      <Slider
        className="Slider"
        value={props.dimension.userSelectedSliderPos}
        onChange={props.sliderUpdate}
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
    </Card>
  );
};

export default Dimension;
