import React, { useState } from "react";
import { Typography } from "antd";
import { Row } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";

import "../styles/DisplayCards.css";

const tempValues = [
  {
    dimensionValue: "Dimension1",
    scale: 100,
  },
  {
    dimensionValue: "Dimension2",
    scale: 50,
  },
  {
    dimensionValue: "Dimension3",
    scale: 0,
  },
  {
    dimensionValue: "Dimension4",
    scale: 0,
  },
];

const Preview: React.FC = () => {
  const [dimensions, setDimensions] = useState(tempValues);
  return (
    <div className="Preview">
      <Header />
      <div className="Content">
        <Typography className="Statement">Preview</Typography>
        <Row>
          {dimensions.map((item) => (
            <Dimension {...item} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Preview;
