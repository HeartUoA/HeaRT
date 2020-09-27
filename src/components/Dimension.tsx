import React from "react";

import { Card, Slider, Typography } from "antd";
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
}

interface SliderMarks {
  [key: number]:
    | React.ReactNode
    | {
        style: React.CSSProperties;
        label: React.ReactNode;
      };
}

const Dimension: React.FC<MainProps> = (props: MainProps) => {
  return (
    <Card
      className={props.dimension.isPreview ? "Card-Preview" : "Card-Dimension"}
    >
      <p className="Card-Text">{props.dimension.dimensionValue}</p>
      <div className="Slider">
        <Slider
          className="Slider-Bar"
          value={props.dimension.scale}
          onChange={props.sliderUpdate}
          marks={props.dimension.marks}
        />
        <Typography className="User-Explanation">
          {props.dimension.userExplanation.length > 0
            ? '"' + props.dimension.userExplanation + '"'
            : ""}
        </Typography>
      </div>
    </Card>
  );
};

export default Dimension;
