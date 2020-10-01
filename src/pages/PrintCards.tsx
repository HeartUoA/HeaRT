import React, { constructor, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Input, Row, Typography } from "antd";
import Header from "../components/Header";
import Dimension from "../components/PrintDimension";
import "../styles/PrintCards.css";
import { API_DOMAIN } from "../config";

import charts from "../dummyData/charts";

const chartID = "5f73b99d5d6eec214825e006";

//dummy data
type DimensionCard = {
  dimensionName: string;
  leftContinuum: string;
  rightContinuum: string;
  statementReflection: string;
};

const PrintCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [leftState, setLeftState] = useState();
  const [dimensions, setDimensions] = useState(charts[0].dimensions);
  const allDimensions = charts[0].dimensions;
  let numberthis = 0;

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }

    fetch(`${API_DOMAIN}dimensions/forchart/${chartID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZjcxODRjOThhYWQ1MzUxOTg1ZDJkMzAiLCJpYXQiOjE2MDEyNzUxMDh9.0MN9vV7WRSc-m5hpt3t8mJakVNElJHe4a2fuc1-aFcs",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res[0].score);
      })
      .catch((e) => console.log(e));
  }, [cookies]);

  const onBackClick = async (): Promise<void> => {
    props.history.push("/Dashboard");
  };

  return (
    <div className="PrintCards">
      <div className="Header">
        <Header />
      </div>
      <div className="PrintCardsContainer">
        <div className="PrintCardsContent">
          <Row>
            {dimensions.map((currElement, index) => (
              <>
                <div className="PrintingCards">
                  <span className="Print-Card-Text">
                    {index % 2
                      ? allDimensions[index].rightCard.statement
                      : allDimensions[index].leftCard.statement}
                  </span>
                </div>
                <div className="PrintingCards">
                  <Dimension dimensionVallue={index} />
                </div>
                <div className="PrintingCards">
                  <span className="Print-Card-Text">
                    {index % 2
                      ? allDimensions[index].leftCard.statement
                      : allDimensions[index].rightCard.statement}
                  </span>
                </div>
                <div className="PrintingCards">
                  <Dimension dimensionVallue={index} />
                </div>
              </>
            ))}
          </Row>
        </div>
      </div>
      <div className="BackButtonDiv">
        <Button type="primary" className="Back-Button" onClick={onBackClick}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default withRouter(PrintCards);
