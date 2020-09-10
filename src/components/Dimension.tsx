import React, { useState } from "react";

import { Card, Slider, Typography } from "antd";
import "../styles/Dimension.css";

interface DimensionProps {
  dimensionValue: string;
  scale: number;
}

const Dimension: React.FC<DimensionProps> = (props) => {
  return (
    <Card className="Card-Dimension">
      <Typography className="Card-Text">{props.dimensionValue}</Typography>
      <div className="Captions-Container">
        <Typography>Fixed</Typography>
        <Typography>Active</Typography>
      </div>
    </Card>
  );
};

export default Dimension;
