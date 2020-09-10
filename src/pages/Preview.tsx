import React, { useState } from "react";
import { Typography, Button } from "antd";
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
  const onBackClick = () => {
    // TODO: Write code here to redirect to course info screen
  };

  const onSaveClick = () => {
    // TODO: Write code here to redirect to instructions screen
  };
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
        <div className="Navigation">
          <Button
            type="primary"
            className="NavigationButton"
            onClick={onBackClick}
          >
            <Typography className="Navigation-Button-Text">Back</Typography>
          </Button>
          <Button
            type="primary"
            className="NavigationButton"
            onClick={onSaveClick}
          >
            <Typography className="Navigation-Button-Text">Save</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
