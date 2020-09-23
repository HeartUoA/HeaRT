import React from "react";

import { Card, Slider, Typography } from "antd";
import "../styles/Dimension.css";

interface DimensionProps {
  dimensionValue: string;
  scale: number;
  userExplanation: string;
  isPreview: boolean;
}

const Dimension: React.FC<DimensionProps> = (
  onDimensionChange,
  props: DimensionProps
) => {
  return (
    <Card className={props.isPreview ? "Card-Preview" : "Card-Dimension"}>
      <p className="Card-Text">{props.dimensionValue}</p>
      <div className="Slider">
        <div className="Captions-Container">
          <Typography>Fixed</Typography>
          <Typography>Active</Typography>
        </div>
        <Slider
          className="Slider-Bar"
          value={props.scale}
          onChange={onDimensionChange}
        />
        <Typography className="User-Explanation">
          {props.userExplanation.length > 0
            ? '"' + props.userExplanation + '"'
            : ""}
        </Typography>
      </div>
    </Card>
  );
};

export default Dimension;
