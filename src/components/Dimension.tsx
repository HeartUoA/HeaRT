import React, { ChangeEvent } from "react";

import { SliderMarks } from "../types/sliderMarks";

import { Card, Slider, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../styles/Dimension.css";

interface DimensionProps {
  dimensionValue: string;
  scale: number;
  userExplanation: string;
  isPreview: boolean;
  marks?: SliderMarks;
}

interface MainProps {
  dimension: DimensionProps;
  sliderUpdate: (value: number) => void;
  userExplanationUpdate?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Dimension: React.FC<MainProps> = (props: MainProps) => {
  return (
    <Card
      className={props.dimension.isPreview ? "Card-Preview" : "Card-Dimension"}
    >
      <p className="Dimension-Name-Text">{props.dimension.dimensionValue}</p>
        <Slider
          className="Slider"
          value={props.dimension.scale}
          onChange={props.sliderUpdate}
          marks={props.dimension.marks}
          tooltipVisible={false}
          included={false}
        />
        {props.dimension.isPreview ? (
        <Typography className="User-Explanation">
          {props.dimension.userExplanation.length > 0
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
