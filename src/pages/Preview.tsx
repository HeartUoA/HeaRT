import React, { useState } from "react";
import { Typography, Button } from "antd";
import { Row } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";

import "../styles/DisplayCards.css";
import "../styles/Navigation.css";

const tempValues = [
  {
    dimensionValue: "Dimension1",
    scale: 100,
    userExplanation: "This is a user explanation.",
    isPreview: true,
  },
  {
    dimensionValue: "Dimension2",
    scale: 50,
    userExplanation:
      "Perhaps we should also point out the fact that the negative impact of the benefits of data integrity any rash or contextual approach the system mechanism and The Decision of...",
    isPreview: true,
  },
  {
    dimensionValue: "Dimension3",
    scale: 0,
    userExplanation: "",
    isPreview: true,
  },
  {
    dimensionValue: "Dimension4",
    scale: 0,
    userExplanation: "This is a user explanation.",
    isPreview: true,
  },
  {
    dimensionValue: "Dimension5",
    scale: 100,
    userExplanation: "This is a user explanation.",
    isPreview: true,
  },
  {
    dimensionValue: "Dimension6",
    scale: 20,
    userExplanation:
      "Perhaps we should also point out the fact that the negative impact of the benefits of data integrity any rash or contextual approach the system mechanism and The Decision of...",
    isPreview: true,
  },
  {
    dimensionValue: "Dimension7",
    scale: 0,
    userExplanation: "",
    isPreview: true,
  },
  {
    dimensionValue: "Dimension8",
    scale: 90,
    userExplanation: "This is a user explanation.",
    isPreview: true,
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
        <Row className="Dimension-Row">
          {dimensions.map((item) => (
            <Dimension {...item} />
          ))}
        </Row>
      </div>
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
  );
};

export default Preview;
