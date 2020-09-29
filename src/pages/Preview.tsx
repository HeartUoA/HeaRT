import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Typography, Button, Row } from "antd";
import Header from "../components/Header";
import Dimension from "../components/Dimension";

import "../styles/Preview.css";
import "../styles/Footer.css";

import charts from "../dummyData/charts";

const Preview: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);

  // TODO: Need to change this to grab data from backend
  const [dimensions] = useState(charts[0].dimensions);

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  const onBackClick = () => {
    // TODO: Write code here to redirect to display cards screen with the last card
  };

  const onSaveClick = () => {
    // TODO: Write code here to make API post request to save chart
    props.history.push("/Replay");
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
          {dimensions.map((item) => {
            if (item.userSelectedSliderPos !== -1) {
              return (
                <Dimension
                  {...{
                    dimension: item,
                    sliderUpdate: onDimensionChange,
                    isPreview: true,
                    key: item.name,
                  }}
                />
              );
            }
            return undefined;
          })}
        </Row>
      </div>
      <div className="Footer">
        <Button type="primary" className="Footer-Button" onClick={onBackClick}>
          Back
        </Button>
        <Button type="primary" className="Footer-Button" onClick={onSaveClick}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Preview);
