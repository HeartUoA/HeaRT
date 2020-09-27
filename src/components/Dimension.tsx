import React, { ChangeEvent } from "react";

import { Card, Slider, Typography } from "antd";
import "../styles/Dimension.css";
import TextArea from "antd/lib/input/TextArea";

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
            placeholder="Explain your position on the dimension here..."
            rows={3}
          />
        )}
      </div>
    </Card>
  );
};

export default Dimension;
