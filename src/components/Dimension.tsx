import React from "react";

import { Card, Slider, Typography } from "antd";
import "../styles/Dimension.css";

interface DimensionProps {
  dimensionValue: string;
  scale: number;
  userExplanation: string;
  isPreview: boolean;
}

interface MainProps {
  dimension: DimensionProps;
  sliderUpdate: (value: number) => void;
}

const Dimension: React.FC<MainProps> = (props: MainProps) => {
  return (
    <Card
      className={props.dimension.isPreview ? "Card-Preview" : "Card-Dimension"}
    >
      <p className="Card-Text">{props.dimension.dimensionValue}</p>
      <div className="Slider">
        <div className="Captions-Container">
          <Typography>Fixed</Typography>
          <Typography>Active</Typography>
        </div>
        <Slider
          className="Slider-Bar"
          defaultValue={props.dimension.scale}
          onChange={props.sliderUpdate}
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
