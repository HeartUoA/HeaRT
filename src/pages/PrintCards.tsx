import React, { constructor, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Input, Row, Typography } from "antd";
import Header from "../components/Header";
import Dimension from "../components/PrintDimension";
import "../styles/PrintCards.css";
import { API_DOMAIN } from "../config";

type statementCard = {
  text: string;
};

const initialStatementCard: statementCard = {
  text: "Lorem ipsm dolor sit amet, consectetuer adipiscing elit, sed diam",
};

const chartID = "5f73b99d5d6eec214825e006";

//dummy data
type DimensionCard = {
  dimensionName: string;
  leftContinuum: string;
  rightContinuum: string;
  statementReflection: string;
};

const tempValues = [
    {
      dimensionValue: "Dimension1",
    },
    {
      dimensionValue: "Dimension2",
    },
    {
      dimensionValue: "Dimension3",
    },
    {
      dimensionValue: "Dimension4",
    },
    {
      dimensionValue: "Dimension5",
    },
    {
      dimensionValue: "Dimension6",
    },
    {
      dimensionValue: "Dimension7",
    },
    {
      dimensionValue: "Dimension8",
    },
  ];

const PrintCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [leftState, setLeftState] = useState(initialStatementCard);
  const [ dimensions, setDimensions ] = useState(tempValues);
  let num =1;
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
          setLeftState({
            text: res[0].leftCardStatement,
            // text:JSON.stringify(res),
          });
          console.log(res);
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
            {dimensions.map((item) => (
                <><div className="PrintingCards">
                    <span className="Print-Card-Text" id={num} >{leftState.text}</span>
                </div>
                <div className="PrintingCards">
                    <Dimension />
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
