import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Typography, Button, Row } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";

import "../styles/Preview.css";
import "../styles/Footer.css";

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

const Preview: React.FC<RouteComponentProps> = (props) => {
  const [ cookies ] = useCookies(['accessToken']);
  const [ dimensions, setDimensions ] = useState(tempValues);

  useEffect(() => {
    if (!cookies['accessToken']) {
      props.history.push("/Login");
    }
  }, [cookies]);


  const onBackClick = () => {
    // TODO: Write code here to redirect to display cards screen with the last card
  };

  const onSaveClick = () => {
    // TODO: Write code here to make API post request to save chart
    props.history.push("/Replay")
  };

  const onDimensionChange = (value: number) => {
    // what happens when someone drags slider
  };

  return (
    <div className="Preview">
      <Header />
      <div className="Preview-Content">
        <Typography className="Preview-Title">Preview</Typography>
        <Row className="Dimension-Row">
          {dimensions.map((item) => (
            <Dimension
              {...{ dimension: item, sliderUpdate: onDimensionChange }}
            />
          ))}
        </Row>
      </div>
      <div className="Footer">
        <Button
          type="primary"
          className="Footer-Button"
          onClick={onBackClick}
        >
          Back
        </Button>
        <Button
          type="primary"
          className="Footer-Button"
          onClick={onSaveClick}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Preview);
