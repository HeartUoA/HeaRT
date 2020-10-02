import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Typography, Button, Col } from "antd";
import Header from "../components/Header";
import DimensionComparator from "../components/DimensionComparator";

import "../styles/Preview.css";
import "../styles/Footer.css";

import charts from "../dummyData/charts";
import courses from "../dummyData/courses";

const CompareCharts: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);

  // TODO: Need to change this to grab data from backend
  const chartsToCompare = [charts[1], charts[2], charts[3]];
  const course = courses.find((course) => course.id === charts[1].courseID);
  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }
  }, [cookies]);

  const onBackClick = () => {
    props.history.push("/Dashboard");
  };

  return (
    <div className="Preview">
      <Header />
      <div className="Preview-Content">
        <Typography className="Preview-Title">{course!.name}</Typography>
        <Col className="Dimension-Row">
          {chartsToCompare[0].dimensions.map((item, index) => {
            if (item.userSelectedSliderPos !== -1) {
              return (
                <DimensionComparator
                  {...{
                    dimensions: chartsToCompare.map(
                      (chart) => chart.dimensions[index]
                    ),
                    dates: chartsToCompare.map((chart) => chart.createdAt),
                    isPreview: true,
                    key: item.name,
                  }}
                />
              );
            }
            return undefined;
          })}
        </Col>
      </div>
      <div className="Footer">
        <Button type="primary" className="Footer-Button" onClick={onBackClick}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default withRouter(CompareCharts);
